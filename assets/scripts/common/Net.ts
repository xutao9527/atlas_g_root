import { _decorator ,sys} from 'cc';
import {AtlasWireMessage, WirePayload} from "db://assets/scripts/wire/base/message";
import {decodeMessage} from "db://assets/scripts/wire/base/codec";
import {eventBus} from "db://assets/scripts/common/EventBus";
import {TokenAuthReq} from "db://assets/scripts/wire/payload/TokenAuthReq";
import {AuthResp} from "db://assets/scripts/wire/payload/AuthResp";
import {BasicAuthReq} from "db://assets/scripts/wire/payload/BasicAuthReq";

const { ccclass } = _decorator;

@ccclass('Net')
export class Net {
    private ws: WebSocket | null = null;
    private url = 'ws://127.0.0.1:8080/ws';

    connect() {
        if (this.ws) return;

        // ⭐ 只注册一次
        eventBus.on<AuthResp>(TokenAuthReq.METHOD, this.tokenAuthHandler);
        eventBus.on<AuthResp>(BasicAuthReq.METHOD, this.tokenAuthHandler);

        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
            console.log('[WS] connected');
            // ⭐ 核心：WS 建立成功 → 自动 token 认证
            this.tryTokenAuth();
        };

        this.ws.onmessage = async (event) => {
            const arrayBuffer = await this.blobToArrayBuffer(event.data);
            const uint8Arr = new Uint8Array(arrayBuffer);

            let recv_msg= decodeMessage(uint8Arr);
            console.log('[WS] receive:', recv_msg);

            // ⭐ 分发给全局
            eventBus.emit(recv_msg.header.method, recv_msg);
        };

        this.ws.onclose = () => {
            console.log('[WS] closed');
            this.ws = null;
        };

        this.ws.onerror = (e) => {
            console.error('[WS] error', e);
        };
    }

    sendRequest<T extends WirePayload>(req: T) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            const rawMsg = req.buildRawMessage();
            console.log('[WS] send:', req.constructor.name, rawMsg);
            this.ws.send(rawMsg);
        } else {
            console.warn('WebSocket not connected');
        }
    }

    private async blobToArrayBuffer(data: Blob | ArrayBuffer): Promise<ArrayBuffer> {
        if (data instanceof Blob) return await data.arrayBuffer();
        return data;
    }

    private tryTokenAuth() {
        const token = sys.localStorage.getItem('token');
        if (!token) {
            console.log('[WS] no token, skip token auth');
            return;
        }
        //console.log('[WS] try token auth');
        const req = new TokenAuthReq({ token });
        this.sendRequest(req);
    }

    private tokenAuthHandler = (msg: AtlasWireMessage<AuthResp>) =>{
        if (!msg.payload.ok) {
            console.warn('[WS] token auth failed, clear token');
            sys.localStorage.removeItem('token');
            return;
        }
        if (msg.payload.token) {
            //console.log('[WS] update token');
            sys.localStorage.setItem('token', msg.payload.token);
        }
    }

    close() {
        this.ws?.close();
        this.ws = null;
    }
}



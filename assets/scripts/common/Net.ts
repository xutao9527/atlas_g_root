import { _decorator } from 'cc';
import {WirePayload} from "db://assets/scripts/wire/base/message";
import {decodeMessage} from "db://assets/scripts/wire/base/codec";
import {eventBus} from "db://assets/scripts/common/EventBus";
const { ccclass } = _decorator;

@ccclass('Net')
export class Net {
    private ws: WebSocket | null = null;
    private url = 'ws://127.0.0.1:8080/ws';

    connect() {
        if (this.ws) return;

        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
            console.log('[WS] connected');
        };

        this.ws.onmessage = async (event) => {
            const arrayBuffer = await this.blobToArrayBuffer(event.data);
            const uint8Arr = new Uint8Array(arrayBuffer);

            let recv_msg= decodeMessage(uint8Arr);
            console.log('[WS] receive:', recv_msg.payload);

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

    close() {
        this.ws?.close();
        this.ws = null;
    }
}



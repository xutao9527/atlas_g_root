import { _decorator } from 'cc';
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

        this.ws.onmessage = (ev) => {
            const msg = JSON.parse(ev.data);
            console.log('[WS] recv', msg);

            // ⭐ 分发给全局
            // EventBus.emit(msg.cmd, msg.data);
        };

        this.ws.onclose = () => {
            console.log('[WS] closed');
            this.ws = null;
        };

        this.ws.onerror = (e) => {
            console.error('[WS] error', e);
        };
    }

    send(cmd: string, data: any) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            console.warn('[WS] not ready');
            return;
        }
        this.ws.send(JSON.stringify({ cmd, data }));
    }

    close() {
        this.ws?.close();
        this.ws = null;
    }
}



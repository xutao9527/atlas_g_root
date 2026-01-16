import {AtlasWireMessage, WirePayload} from "db://assets/scripts/wire/base/Message";

type Handler<T extends WirePayload> = (data: AtlasWireMessage<T>) => void;

class EventBus {
    private map = new Map<string | number, Handler<WirePayload>[]>();

    /** 注册 handler */
    on<T extends WirePayload>(cmd: string | number, fn: Handler<T>) {
        const list = this.map.get(cmd) || [];
        list.push(fn as Handler<WirePayload>);
        this.map.set(cmd, list);
    }

    /** 移除 handler，可选 */
    off<T extends WirePayload>(cmd: string | number, fn?: Handler<T>) {
        if (!fn) {
            this.map.delete(cmd);
            return;
        }
        const list = this.map.get(cmd);
        if (list) {
            this.map.set(cmd, list.filter(f => f !== fn));
        }
    }

    /** 分发消息 */
    emit<T extends WirePayload>(cmd: string | number, data: AtlasWireMessage<T>) {
        this.map.get(cmd)?.forEach(fn => fn(data));
    }
}

export const eventBus = new EventBus();
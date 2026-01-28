import {AtlasFrame, AtlasFrameBody} from "db://assets/scripts/proto/base/Message";
import {AtlasFrameKind} from "db://assets/scripts/proto/base/Header";
type Handler<T extends AtlasFrameBody> = (data: AtlasFrame<T>) => void;

class EventBus {
    private rpc_map = new Map<string | number, Handler<AtlasFrameBody>[]>();
    private notify_map = new Map<string | number, Handler<AtlasFrameBody>[]>();

    /** 注册 rpc handler */
    on<T extends AtlasFrameBody>(cmd: string | number, fn: Handler<T>) {
        const list = this.rpc_map.get(cmd) || [];
        list.push(fn as Handler<AtlasFrameBody>);
        this.rpc_map.set(cmd, list);
    }

    /** 移除 rpc handler，可选 */
    off<T extends AtlasFrameBody>(cmd: string | number, fn?: Handler<T>) {
        if (!fn) {
            this.rpc_map.delete(cmd);
            return;
        }
        const list = this.rpc_map.get(cmd);
        if (list) {
            this.rpc_map.set(cmd, list.filter(f => f !== fn));
        }
    }

    /** 注册 notify handler */
    on_notify<T extends AtlasFrameBody>(cmd: string | number, fn: Handler<T>) {
        const list = this.notify_map.get(cmd) || [];
        list.push(fn as Handler<AtlasFrameBody>);
        this.notify_map.set(cmd, list);
    }

    /** 移除 notify handler，可选 */
    off_notify<T extends AtlasFrameBody>(cmd: string | number, fn?: Handler<T>) {
        if (!fn) {
            this.notify_map.delete(cmd);
            return;
        }
        const list = this.notify_map.get(cmd);
        if (list) {
            this.notify_map.set(cmd, list.filter(f => f !== fn));
        }
    }

    /** 分发消息 */
    emit<T extends AtlasFrameBody>(cmd: string | number, data: AtlasFrame<T>) {
        switch (data.header.kind) {
            case AtlasFrameKind.Request:
                break;
            case AtlasFrameKind.ResponseOk:
                this.rpc_map.get(cmd)?.forEach(fn => fn(data));
                break;
            case AtlasFrameKind.ResponseErr:
                this.rpc_map.get(cmd)?.forEach(fn => fn(data));
                break;
            case AtlasFrameKind.Notify:
                this.notify_map.get(cmd)?.forEach(fn => fn(data));
                break;
            case AtlasFrameKind.RegNode:
                break;
        }
    }
}

export const eventBus = new EventBus();
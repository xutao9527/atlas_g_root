type Handler = (data: any) => void;

class EventBus {
    private map = new Map<string, Handler[]>();

    on(cmd: string, fn: Handler) {
        const list = this.map.get(cmd) || [];
        list.push(fn);
        this.map.set(cmd, list);
    }

    emit(cmd: string, data: any) {
        this.map.get(cmd)?.forEach(fn => fn(data));
    }
}

export const eventBus = new EventBus();
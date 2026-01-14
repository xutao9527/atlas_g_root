import { _decorator, Component, director } from 'cc';
import {Net} from "db://assets/scripts/common/Net";
import {WirePayload} from "db://assets/scripts/wire/base/message";
const { ccclass } = _decorator;

@ccclass('Global')
export class Global extends Component {
    static inst: Global;

    net: Net = new Net();

    protected onLoad(): void {
        if (Global.inst) {
            this.node.destroy();
            return;
        }
        Global.inst = this;
        director.addPersistRootNode(this.node);

        // ⭐ 启动即连接
        this.net.connect();
    }

    protected onDestroy(): void {
        this.net.close();
    }

    static sendRequest<T extends WirePayload>(req: T) {
        this.inst.net.sendRequest(req);
    }
}



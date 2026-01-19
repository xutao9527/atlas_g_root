import { _decorator, Component, director } from 'cc';
import {Net} from "db://assets/scripts/common/Net";
import {WirePayload} from "db://assets/scripts/wire/base/Message";
const { ccclass } = _decorator;

//  27374D  526D82  9DB2BF  DDE6ED

@ccclass('Global')
export class Global extends Component {
    static inst: Global;

    net: Net = new Net();

    currentTableId: string | null

    protected onLoad(): void {
        if (Global.inst && Global.inst !== this) {
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
        Global.inst.net.sendRequest(req);
    }
}



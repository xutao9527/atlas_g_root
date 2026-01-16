import { _decorator, Component } from 'cc';
import {AtlasWireMessage} from "db://assets/scripts/wire/base/Message";
import {GetTableResp} from "db://assets/scripts/wire/payload/GetTableResp";
import {eventBus} from "db://assets/scripts/common/EventBus";
import {GetTableReq} from "db://assets/scripts/wire/payload/GetTableReq";
import {Global} from "db://assets/scripts/common/Global";
const { ccclass } = _decorator;

@ccclass('HallMrg')
export class HallMrg extends Component {

    private getTableHandler = (msg: AtlasWireMessage<GetTableResp>) => {
        console.log('HallMrg getTableHandler ', msg);
    }

    onGetTableClick(){
        let getTableReq = new GetTableReq({});
        Global.sendRequest(getTableReq);
    }

    start(){
        let getTableReq = new GetTableReq({});
        Global.sendRequest(getTableReq);
    }

    onEnable(){
        eventBus.on(GetTableReq.METHOD, this.getTableHandler);
    }

    onDisable(){
        eventBus.off(GetTableReq.METHOD, this.getTableHandler);
    }

}



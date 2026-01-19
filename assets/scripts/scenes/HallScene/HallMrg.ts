import { _decorator, Component } from 'cc';
import {AtlasWireMessage} from "db://assets/scripts/wire/base/Message";
import {GetTableListResp} from "db://assets/scripts/wire/payload/GetTableListResp";
import {eventBus} from "db://assets/scripts/common/EventBus";
import {GetTableListReq} from "db://assets/scripts/wire/payload/GetTableListReq";
import {Global} from "db://assets/scripts/common/Global";
const { ccclass } = _decorator;

@ccclass('HallMrg')
export class HallMrg extends Component {

    private getTableListHandler = (_msg: AtlasWireMessage<GetTableListResp>) => {
        //console.log('HallMrg getTableHandler ', msg);
    }

    onGetTableClick(){
        let getTableListReq = new GetTableListReq({});
        Global.sendRequest(getTableListReq);
    }

    start(){
        let getTableListReq = new GetTableListReq({});
        Global.sendRequest(getTableListReq);
    }

    onEnable(){
        eventBus.on(GetTableListReq.METHOD, this.getTableListHandler);
    }

    onDisable(){
        eventBus.off(GetTableListReq.METHOD, this.getTableListHandler);
    }

}



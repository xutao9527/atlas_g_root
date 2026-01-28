import { _decorator, Component } from 'cc';

import {eventBus} from "db://assets/scripts/common/EventBus";
import {Global} from "db://assets/scripts/common/Global";
import {AtlasFrame} from "db://assets/scripts/proto/base/Message";
import {GetTableListResp} from "db://assets/scripts/proto/entity/rpc/GetTableListResp";
import {GetTableListReq} from "db://assets/scripts/proto/entity/rpc/GetTableListReq";
const { ccclass } = _decorator;

@ccclass('HallMrg')
export class HallMrg extends Component {

    private getTableListHandler = (_msg: AtlasFrame<GetTableListResp>) => {
        console.log('HallMrg getTableHandler ', _msg);
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
        eventBus.on(GetTableListReq.OP_CODE, this.getTableListHandler);
    }

    onDisable(){
        eventBus.off(GetTableListReq.OP_CODE, this.getTableListHandler);
    }

}



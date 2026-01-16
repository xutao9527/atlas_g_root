import { _decorator, Component, director } from 'cc';
import {Global} from "db://assets/scripts/common/Global";
import {LeaveTableReq} from "db://assets/scripts/wire/payload/LeaveTableReq";
import {eventBus} from "db://assets/scripts/common/EventBus";
import {AtlasWireMessage} from "db://assets/scripts/wire/base/Message";
import {LeaveTableResp} from "db://assets/scripts/wire/payload/LeaveTableResp";
import {AtlasWireKind} from "db://assets/scripts/wire/base/Header";
const { ccclass } = _decorator;

@ccclass('HoldemMrg')
export class HoldemMrg extends Component {

    private tableId: string = null;

    private leaveTableHandler = (msg: AtlasWireMessage<LeaveTableResp>) => {
         console.log('HoldemMrg leaveTableHandler ', msg)
        if(msg.header.kind == AtlasWireKind.ResponseOk &&  msg.payload.ok){
            director.loadScene('HallScene', () => {
                console.log('HallScene 已切换');
            });
        }else{
            console.log(`HoldemMrg leaveTableHandler ：${msg.payload ?? '未知错误'}`);
        }
    }

    start() {
        this.tableId = Global.inst.currentTableId;
        console.log('进入牌桌：', this.tableId);
    }

    onEnable(){
        eventBus.on(LeaveTableReq.METHOD,this.leaveTableHandler)
    }

    onDisable(){
        eventBus.off(LeaveTableReq.METHOD,this.leaveTableHandler)
    }

    onLeaveTableBtn(){
        console.log('onLeaveTableBtn')
        if(this.tableId){
            let leaveTableReq = new LeaveTableReq({table_id: this.tableId})
            Global.sendRequest(leaveTableReq)
        }
    }
}



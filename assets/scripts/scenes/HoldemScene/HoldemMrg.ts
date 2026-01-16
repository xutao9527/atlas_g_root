import { _decorator, Component, Node } from 'cc';
import {Global} from "db://assets/scripts/common/Global";
const { ccclass, property } = _decorator;

@ccclass('HoldemMrg')
export class HoldemMrg extends Component {
    start() {
        const tableId = Global.inst.currentTableId;
        console.log('进入牌桌：', tableId);
    }

    update(deltaTime: number) {
        
    }

    onLeaveTableBtn(){
        console.log('onLeaveTableBtn')
    }
}



import { _decorator, Component, Node } from 'cc';
import {SeatDirection, SeatNode} from "db://assets/scripts/scenes/prefab/SeatNode";

const { ccclass, property } = _decorator;

@ccclass('TestMrg')
export class TestMrg extends Component {

    @property(SeatNode)
    seatsUp: SeatNode = null;
    @property(SeatNode)
    seatsDown: SeatNode = null;
    @property(SeatNode)
    seatsRight: SeatNode = null;
    @property(SeatNode)
    seatsLeft: SeatNode = null;

    start() {
        this.seatsDown.setDirection(SeatDirection.Down);
        this.seatsUp.setDirection(SeatDirection.Up);
        this.seatsRight.setDirection(SeatDirection.Right);
        this.seatsLeft.setDirection(SeatDirection.Left);
    }


}



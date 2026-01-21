import { _decorator, Component } from 'cc';
import {GameAct} from "db://assets/scripts/scenes/HoldemScene/prefab/GameAct";
const { ccclass, property } = _decorator;

@ccclass('TestActMrg')
export class TestActMrg extends Component {
    @property(GameAct)
    gameAct: GameAct = null;

    start() {
        this.gameAct.setBetRange(10,500)
    }


}



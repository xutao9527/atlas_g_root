import {_decorator, Component, Node} from 'cc';
import {GameActReq} from "db://assets/scripts/wire/payload/GameActReq";
import {Global} from "db://assets/scripts/common/Global";

const {ccclass, property} = _decorator;

@ccclass('GameAct')
export class GameAct extends Component {

    @property(Node)
    fold: Node = null;
    @property(Node)
    check: Node = null;
    @property(Node)
    call: Node = null;
    @property(Node)
    bet: Node = null;
    @property(Node)
    raise: Node = null;

    private tableId: string = null;

    setActive(is_active: boolean, current_turn_act: any) {
        this.fold.active = is_active;
        this.check.active = is_active;
        this.call.active = is_active;
        this.bet.active = is_active;
        this.raise.active = is_active;
        if (is_active) {
            this.fold.active = current_turn_act.fold
            this.check.active = current_turn_act.check
            this.call.active = current_turn_act.call
            this.bet.active = current_turn_act.bet
            this.raise.active = current_turn_act.raise
        }


    }

    setTableId(tableId: string) {
        this.tableId = tableId
    }

    onAction(event: Event, action: string){
        let gameActReq: GameActReq | null = null;
        switch (action) {
            case 'fold':
                gameActReq = new GameActReq({act: 'Fold', table_id: this.tableId});
                break;
            case 'check':
                gameActReq = new GameActReq({act: 'Check', table_id: this.tableId});
                break;
            case 'call':
                gameActReq = new GameActReq({act: 'Call', table_id: this.tableId});
                break;
        }
        if (gameActReq) {
            Global.sendRequest(gameActReq);
        }
    }
}



import {_decorator, Component, Label, Node, Slider} from 'cc';
import {GameActReq} from "db://assets/scripts/wire/payload/GameActReq";
import {Global} from "db://assets/scripts/common/Global";

const {ccclass, property} = _decorator;



export enum BetAct {
    Bet,
    Raise
}

@ccclass('GameAct')
export class GameAct extends Component {

    private tableId: string = null;
    private betMin = 100;
    private betMax = 5000;
    private betStep = 10;
    private betAct: BetAct;

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
    @property(Node)
    allin: Node = null;

    @property(Node)
    betNode: Node = null;
    @property(Slider)
    betSlider: Slider = null;
    @property(Label)
    betLabel: Label = null;

    setState(is_active: boolean, player: any, table: any) {
        this.fold.active = is_active;
        this.check.active = is_active;
        this.call.active = is_active;
        this.bet.active = is_active;
        this.raise.active = is_active;
        this.allin.active = is_active;
        if (is_active) {
            this.fold.active = table.current_turn_act.fold
            this.check.active = table.current_turn_act.check
            this.call.active = table.current_turn_act.call
            this.bet.active = table.current_turn_act.bet
            this.raise.active = table.current_turn_act.raise
            // 设置投注步长,大盲值
            this.betStep =  table.big_blind_amount
            // 计算最低投注额
            let need_amount = table.current_bet + table.big_blind_amount
            // 设置投注范围
            this.setBetRange(need_amount, player.balance)
            // 当余额小于等于最低投注额,只能fold allin
            if (player.balance <= need_amount){
                this.fold.active = true;
                this.check.active = false;
                this.call.active = false;
                this.bet.active = false;
                this.raise.active = false;
                this.allin.active = true;
            }
        }
    }

    setBetRange(min: number, max: number,) {
        this.betMin = min;
        this.betMax = max;
        // 默认滑到最小
        //this.betSlider.progress = 0;
        //this.onUpdateBetValue();
    }

    setTableId(tableId: string) {
        this.tableId = tableId
    }

    onAction(event: Event, action: string){
        let gameActReq: GameActReq | null = null;
        switch (action) {
            case 'fold':
                gameActReq = new GameActReq({act: 'Fold', table_id: this.tableId});
                this.betNode.active = false
                break;
            case 'check':
                gameActReq = new GameActReq({act: 'Check', table_id: this.tableId});
                this.betNode.active = false
                break;
            case 'call':
                gameActReq = new GameActReq({act: 'Call', table_id: this.tableId});
                this.betNode.active = false
                break;
            case 'bet':
                this.betAct = BetAct.Bet
                this.betNode.active = !this.betNode.active
                this.onUpdateBetValue();
                break;
            case 'raise':
                this.betAct = BetAct.Raise
                this.betNode.active = !this.betNode.active

                this.onUpdateBetValue();
                break;
            case 'allin':
                const amount = this.betMax > 5000 ? this.betMax + 999 : 999999999
                gameActReq = new GameActReq({act: {'Raise': amount}, table_id: this.tableId});
        }
        if (gameActReq) {
            Global.sendRequest(gameActReq);
        }
    }

    private onUpdateBetValue() {
        const raw =
            this.betMin +
            this.betSlider.progress * (this.betMax - this.betMin);

        const value =
            Math.floor(raw / this.betStep) * this.betStep;

        this.betLabel.string = value.toString();
    }

    onOk(){
        let gameActReq: GameActReq | null = null;
        const amount = Number(this.betLabel.string);
        switch (this.betAct) {
            case BetAct.Bet:
                gameActReq = new GameActReq({act: {'Bet': amount}, table_id: this.tableId});
                break;
            case BetAct.Raise:
                gameActReq = new GameActReq({act: {'Raise': amount}, table_id: this.tableId});
                break;
        }
        if (gameActReq) {
            Global.sendRequest(gameActReq);
            this.betNode.active = false
        }
    }
}



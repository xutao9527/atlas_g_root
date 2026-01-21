import {_decorator, Component, director, Label} from 'cc';
import {Global} from "db://assets/scripts/common/Global";
import {LeaveTableReq} from "db://assets/scripts/wire/payload/LeaveTableReq";
import {eventBus} from "db://assets/scripts/common/EventBus";
import {AtlasWireMessage} from "db://assets/scripts/wire/base/Message";
import {LeaveTableResp} from "db://assets/scripts/wire/payload/LeaveTableResp";
import {AtlasWireKind} from "db://assets/scripts/wire/base/Header";
import {GetTableInfoResp} from "db://assets/scripts/wire/payload/GetTableInfoResp";
import {GetTableInfoReq} from "db://assets/scripts/wire/payload/GetTableInfoReq";
import {GameStartResp} from "db://assets/scripts/wire/payload/GameStartResp";
import {GameStartReq} from "db://assets/scripts/wire/payload/GameStartReq";
import {CardAssets} from "db://assets/scripts/card/CardAssets";
import {CommunityCards} from "db://assets/scripts/scenes/HoldemScene/prefab/CommunityCards";
import {GameActReq} from "db://assets/scripts/wire/payload/GameActReq";
import {GameActResp} from "db://assets/scripts/wire/payload/GameActResp";
import {SeatDirection, SeatNode} from "db://assets/scripts/scenes/HoldemScene/prefab/SeatNode";
import {GameAct} from "db://assets/scripts/scenes/HoldemScene/prefab/GameAct";

const { ccclass, property } = _decorator;

@ccclass('HoldemMrg')
export class HoldemMrg extends Component {

    private tableId: string = null;

    // net_Index ===> real_index
    private seatIndexMap: Map<number, number> = new Map();

    @property([SeatNode])
    seats: SeatNode[] = [];

    @property(Label)
    gameState:Label = null;

    @property(Label)
    gameStreet:Label = null;

    @property(Label)
    potVal:Label = null;

    @property(CardAssets)
    cardAssets: CardAssets = null;

    @property(CommunityCards)
    communityCards: CommunityCards = null;

    @property(GameAct)
    gameAct: GameAct = null;

    private leaveTableHandler = (msg: AtlasWireMessage<LeaveTableResp>) => {
        //console.log('HoldemMrg leaveTableHandler ', msg)
        if(msg.header.kind == AtlasWireKind.ResponseOk &&  msg.payload.ok){
            director.loadScene('HallScene', () => {
                //console.log('HallScene 已切换');
            });
        }else{
            console.log(`HoldemMrg leaveTableHandler ：${msg.payload ?? '未知错误'}`);
        }
    }

    private getTableInfoHandler = (msg: AtlasWireMessage<GetTableInfoResp>) => {
        //console.log('HoldemMrg getTableInfoHandler ', msg.payload)
        if (msg.header.kind == AtlasWireKind.ResponseOk) {
            let mySeatIndex = msg.payload.seat_index
            let seatCount = msg.payload.seats.length
            // 遍历位置,设置座位信息
            for (let index = 0; index < seatCount; index++) {
                let realIndex = (index + mySeatIndex) % seatCount
                this.seatIndexMap.set(realIndex, index)
                this.seats[index].setSeatIndex(String(realIndex + 1))
                this.seats[index].setCurrentTurn(false)

                let seat = msg.payload.seats[realIndex];
                if (seat) {

                    this.seats[index].setActed(seat.acted_view)
                    this.seats[index].setActed(seat.acted_view)
                    this.seats[index].setNickName(seat.nickname)
                    this.seats[index].setBalance(seat.balance)
                    if (msg.payload.state != 'Waiting'){
                        this.seats[index].showCard(true)
                    }
                }
            }
            // 设置手牌
            for (const [index, card] of msg.payload.hand_cards.entries()) {
                //console.log("设置手牌",index,card)
                if (!card) {
                    this.seats[0].setCard(null, index);
                }else{
                    let cardFrame = this.cardAssets.getCardFrame(card.suit, card.value);
                    this.seats[0].setCard(cardFrame, index);
                }

            }
            // 设置公牌
            for (const [index, card] of msg.payload.community_cards.entries()) {
                if (!card) {
                    this.communityCards.setCard(null, index)
                } else {
                    let cardFrame = this.cardAssets.getCardFrame(card.suit, card.value);
                    this.communityCards.setCard(cardFrame, index)
                }

            }

            // 设置位置标记,行动者,庄位
            let current_turn = this.seatIndexMap.get(msg.payload.current_turn)
            this.seats[current_turn].setCurrentTurn(true)
            let dealer_pos = this.seatIndexMap.get(msg.payload.dealer_pos)
            this.seats[dealer_pos].setZhang(true)

            // 设置状态信息
            this.gameState.string = msg.payload.state
            this.gameStreet.string = msg.payload.street
            this.potVal.string = String(msg.payload.pot)
        }

    }

    private GameStartHandler = (_msg: AtlasWireMessage<GameStartResp>) => {
        //console.log('HoldemMrg GameStartHandler ', msg)
    }

    onEnable(){
        eventBus.on(LeaveTableReq.METHOD,this.leaveTableHandler)
        eventBus.on(GetTableInfoReq.METHOD,this.getTableInfoHandler)
        eventBus.on(GameStartReq.METHOD,this.GameStartHandler)
        eventBus.on(GameActReq.METHOD,this.GameActHandler)
        this.schedule(this.onGetTableInfoBtn, 1);
    }

    onDisable(){
        eventBus.off(LeaveTableReq.METHOD,this.leaveTableHandler)
        eventBus.off(GetTableInfoReq.METHOD,this.getTableInfoHandler)
        eventBus.off(GameStartReq.METHOD,this.GameStartHandler)
        eventBus.off(GameActReq.METHOD,this.GameActHandler)
        this.unschedule(this.onGetTableInfoBtn);
    }

    start() {
        this.seats[0].setDirection(SeatDirection.Down)
        this.seats[1].setDirection(SeatDirection.Right)
        this.seats[2].setDirection(SeatDirection.Up)
        this.seats[3].setDirection(SeatDirection.Up)
        this.seats[4].setDirection(SeatDirection.Left)
        this.seats[5].setDirection(SeatDirection.Down)
        for (let seat of this.seats) {
            seat.hide()
        }
        this.tableId = Global.inst.currentTableId;
        if (!this.tableId){
            this.tableId = "01KFFW8TSEM4BA579WX4PZBKN8"
        }
        this.gameAct.setTableId(this.tableId)
        this.onGetTableInfoBtn()
    }

    onGetTableInfoBtn(){
        //console.log('onGetTableInfoBtn')
        if(this.tableId){
            let getTableInfoReq = new GetTableInfoReq({table_id: this.tableId})
            Global.sendRequest(getTableInfoReq)
        }
    }

    onLeaveTableBtn(){
        if(this.tableId){
            let leaveTableReq = new LeaveTableReq({table_id: this.tableId})
            Global.sendRequest(leaveTableReq)
        }
    }

    onGameStartBtn(){
        let gameStartReq = new GameStartReq({table_id: this.tableId});
        Global.sendRequest(gameStartReq)
    }

    private GameActHandler = (msg: AtlasWireMessage<GameActResp>) => {
        console.log('HoldemMrg GameActHandler ', msg)
        if (msg.header.kind == AtlasWireKind.ResponseOk) {
            this.onGetTableInfoBtn()
        }
    }

    onAction(event: Event, action: string) {
        console.log('action =', action);
        let gameActReq: GameActReq | null = null;
        switch (action) {
            case 'fold':
                gameActReq = new GameActReq({act: 'Fold', table_id: this.tableId});
                break;
            case 'call':
                gameActReq = new GameActReq({act: 'Call', table_id: this.tableId});
                break;
            case 'check':
                gameActReq = new GameActReq({act: 'Check', table_id: this.tableId});
                break;
        }
        if (gameActReq) {
            Global.sendRequest(gameActReq);
        }
    }
}



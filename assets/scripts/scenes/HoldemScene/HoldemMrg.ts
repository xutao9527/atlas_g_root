import {_decorator, Component, director} from 'cc';
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

const { ccclass, property } = _decorator;

@ccclass('HoldemMrg')
export class HoldemMrg extends Component {

    private tableId: string = null;

    // index  ===> realIndex
    private seatIndexMap: Map<number, number> = new Map();

    @property([SeatNode])
    seats: SeatNode[] = [];

    @property(CardAssets)
    cardAssets: CardAssets = null;

    @property(CommunityCards)
    communityCards: CommunityCards = null;   // 6 个座位节点（拖进来）

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
        console.log('HoldemMrg getTableInfoHandler ', msg)
        if (msg.header.kind == AtlasWireKind.ResponseOk) {
            let mySeatIndex = msg.payload.seat_index
            let seatCount = msg.payload.seats.length
            for (let index = 0 ;  index < seatCount ; index++){
                let realIndex = (index + mySeatIndex) % seatCount
                this.seatIndexMap.set(index,realIndex)
                let seat = msg.payload.seats[realIndex];
                this.seats[index].setSeatIndex(String(realIndex + 1))
                if(seat){
                    this.seats[index].setActive(true)
                    this.seats[index].setBet(seat.street_bet)
                    this.seats[index].setNickName(seat.nickname)
                }
            }
        }

        for (const [index, card] of msg.payload.hand_cards.entries()) {
            if (!card) continue;
            let cardFrame = this.cardAssets.getCardFrame(card.suit, card.value);
            this.seats[0].setCard(cardFrame,index);
        }

        for (const [index, card] of msg.payload.community_cards.entries()) {
            if (!card) continue;
            let cardFrame = this.cardAssets.getCardFrame(card.suit, card.value);
            this.communityCards.setCard(cardFrame,index)
        }

        let current_turn = this.seatIndexMap.get(msg.payload.current_turn)
        this.seats[current_turn].setCurrentTurn(true)
        let dealer_pos = this.seatIndexMap.get(msg.payload.dealer_pos)
        this.seats[dealer_pos].setZhang(true)

        console.log('HoldemMrg getTableInfoHandler seatIndexMap', this.seatIndexMap)
        console.log()
    }

    private GameStartHandler = (_msg: AtlasWireMessage<GameStartResp>) => {
        //console.log('HoldemMrg GameStartHandler ', msg)
    }

    onEnable(){
        eventBus.on(LeaveTableReq.METHOD,this.leaveTableHandler)
        eventBus.on(GetTableInfoReq.METHOD,this.getTableInfoHandler)
        eventBus.on(GameStartReq.METHOD,this.GameStartHandler)
        eventBus.on(GameActReq.METHOD,this.GameActHandler)
    }

    onDisable(){
        eventBus.off(LeaveTableReq.METHOD,this.leaveTableHandler)
        eventBus.off(GetTableInfoReq.METHOD,this.getTableInfoHandler)
        eventBus.off(GameStartReq.METHOD,this.GameStartHandler)
        eventBus.off(GameActReq.METHOD,this.GameActHandler)
    }

    start() {
        this.seats[0].setDirection(SeatDirection.Down)
        this.seats[1].setDirection(SeatDirection.Right)
        this.seats[2].setDirection(SeatDirection.Up)
        this.seats[3].setDirection(SeatDirection.Up)
        this.seats[4].setDirection(SeatDirection.Left)
        this.seats[5].setDirection(SeatDirection.Down)
        for (let seat of this.seats) {
            seat.setActive(false)
        }
        this.tableId = Global.inst.currentTableId;
        if (!this.tableId){
            this.tableId = "01KF92WC3SCN0YZZK625K7AFDS"
        }
    }

    onGetTableInfoBtn(){
        //console.log('onGetTableInfoBtn')
        if(this.tableId){
            let getTableInfoReq = new GetTableInfoReq({table_id: this.tableId})
            Global.sendRequest(getTableInfoReq)
        }
    }

    onLeaveTableBtn(){
        //console.log('onLeaveTableBtn')
        if(this.tableId){
            let leaveTableReq = new LeaveTableReq({table_id: this.tableId})
            Global.sendRequest(leaveTableReq)
        }
    }

    onGameStartBtn(){
        let gameStartReq = new GameStartReq({table_id: this.tableId});
        Global.sendRequest(gameStartReq)
    }

    private GameActHandler = (_msg: AtlasWireMessage<GameActResp>) => {
        console.log('HoldemMrg GameActHandler ', _msg)
    }

    onAction(event: Event, action: string) {
        console.log('action =', action);
        let gameActReq: GameActReq | null = null;
        switch (action) {
            case 'fold':
                gameActReq = new GameActReq({act: {kind: 'Fold'}, table_id: this.tableId});
                break;
            case 'call':
                gameActReq = new GameActReq({act: "Call", table_id: this.tableId});
                break;
            case 'check':
                gameActReq = new GameActReq({act: {kind: 'Check'}, table_id: this.tableId});
                break;
        }
        if (gameActReq) {
            Global.sendRequest(gameActReq);
        }
    }
}



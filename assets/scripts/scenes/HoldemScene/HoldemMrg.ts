import { _decorator, Component, director } from 'cc';
import {Global} from "db://assets/scripts/common/Global";
import {LeaveTableReq} from "db://assets/scripts/wire/payload/LeaveTableReq";
import {eventBus} from "db://assets/scripts/common/EventBus";
import {AtlasWireMessage} from "db://assets/scripts/wire/base/Message";
import {LeaveTableResp} from "db://assets/scripts/wire/payload/LeaveTableResp";
import {AtlasWireKind} from "db://assets/scripts/wire/base/Header";
import {GetTableInfoResp} from "db://assets/scripts/wire/payload/GetTableInfoResp";
import {GetTableInfoReq} from "db://assets/scripts/wire/payload/GetTableInfoReq";
import {SeatView} from "db://assets/scripts/scenes/HoldemScene/prefab/SeatView";
import {GameStartResp} from "db://assets/scripts/wire/payload/GameStartResp";
import {GameStartReq} from "db://assets/scripts/wire/payload/GameStartReq";
import {CardAssets} from "db://assets/scripts/card/CardAssets";
import {CommunityCards} from "db://assets/scripts/scenes/HoldemScene/prefab/CommunityCards";
const { ccclass, property } = _decorator;

@ccclass('HoldemMrg')
export class HoldemMrg extends Component {

    private tableId: string = null;

    @property([SeatView])
    seats: SeatView[] = [];   // 6 个座位节点（拖进来）

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
                let seat = msg.payload.seats[realIndex];
                this.seats[index].setSeatIndex(String(realIndex+1))
                if(seat){
                    this.seats[index].setNickName(seat.nickname)
                }
            }
        }
        for (const [index, card] of msg.payload.hand_cards.entries()) {
            if (!card) continue;
            let cardFrame = this.cardAssets.getCardFrame(card.suit, card.value);
            if (index === 0) {
                this.seats[0].setCard1(cardFrame);
            } else if (index === 1) {
                this.seats[0].setCard2(cardFrame);
            }
        }

        for (const [index, card] of msg.payload.community_cards.entries()) {
            if (!card) continue;
            let cardFrame = this.cardAssets.getCardFrame(card.suit, card.value);
            this.communityCards.setCard(cardFrame,index)
        }
    }

    private GameStartHandler = (_msg: AtlasWireMessage<GameStartResp>) => {
        //console.log('HoldemMrg GameStartHandler ', msg)
    }

    onEnable(){
        eventBus.on(LeaveTableReq.METHOD,this.leaveTableHandler)
        eventBus.on(GetTableInfoReq.METHOD,this.getTableInfoHandler)
        eventBus.on(GameStartReq.METHOD,this.GameStartHandler)
    }

    onDisable(){
        eventBus.off(LeaveTableReq.METHOD,this.leaveTableHandler)
        eventBus.off(GetTableInfoReq.METHOD,this.getTableInfoHandler)
        eventBus.on(GameStartReq.METHOD,this.GameStartHandler)
    }

    start() {
        this.tableId = Global.inst.currentTableId;
        //console.log('进入牌桌：', this.tableId);
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
}



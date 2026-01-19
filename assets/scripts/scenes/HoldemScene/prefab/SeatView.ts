import {_decorator, Component, Label, Sprite, SpriteFrame} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('SeatView')
export class SeatView extends Component {

    @property(Label)
    seat_index: Label = null

    @property(Sprite)
    avatar: Sprite = null

    @property(Label)
    nickname: Label = null

    @property(Sprite)
    card1: Sprite = null;

    @property(Sprite)
    card2: Sprite = null;

    setSeatIndex(index: string) {
        this.seat_index.string = index;
    }

    setNickName(nickname:string){
        this.nickname.node.active = true;
        this.nickname.string = nickname
    }

    setCard1(frame: SpriteFrame | null) {
        console.log("333",frame)
        if (!frame) {
            this.card1.node.active = false;
            return;
        }
        this.card1.spriteFrame = frame;
        this.card1.node.active = true;
    }

    setCard2(frame: SpriteFrame | null) {
        if (!frame) {
            this.card2.node.active = false;
            return;
        }
        this.card2.spriteFrame = frame;
        this.card2.node.active = true;
    }
}



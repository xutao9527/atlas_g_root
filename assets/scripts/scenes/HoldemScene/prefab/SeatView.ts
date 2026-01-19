import {_decorator, Component, Label, Sprite, SpriteFrame, UITransform} from 'cc';

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


    setActive(active:boolean){
        this.seat_index.node.active = active;
        this.avatar.node.active = active;
        this.nickname.node.active = active;
        this.card1.node.active = active;
        this.card2.node.active = active;
    }

    setSeatIndex(index: string) {
        this.seat_index.string = index;
    }

    setNickName(nickname:string){

        this.nickname.string = nickname
    }

    setCard(frame: SpriteFrame | null,index:number) {
        if (!frame) {
            return;
        }
        if (index === 0){
            this.card1.spriteFrame = frame;
            this.card1.node.getComponent(UITransform)!.setContentSize(77, 91);
        }
        if (index === 1){
            this.card2.spriteFrame = frame;
            this.card2.node.getComponent(UITransform)!.setContentSize(77, 91);
        }
    }
}



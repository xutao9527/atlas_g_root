import {_decorator, Component, Node, Sprite, Label, Vec3, SpriteFrame, UITransform} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SeatNode')
export class SeatNode extends Component {

    // ==================  state  ==================
    @property(Node)
    stateRoot: Node = null;
    // ------------------  state  ------------------
    @property(Label)
    zhuang:Label = null;
    @property(Label)
    bet:Label = null;
    // ==================  info  ==================
    @property(Node)
    infoRoot: Node = null;
    // ------------------  player  ------------------
    @property(Node)
    playerRoot: Node = null;
    @property(Label)
    seatIndex:Label = null;
    @property(Node)
    playerInfo: Node = null;
    @property(Sprite)
    avatar: Sprite = null;
    @property(Label)
    nickname: Label = null;
    // ------------------  card  ------------------
    @property(Node)
    cardsRoot: Node = null;
    @property(Sprite)
    card1: Sprite = null;
    @property(Sprite)
    card2: Sprite = null;


    setActive(active:boolean){
        if(!active){
            this.zhuang.node.active = active;
            this.bet.node.active = active;
        }

        //this.seatIndex.node.active = active;
        //this.avatar.node.active = active;

        this.nickname.node.active = active;

        this.card1.node.active = active;
        this.card2.node.active = active;
    }

    setDirection(dir: SeatDirection) {
        switch (dir) {
            case SeatDirection.Down:
                break;
            case SeatDirection.Left:
                break;
            case SeatDirection.Up:
                this.stateRoot.setPosition(new Vec3(0, -50))
                this.infoRoot.setPosition(new Vec3(0, 20))
                break;
            case SeatDirection.Right:
                this.playerRoot.setPosition(new Vec3(90, 0))
                this.cardsRoot.setPosition(new Vec3(-42, 0))
                this.seatIndex.node.setPosition(new Vec3(45, 0))
                this.playerInfo.setPosition(new Vec3(-10, 0))
                this.zhuang.node.setPosition(new Vec3(80, 0))
                this.bet.node.setPosition(new Vec3(-50, 0))
                break;
        }
    }

    setSeatIndex(index: string) {
        this.seatIndex.string = index;
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


export enum SeatDirection {
    Down,
    Left,
    Up,
    Right,
}


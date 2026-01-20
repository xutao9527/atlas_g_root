import {_decorator, Component, Node, Sprite, Label, Vec3, SpriteFrame, UITransform, Color} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('SeatNode')
export class SeatNode extends Component {

    // ==================  state  ==================
    @property(Node)
    stateRoot: Node = null;
    // ------------------  state  ------------------
    @property(Label)
    zhuang: Label = null;
    @property(Label)
    balance: Label = null;
    @property(Label)
    acted: Label = null;
    // ==================  info  ==================
    @property(Node)
    infoRoot: Node = null;
    // ------------------  player  ------------------
    @property(Node)
    playerRoot: Node = null;
    @property(Label)
    seatIndex: Label = null;
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

    /// 设置元素显示隐藏
    setActive(active: boolean) {
        if (!active) {
            this.zhuang.node.active = active;
            this.balance.node.active = active;
            this.acted.node.active = active;
        }

        //this.seatIndex.node.active = active;
        //this.avatar.node.active = active;
        this.nickname.node.active = active;

        this.card1.node.active = active;
        this.card2.node.active = active;
    }

    // 设置庄家
    setZhang(active: boolean) {
        this.zhuang.node.active = active;
    }

    // 设置行动者
    setCurrentTurn(active: boolean) {
        if (active) {
            this.seatIndex.color = new Color(255, 215, 0, 255);
        } else {
            this.seatIndex.color = new Color(221, 230, 237, 255);
        }
    }

    // 设置行动动作
    setActed(acted: string) {
        if (acted) {
            this.acted.string = acted
            this.acted.node.active = true
        } else {
            this.acted.node.active = false
        }
    }
    // 设置余额
    setBalance(balance: string) {
        if (balance) {
            this.balance.string = balance
            this.balance.node.active = true
        } else {
            this.balance.node.active = false
        }
    }

    // 设置昵称
    setNickName(nickname: string) {
        this.nickname.string = nickname
    }

    // 设置手牌
    setCard(frame: SpriteFrame | null, index: number) {
        if (!frame) {
            return;
        }
        if (index === 0) {
            this.card1.spriteFrame = frame;
            this.card1.node.active = true
            // this.card1.node.getComponent(UITransform)!.setContentSize(77, 91);
        }
        if (index === 1) {
            this.card2.spriteFrame = frame;
            this.card2.node.active = true
            // this.card2.node.getComponent(UITransform)!.setContentSize(77, 91);
        }
    }



    // 设置座位方向
    setDirection(dir: SeatDirection) {
        switch (dir) {
            case SeatDirection.Down:
                break;
            case SeatDirection.Left:
                break;
            case SeatDirection.Up:
                this.stateRoot.setPosition(new Vec3(0, -50))
                this.infoRoot.setPosition(new Vec3(0, 20))
                this.zhuang.node.setPosition(new Vec3(-135, 30))
                break;
            case SeatDirection.Right:
                this.playerRoot.setPosition(new Vec3(90, 0))
                this.cardsRoot.setPosition(new Vec3(-42, 0))
                this.seatIndex.node.setPosition(new Vec3(45, 0))
                this.playerInfo.setPosition(new Vec3(-10, 0))
                this.zhuang.node.setPosition(new Vec3(135, -30))
                this.balance.node.setPosition(new Vec3(80, 0))
                this.acted.node.setPosition(new Vec3(-50, 0))
                break;
        }
    }

    // 设置座位序号
    setSeatIndex(index: string) {
        this.seatIndex.string = index;
    }
}

export enum SeatDirection {
    Down,
    Left,
    Up,
    Right,
}


import { _decorator, Component, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CommunityCards')
export class CommunityCards extends Component {

    @property([Sprite])
    cards: Sprite[] = [];

    setCard(frame: SpriteFrame | null,index:number) {
        if (!frame) {
            this.cards[index].node.active = false;
        }else{
            this.cards[index].spriteFrame = frame;
            this.cards[index].node.active = true;
        }

    }
}



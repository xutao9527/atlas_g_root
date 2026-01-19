import { _decorator, Component, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

const SuitIndex: Record<string, number> = {
    Spade: 1,
    Club: 0,
    Heart: 3,
    Diamond: 2,
};

const ValueIndex: Record<string, number> = {
    Two: 0,
    Three: 1,
    Four: 2,
    Five: 3,
    Six: 4,
    Seven: 5,
    Eight: 6,
    Nine: 7,
    Ten: 8,
    Jack: 9,
    Queen: 10,
    King: 11,
    Ace: 12,
};

@ccclass('CardAssets')
export class CardAssets extends Component {
    @property([SpriteFrame])
    cards: SpriteFrame[] = [];

    /** 牌背 */
    @property(SpriteFrame)
    cardBack: SpriteFrame = null;

    getCardFrame(suit: string, value: string): SpriteFrame {
        let suitIndex = SuitIndex[suit];
        let valueIndex = ValueIndex[value];
        valueIndex = ((valueIndex + 1) % 13) * 4 + suitIndex
        return this.cards[valueIndex]
    }



}



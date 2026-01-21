// @ts-ignore
import {WirePayload} from "db://assets/scripts/wire/base/Message";

export interface GetTableInfoRespProps {
    id: string;
    seats: any | null[];
    state: any;
    hand_id: string;
    street: any;
    small_blind_amount: number;
    big_blind_amount: number;
    pot: number;
    current_bet: number;
    dealer_pos: any;
    small_blind_pos: any;
    big_blind_pos: any;
    current_turn: any;
    current_turn_act: any;
    last_raiser_pos: any;
    community_cards: any;
    hand_cards: any;
    seat_index: any;
}

export class GetTableInfoResp extends WirePayload{
    static readonly METHOD = 3 << 16 | 2;

    id: string;
    seats: any | null[];
    state: any;
    hand_id: string;
    street: any;
    small_blind_amount: number;
    big_blind_amount: number;
    pot: number;
    current_bet: number;
    dealer_pos: any;
    small_blind_pos: any;
    big_blind_pos: any;
    current_turn: any;
    current_turn_act: any;
    last_raiser_pos: any;
    community_cards: any;
    hand_cards: any;
    seat_index: any;

    constructor(
        props: GetTableInfoRespProps
    ) {
        super();
        this.id = props.id;
        this.seats = props.seats;
        this.state = props.state;
        this.hand_id = props.hand_id;
        this.street = props.street;
        this.small_blind_amount = props.small_blind_amount;
        this.big_blind_amount = props.big_blind_amount;
        this.pot = props.pot;
        this.current_bet = props.current_bet;
        this.dealer_pos = props.dealer_pos;
        this.small_blind_pos = props.small_blind_pos;
        this.big_blind_pos = props.big_blind_pos;
        this.current_turn = props.current_turn;
        this.current_turn_act = props.current_turn_act;
        this.last_raiser_pos = props.last_raiser_pos;
        this.community_cards = props.community_cards;
        this.hand_cards = props.hand_cards;
        this.seat_index = props.seat_index;
    }
}

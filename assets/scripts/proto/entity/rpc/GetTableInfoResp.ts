// @ts-ignore
import { AtlasFrameBody } from "db://assets/scripts/proto/base/Message";
import { PlayerView } from "../type/PlayerView";
import { TableStateKind } from "../type/TableStateKind";
import { TableStreetKind } from "../type/TableStreetKind";
import { PlayerAvailableActView } from "../type/PlayerAvailableActView";
import { AtlasCardView } from "../type/AtlasCardView";

export interface GetTableInfoRespProps {
    id: string;
    seats: (PlayerView | null)[];
    state: TableStateKind;
    hand_id: string;
    street: TableStreetKind;
    small_blind_amount: number;
    big_blind_amount: number;
    pot: number;
    current_bet: number;
    dealer_pos: number;
    small_blind_pos: number;
    big_blind_pos: number;
    current_turn: number;
    current_turn_act: PlayerAvailableActView;
    last_raiser_pos: number;
    community_cards: (AtlasCardView | null)[];
    hand_cards: (AtlasCardView | null)[];
    seat_index: number;
}

export class GetTableInfoResp extends AtlasFrameBody {
    static readonly OP_CODE = 2 << 16 | 2;
    id: string;
    seats: (PlayerView | null)[];
    state: TableStateKind;
    hand_id: string;
    street: TableStreetKind;
    small_blind_amount: number;
    big_blind_amount: number;
    pot: number;
    current_bet: number;
    dealer_pos: number;
    small_blind_pos: number;
    big_blind_pos: number;
    current_turn: number;
    current_turn_act: PlayerAvailableActView;
    last_raiser_pos: number;
    community_cards: (AtlasCardView | null)[];
    hand_cards: (AtlasCardView | null)[];
    seat_index: number;

    constructor(props: GetTableInfoRespProps) {
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

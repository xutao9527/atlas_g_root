
export interface PlayerView {
    id: string;
    nickname: string;
    balance: number;
    sit_out: boolean;
    win: boolean;
    is_active: boolean;
    has_acted: boolean;
    acted_view: string;
    is_all_in: boolean;
    street_bet: number;
    total_bet: number;
}

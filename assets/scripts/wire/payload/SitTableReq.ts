// @ts-ignore
import {WirePayload} from "db://assets/scripts/wire/base/Message";

export interface SitTableReqProps {
    table_id: string;
    seat_index: number;
    buy_in: number;
}

export class SitTableReq extends WirePayload{
    static readonly METHOD = 3 << 16 | 3;

    table_id: string;
    seat_index: number;
    buy_in: number;

    constructor(
        props: SitTableReqProps
    ) {
        super();
        this.table_id = props.table_id;
        this.seat_index = props.seat_index;
        this.buy_in = props.buy_in;
    }
}

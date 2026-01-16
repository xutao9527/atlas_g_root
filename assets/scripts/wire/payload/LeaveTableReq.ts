import {WirePayload} from "db://assets/scripts/wire/base/Message";

export interface LeaveTableReqProps {
    table_id: string;
    seat_index: number;
}

export class LeaveTableReq extends WirePayload{
    static readonly METHOD = 3 << 16 | 3;

    table_id: string;
    seat_index: number;

    constructor(
        props: LeaveTableReqProps
    ) {
        super();
        this.table_id = props.table_id;
        this.seat_index = props.seat_index;
    }
}

// @ts-ignore
import {WirePayload} from "db://assets/scripts/wire/base/Message";

export interface LeaveTableReqProps {
    table_id: string;
}

export class LeaveTableReq extends WirePayload{
    static readonly METHOD = 3 << 16 | 4;

    table_id: string;

    constructor(
        props: LeaveTableReqProps
    ) {
        super();
        this.table_id = props.table_id;
    }
}

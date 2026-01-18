// @ts-ignore
import {WirePayload} from "db://assets/scripts/wire/base/Message";

export interface GetTableInfoReqProps {
    table_id: string;
}

export class GetTableInfoReq extends WirePayload{
    static readonly METHOD = 3 << 16 | 2;

    table_id: string;

    constructor(
        props: GetTableInfoReqProps
    ) {
        super();
        this.table_id = props.table_id;
    }
}

import {WirePayload} from "db://assets/scripts/wire/base/message";

export interface GetTableReqProps {
}

export class GetTableReq extends WirePayload{
    static readonly METHOD = 3 << 16 | 1;


    constructor(
        props: GetTableReqProps
    ) {
        super();
    }
}

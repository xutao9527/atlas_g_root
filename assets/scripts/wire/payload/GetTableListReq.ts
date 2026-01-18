// @ts-ignore
import {WirePayload} from "db://assets/scripts/wire/base/Message";

export interface GetTableListReqProps {
}

export class GetTableListReq extends WirePayload{
    static readonly METHOD = 3 << 16 | 1;


    constructor(
        props: GetTableListReqProps
    ) {
        super();
    }
}

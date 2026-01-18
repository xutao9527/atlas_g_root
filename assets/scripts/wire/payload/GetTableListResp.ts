import {WirePayload} from "db://assets/scripts/wire/base/Message";

export interface GetTableListRespProps {
    tables: any[];
}

export class GetTableListResp extends WirePayload{
    static readonly METHOD = 3 << 16 | 1;

    tables: any[];

    constructor(
        props: GetTableListRespProps
    ) {
        super();
        this.tables = props.tables;
    }
}

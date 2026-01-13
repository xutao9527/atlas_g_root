import {WirePayload} from "db://assets/scripts/wire/base/message";

export interface GetTableRespProps {
    tables: any[];
}

export class GetTableResp extends WirePayload{
    static readonly METHOD = 3 << 16 | 1;

    tables: any[];

    constructor(
        props: GetTableRespProps
    ) {
        super();
        this.tables = props.tables;
    }
}

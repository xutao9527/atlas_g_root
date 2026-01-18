// @ts-ignore
import {WirePayload} from "db://assets/scripts/wire/base/Message";

export interface SitTableRespProps {
    ok: boolean;
    table_id: string;
    message: string | null;
}

export class SitTableResp extends WirePayload{
    static readonly METHOD = 3 << 16 | 3;

    ok: boolean;
    table_id: string;
    message: string | null;

    constructor(
        props: SitTableRespProps
    ) {
        super();
        this.ok = props.ok;
        this.table_id = props.table_id;
        this.message = props.message;
    }
}

import {WirePayload} from "db://assets/scripts/wire/base/Message";

export interface SitTableRespProps {
    ok: boolean;
    message: string | null;
}

export class SitTableResp extends WirePayload{
    static readonly METHOD = 3 << 16 | 2;

    ok: boolean;
    message: string | null;

    constructor(
        props: SitTableRespProps
    ) {
        super();
        this.ok = props.ok;
        this.message = props.message;
    }
}

import {WirePayload} from "db://assets/scripts/wire/base/Message";

export interface LeaveTableRespProps {
    ok: boolean;
    message: string | null;
}

export class LeaveTableResp extends WirePayload{
    static readonly METHOD = 3 << 16 | 3;

    ok: boolean;
    message: string | null;

    constructor(
        props: LeaveTableRespProps
    ) {
        super();
        this.ok = props.ok;
        this.message = props.message;
    }
}

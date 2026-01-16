import {WirePayload} from "db://assets/scripts/wire/base/Message";

export interface RegisterRespProps {
    ok: boolean;
    message: string | null;
}

export class RegisterResp extends WirePayload{
    static readonly METHOD = 1 << 16 | 1;

    ok: boolean;
    message: string | null;

    constructor(
        props: RegisterRespProps
    ) {
        super();
        this.ok = props.ok;
        this.message = props.message;
    }
}

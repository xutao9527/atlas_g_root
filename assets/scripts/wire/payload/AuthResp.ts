import {WirePayload} from "db://assets/scripts/wire/base/message";

export interface AuthRespProps {
    ok: boolean;
    uid: string | null;
    token: string | null;
    expire_at: number | null;
    error: string | null;
}

export class AuthResp extends WirePayload{
    static readonly METHOD = 1 << 16 | 2;

    ok: boolean;
    uid: string | null;
    token: string | null;
    expire_at: number | null;
    error: string | null;

    constructor(
        props: AuthRespProps
    ) {
        super();
        this.ok = props.ok;
        this.uid = props.uid;
        this.token = props.token;
        this.expire_at = props.expire_at;
        this.error = props.error;
    }
}

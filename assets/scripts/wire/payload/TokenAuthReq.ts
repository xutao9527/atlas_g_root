import {WirePayload} from "db://assets/scripts/wire/base/Message";

export interface TokenAuthReqProps {
    token: string;
}

export class TokenAuthReq extends WirePayload{
    static readonly METHOD = 1 << 16 | 3;

    token: string;

    constructor(
        props: TokenAuthReqProps
    ) {
        super();
        this.token = props.token;
    }
}

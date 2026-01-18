// @ts-ignore
import {WirePayload} from "db://assets/scripts/wire/base/Message";

export interface BasicAuthReqProps {
    account: string;
    password: string;
}

export class BasicAuthReq extends WirePayload{
    static readonly METHOD = 1 << 16 | 2;

    account: string;
    password: string;

    constructor(
        props: BasicAuthReqProps
    ) {
        super();
        this.account = props.account;
        this.password = props.password;
    }
}

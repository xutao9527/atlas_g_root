import {WirePayload} from "db://assets/scripts/wire/base/message";

export interface RegisterReqProps {
    account: string;
    password: string;
    nickname: string;
}

export class RegisterReq extends WirePayload{
    static readonly METHOD = 1 << 16 | 1;

    account: string;
    password: string;
    nickname: string;

    constructor(
        props: RegisterReqProps
    ) {
        super();
        this.account = props.account;
        this.password = props.password;
        this.nickname = props.nickname;
    }
}

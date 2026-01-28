// @ts-ignore
import { AtlasFrameBody } from "db://assets/scripts/proto/base/Message";

export interface RegisterReqProps {
    account: string;
    password: string;
    nickname: string;
}

export class RegisterReq extends AtlasFrameBody {
    static readonly OP_CODE = 1 << 16 | 1;
    account: string;
    password: string;
    nickname: string;

    constructor(props: RegisterReqProps) {
        super();
        this.account = props.account;
        this.password = props.password;
        this.nickname = props.nickname;
    }
}

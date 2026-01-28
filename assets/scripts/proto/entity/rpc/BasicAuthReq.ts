// @ts-ignore
import { AtlasFrameBody } from "db://assets/scripts/proto/base/Message";

export interface BasicAuthReqProps {
    account: string;
    password: string;
}

export class BasicAuthReq extends AtlasFrameBody {
    static readonly OP_CODE = 1 << 16 | 4;
    account: string;
    password: string;

    constructor(props: BasicAuthReqProps) {
        super();
        this.account = props.account;
        this.password = props.password;
    }
}

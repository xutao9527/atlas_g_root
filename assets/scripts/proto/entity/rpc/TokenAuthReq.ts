// @ts-ignore
import { AtlasFrameBody } from "db://assets/scripts/proto/base/Message";

export interface TokenAuthReqProps {
    token: string;
}

export class TokenAuthReq extends AtlasFrameBody {
    static readonly OP_CODE = 1 << 16 | 3;
    token: string;

    constructor(props: TokenAuthReqProps) {
        super();
        this.token = props.token;
    }
}

// @ts-ignore
import { AtlasFrameBody } from "db://assets/scripts/proto/base/Message";

export interface AuthRespProps {
    ok: boolean;
    uid: string | null;
    token: string | null;
    expire_at: number | null;
}

export class AuthResp extends AtlasFrameBody {
    static readonly OP_CODE = 1 << 16 | 3;
    ok: boolean;
    uid: string | null;
    token: string | null;
    expire_at: number | null;

    constructor(props: AuthRespProps) {
        super();
        this.ok = props.ok;
        this.uid = props.uid;
        this.token = props.token;
        this.expire_at = props.expire_at;
    }
}

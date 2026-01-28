// @ts-ignore
import { AtlasFrameBody } from "db://assets/scripts/proto/base/Message";

export interface RegisterRespProps {
    ok: boolean;
    message: string | null;
}

export class RegisterResp extends AtlasFrameBody {
    static readonly OP_CODE = 1 << 16 | 1;
    ok: boolean;
    message: string | null;

    constructor(props: RegisterRespProps) {
        super();
        this.ok = props.ok;
        this.message = props.message;
    }
}

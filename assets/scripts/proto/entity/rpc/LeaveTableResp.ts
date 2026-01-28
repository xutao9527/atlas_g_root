// @ts-ignore
import { AtlasFrameBody } from "db://assets/scripts/proto/base/Message";

export interface LeaveTableRespProps {
    ok: boolean;
    message: string | null;
}

export class LeaveTableResp extends AtlasFrameBody {
    static readonly OP_CODE = 3 << 16 | 4;
    ok: boolean;
    message: string | null;

    constructor(props: LeaveTableRespProps) {
        super();
        this.ok = props.ok;
        this.message = props.message;
    }
}

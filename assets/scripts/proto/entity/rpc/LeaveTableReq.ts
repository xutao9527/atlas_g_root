// @ts-ignore
import { AtlasFrameBody } from "db://assets/scripts/proto/base/Message";

export interface LeaveTableReqProps {
    table_id: string;
}

export class LeaveTableReq extends AtlasFrameBody {
    static readonly OP_CODE = 3 << 16 | 4;
    table_id: string;

    constructor(props: LeaveTableReqProps) {
        super();
        this.table_id = props.table_id;
    }
}

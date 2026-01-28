// @ts-ignore
import { AtlasFrameBody } from "db://assets/scripts/proto/base/Message";

export interface GetTableInfoReqProps {
    table_id: string;
}

export class GetTableInfoReq extends AtlasFrameBody {
    static readonly OP_CODE = 3 << 16 | 2;
    table_id: string;

    constructor(props: GetTableInfoReqProps) {
        super();
        this.table_id = props.table_id;
    }
}

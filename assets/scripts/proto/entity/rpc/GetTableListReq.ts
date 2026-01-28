// @ts-ignore
import { AtlasFrameBody } from "db://assets/scripts/proto/base/Message";

export interface GetTableListReqProps {
}

export class GetTableListReq extends AtlasFrameBody {
    static readonly OP_CODE = 3 << 16 | 1;

    constructor(props: GetTableListReqProps) {
        super();
    }
}

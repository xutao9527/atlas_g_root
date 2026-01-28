// @ts-ignore
import { AtlasFrameBody } from "db://assets/scripts/proto/base/Message";

export interface GameStartReqProps {
    table_id: string;
}

export class GameStartReq extends AtlasFrameBody {
    static readonly OP_CODE = 2 << 16 | 6;
    table_id: string;

    constructor(props: GameStartReqProps) {
        super();
        this.table_id = props.table_id;
    }
}

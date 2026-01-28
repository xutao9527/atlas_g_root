// @ts-ignore
import { AtlasFrameBody } from "db://assets/scripts/proto/base/Message";
import { PlayerActionKind } from "../type/PlayerActionKind";

export interface GameActReqProps {
    table_id: string;
    act: PlayerActionKind;
}

export class GameActReq extends AtlasFrameBody {
    static readonly OP_CODE = 3 << 16 | 5;
    table_id: string;
    act: PlayerActionKind;

    constructor(props: GameActReqProps) {
        super();
        this.table_id = props.table_id;
        this.act = props.act;
    }
}

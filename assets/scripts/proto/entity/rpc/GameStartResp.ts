// @ts-ignore
import { AtlasFrameBody } from "db://assets/scripts/proto/base/Message";

export interface GameStartRespProps {
    ok: boolean;
    message: string | null;
}

export class GameStartResp extends AtlasFrameBody {
    static readonly OP_CODE = 2 << 16 | 6;
    ok: boolean;
    message: string | null;

    constructor(props: GameStartRespProps) {
        super();
        this.ok = props.ok;
        this.message = props.message;
    }
}

// @ts-ignore
import { AtlasFrameBody } from "db://assets/scripts/proto/base/Message";

export interface GameActRespProps {
    ok: boolean;
    message: string | null;
}

export class GameActResp extends AtlasFrameBody {
    static readonly OP_CODE = 3 << 16 | 5;
    ok: boolean;
    message: string | null;

    constructor(props: GameActRespProps) {
        super();
        this.ok = props.ok;
        this.message = props.message;
    }
}

// @ts-ignore
import {WirePayload} from "db://assets/scripts/wire/base/Message";

export interface GameStartRespProps {
    ok: boolean;
    message: string | null;
}

export class GameStartResp extends WirePayload{
    static readonly METHOD = 3 << 16 | 6;

    ok: boolean;
    message: string | null;

    constructor(
        props: GameStartRespProps
    ) {
        super();
        this.ok = props.ok;
        this.message = props.message;
    }
}

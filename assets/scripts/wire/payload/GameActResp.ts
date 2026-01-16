import {WirePayload} from "db://assets/scripts/wire/base/Message";

export interface GameActRespProps {
    ok: boolean;
    message: string | null;
}

export class GameActResp extends WirePayload{
    static readonly METHOD = 3 << 16 | 4;

    ok: boolean;
    message: string | null;

    constructor(
        props: GameActRespProps
    ) {
        super();
        this.ok = props.ok;
        this.message = props.message;
    }
}

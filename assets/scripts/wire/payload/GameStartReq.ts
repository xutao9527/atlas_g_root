// @ts-ignore
import {WirePayload} from "db://assets/scripts/wire/base/Message";

export interface GameStartReqProps {
    table_id: string;
}

export class GameStartReq extends WirePayload{
    static readonly METHOD = 3 << 16 | 6;

    table_id: string;

    constructor(
        props: GameStartReqProps
    ) {
        super();
        this.table_id = props.table_id;
    }
}

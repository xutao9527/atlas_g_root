import {WirePayload} from "db://assets/scripts/wire/base/Message";

export interface GameActReqProps {
    table_id: string;
    act: any;
}

export class GameActReq extends WirePayload{
    static readonly METHOD = 3 << 16 | 4;

    table_id: string;
    act: any;

    constructor(
        props: GameActReqProps
    ) {
        super();
        this.table_id = props.table_id;
        this.act = props.act;
    }
}

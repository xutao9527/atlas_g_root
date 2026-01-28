// @ts-ignore
import { AtlasFrameBody } from "db://assets/scripts/proto/base/Message";

export interface SitTableRespProps {
    ok: boolean;
    table_id: string;
    message: string | null;
}

export class SitTableResp extends AtlasFrameBody {
    static readonly OP_CODE = 3 << 16 | 3;
    ok: boolean;
    table_id: string;
    message: string | null;

    constructor(props: SitTableRespProps) {
        super();
        this.ok = props.ok;
        this.table_id = props.table_id;
        this.message = props.message;
    }
}

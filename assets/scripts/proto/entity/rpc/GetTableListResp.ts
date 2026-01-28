// @ts-ignore
import { AtlasFrameBody } from "db://assets/scripts/proto/base/Message";
import { TableView } from "../type/TableView";

export interface GetTableListRespProps {
    tables: TableView[];
}

export class GetTableListResp extends AtlasFrameBody {
    static readonly OP_CODE = 2 << 16 | 1;
    tables: TableView[];

    constructor(props: GetTableListRespProps) {
        super();
        this.tables = props.tables;
    }
}

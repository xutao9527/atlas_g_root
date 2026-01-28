// @ts-ignore
import { AtlasFrameBody } from "db://assets/scripts/proto/base/Message";

export interface UserUpdateNotifyProps {
    id: string;
    account: string;
    name: string;
    balance: any;
    avatar: string | null;
}

export class UserUpdateNotify extends AtlasFrameBody {
    static readonly OP_CODE = 1 << 16 | 1;
    id: string;
    account: string;
    name: string;
    balance: any;
    avatar: string | null;

    constructor(props: UserUpdateNotifyProps) {
        super();
        this.id = props.id;
        this.account = props.account;
        this.name = props.name;
        this.balance = props.balance;
        this.avatar = props.avatar;
    }
}

import {_decorator, Component, Label, Node} from 'cc';
import {Global} from "db://assets/scripts/common/Global";
import {SitTableReq} from "db://assets/scripts/proto/entity/rpc/SitTableReq";


const {ccclass, property} = _decorator;

@ccclass('TableItem')
export class TableItem extends Component {
    @property(Label)
    tableIdLabel: Label | null = null;
    @property(Label)
    blindLabel: Label | null = null;
    @property([Node])
    seats: Node[] = [];   // 6 个座位节点（拖进来）
    /** 当前桌子数据 */
    private tableData: any = null;

    setData(table: any) {
        this.tableData = table;

        if (this.tableIdLabel) {
            this.tableIdLabel.string = table.id;
        }

        if (this.blindLabel) {
            this.blindLabel.string = `${table.small_blind_amount}/${table.big_blind_amount}`;
        }

        this.refreshSeats();

    }

    onEnable(){
        this.seats.forEach((seatNode,index) => {
            seatNode.on(
                Node.EventType.TOUCH_END,
                () => this.onClickSeat(index),
                this
            );
        })

    }

    onDisable() {
        for (const seat of this.seats) {
            seat.off(Node.EventType.TOUCH_END);
        }

    }

    private refreshSeats() {
        if (!this.tableData) return;
        for (let i = 0; i < this.seats.length; i++) {
            const seatNode = this.seats[i];
            const nickname: string | null = this.tableData.seats[i];
            const label = seatNode.getComponentInChildren(Label);
            if (nickname) {
                if (label) {
                    label.string = nickname;
                }
            } else {
                if (label) {
                    label.string = '空位';
                }
            }
        }
    }

    private onClickSeat(seatIndex: number) {
        // 发送 SitTableReq
        Global.sendRequest(new SitTableReq({
            table_id: this.tableData.id,
            seat_index: seatIndex,
            buy_in: 1000,
        }));
    }
}



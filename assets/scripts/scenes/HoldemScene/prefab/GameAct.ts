import {_decorator, Component, Node} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('GameAct')
export class GameAct extends Component {

    @property(Node)
    fold: Node = null;
    @property(Node)
    check: Node = null;
    @property(Node)
    call: Node = null;
    @property(Node)
    bet: Node = null;
    @property(Node)
    raise: Node = null;

    private tableId: string = null;

    setTableId(tableId: string) {
        this.tableId = tableId
    }
}



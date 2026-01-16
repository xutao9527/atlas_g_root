import { _decorator, Component, instantiate, Node, Prefab } from 'cc'
import {GetTableResp} from "db://assets/scripts/wire/payload/GetTableResp"
import {GetTableReq} from "db://assets/scripts/wire/payload/GetTableReq"
import {eventBus} from "db://assets/scripts/common/EventBus"
import {AtlasWireMessage} from "db://assets/scripts/wire/base/Message"
import {TableItem} from "db://assets/scripts/scenes/HallScene/prefab/TableItem"

const { ccclass, property } = _decorator

@ccclass('TableList')
export class TableList extends Component {

    @property(Node)
    content: Node | null = null   // 指向 ScrollView/view/content

    @property(Prefab)
    tableItemPrefab: Prefab | null = null


    private getTableHandler = (msg: AtlasWireMessage<GetTableResp>) => {
        console.log('TableList getTableHandler ', msg)
        this.refreshList(msg.payload.tables)
    }

    onEnable(){
        eventBus.on(GetTableReq.METHOD, this.getTableHandler)
    }

    onDisable(){
        eventBus.off(GetTableReq.METHOD, this.getTableHandler)
    }

    refreshList(tables: any[]) {
        if (!this.content || !this.tableItemPrefab) return

        this.content.removeAllChildren()

        for (let i = 0 ; i < tables.length ; i++) {
            const item = instantiate(this.tableItemPrefab)
            item.setParent(this.content) // ✅ 加到 content
            item.active = true
            const tableItem = item.getComponent(TableItem)
            if(tableItem){
                tableItem.setData(tables[i])
            }
        }

    }
}



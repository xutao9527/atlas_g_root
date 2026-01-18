import { _decorator, Component, director, instantiate, Node, Prefab } from 'cc'
import {GetTableListResp} from "db://assets/scripts/wire/payload/GetTableListResp"
import {GetTableListReq} from "db://assets/scripts/wire/payload/GetTableListReq"
import {eventBus} from "db://assets/scripts/common/EventBus"
import {AtlasWireMessage} from "db://assets/scripts/wire/base/Message"
import {TableItem} from "db://assets/scripts/scenes/HallScene/prefab/TableItem"
import {SitTableResp} from "db://assets/scripts/wire/payload/SitTableResp";
import {SitTableReq} from "db://assets/scripts/wire/payload/SitTableReq";
import {Global} from "db://assets/scripts/common/Global";

const { ccclass, property } = _decorator

@ccclass('TableList')
export class TableList extends Component {

    @property(Node)
    content: Node | null = null

    @property(Prefab)
    tableItemPrefab: Prefab | null = null


    private getTableListHandler = (msg: AtlasWireMessage<GetTableListResp>) => {
        // console.log('TableList getTableHandler ', msg)
        this.refreshList(msg.payload.tables)
    }

    private sitTableRespHandler = (msg: AtlasWireMessage<SitTableResp>) => {
        //console.log('TableList sitTableRespHandler ', msg);
        if (msg.payload.ok) {
            Global.inst.currentTableId = msg.payload.table_id
            this.scheduleOnce(() => {
                director.loadScene('HoldemScene', () => {
                    //console.log('HoldemScene 已切换');
                });
            }, 0.8); // 0.5 秒提示 + 0.3 秒淡出
        } else {
            console.log(`坐下：${msg.payload.message ?? '未知错误'}`);
        }
    }

    onEnable(){
        eventBus.on(GetTableListReq.METHOD, this.getTableListHandler)
        eventBus.on(SitTableReq.METHOD, this.sitTableRespHandler)
    }

    onDisable(){
        eventBus.off(GetTableListReq.METHOD, this.getTableListHandler)
        eventBus.off(SitTableReq.METHOD, this.sitTableRespHandler)
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



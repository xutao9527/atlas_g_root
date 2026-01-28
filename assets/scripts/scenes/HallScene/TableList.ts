import { _decorator, Component, director, instantiate, Node, Prefab } from 'cc'

import {eventBus} from "db://assets/scripts/common/EventBus"

import {TableItem} from "db://assets/scripts/scenes/HallScene/prefab/TableItem"

import {Global} from "db://assets/scripts/common/Global";
import {AtlasFrame} from "db://assets/scripts/proto/base/Message";
import {GetTableListResp} from "db://assets/scripts/proto/entity/rpc/GetTableListResp";
import {SitTableResp} from "db://assets/scripts/proto/entity/rpc/SitTableResp";
import {GetTableListReq} from "db://assets/scripts/proto/entity/rpc/GetTableListReq";
import {SitTableReq} from "db://assets/scripts/proto/entity/rpc/SitTableReq";

const { ccclass, property } = _decorator

@ccclass('TableList')
export class TableList extends Component {

    @property(Node)
    content: Node | null = null

    @property(Prefab)
    tableItemPrefab: Prefab | null = null


    private getTableListHandler = (msg: AtlasFrame<GetTableListResp>) => {
        // console.log('TableList getTableHandler ', msg)
        this.refreshList(msg.payload.tables)
    }

    private sitTableRespHandler = (msg: AtlasFrame<SitTableResp>) => {
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
        eventBus.on(GetTableListReq.OP_CODE, this.getTableListHandler)
        eventBus.on(SitTableReq.OP_CODE, this.sitTableRespHandler)
    }

    onDisable(){
        eventBus.off(GetTableListReq.OP_CODE, this.getTableListHandler)
        eventBus.off(SitTableReq.OP_CODE, this.sitTableRespHandler)
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



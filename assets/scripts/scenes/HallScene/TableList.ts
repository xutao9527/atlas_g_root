import { _decorator, Component, instantiate, Node, Prefab, Layout } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TableList')
export class TableList extends Component {

    @property(Node)
    content: Node | null = null;   // 指向 ScrollView/view/content

    @property(Prefab)
    tableItemPrefab: Prefab | null = null;



    start() {
        this.refreshList([1, 2, 3, 4, 5]);
    }
  

    refreshList(list: any[]) {
        if (!this.content || !this.tableItemPrefab) return;

        this.content.removeAllChildren();

        for (let i = 0; i < list.length; i++) {
            const item = instantiate(this.tableItemPrefab);
            console.log(item)
            item.setParent(this.content); // ✅ 加到 content
            item.active = true;
        }

        console.log('content =', this.content?.name);
        console.log('layout on content =', this.content?.getComponent(Layout));
        console.log('layout in children =', this.content?.getComponentInChildren(Layout));

    }
}



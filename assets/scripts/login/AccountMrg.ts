import { _decorator, Component, Node } from 'cc';
import { Global } from '../common/Global';
const { ccclass, property } = _decorator;

@ccclass('AccountMrg')
export class AccountMrg extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }


    public onLoginClick(): void {
         Global.inst.net.send('chat', {
            text: 'hello server'
        });
    }
}



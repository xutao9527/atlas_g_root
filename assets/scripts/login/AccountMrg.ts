import { _decorator, Component, EditBox } from 'cc';
import { Global } from '../common/Global';
import { BasicAuthReq } from '../wire/payload/auth';
const { ccclass, property } = _decorator;

@ccclass('AccountMrg')
export class AccountMrg extends Component {
    
    @property(EditBox)
    account_edit: EditBox | null = null;

    @property(EditBox)
    pwd_edit: EditBox | null = null;




    public onLoginClick(): void {
    
        const account = this.account_edit?.string ?? '';
        const password = this.pwd_edit?.string ?? '';


        let basicAuthReq = new BasicAuthReq({
            account: account,
            password: password,
        });
        console.log("123312",basicAuthReq);
        let raw_msg = basicAuthReq.buildRawMessage();

        Global.inst.net.send(raw_msg);
    }
}



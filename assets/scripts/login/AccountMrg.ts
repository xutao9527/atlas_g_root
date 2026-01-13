import { _decorator, Component, EditBox } from 'cc';
import {BasicAuthReq} from "db://assets/scripts/wire/payload/BasicAuthReq";
import {Global} from "db://assets/scripts/common/Global";
import {AtlasWireMessage} from "db://assets/scripts/wire/base/message";
import {AuthResp} from "db://assets/scripts/wire/payload/AuthResp";
import {eventBus} from "db://assets/scripts/common/EventBus";
import {GetTableReq} from "db://assets/scripts/wire/payload/GetTableReq";


const { ccclass, property } = _decorator;

@ccclass('AccountMrg')
export class AccountMrg extends Component {
    
    @property(EditBox)
    account_edit: EditBox | null = null;

    @property(EditBox)
    pwd_edit: EditBox | null = null;

    private authHandler: ((msg: AtlasWireMessage<AuthResp>) => void) | null = null;

    onEnable(){
        this.authHandler = (msg: AtlasWireMessage<AuthResp>) => {
            console.log('[AccountMrg] 收到登录响应:', msg);
            if (msg.payload.ok) {
                console.log('[AccountMrg] 登录成功');
            } else {
                console.warn('[AccountMrg] 登录失败');
            }
        };
        eventBus.on<AuthResp>(BasicAuthReq.METHOD,this.authHandler);
    }

    onDisable() {
        // 组件销毁时取消订阅
        if (this.authHandler) {
            eventBus.off(BasicAuthReq.METHOD, this.authHandler);
            this.authHandler = null;
        }
    }

    public onLoginClick(): void {
        const account = this.account_edit?.string ?? '';
        const password = this.pwd_edit?.string ?? '';
        let basicAuthReq = new BasicAuthReq({
            account: account,
            password: password,
        });
        Global.inst.net.sendRequest(basicAuthReq);
    }

    public onRegisterClick(): void {
        let getTableReq = new GetTableReq({});
        Global.inst.net.sendRequest(getTableReq);
    }
}



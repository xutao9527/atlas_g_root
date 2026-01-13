import {_decorator, Component, EditBox, Node,Label, Color, tween} from 'cc';
import {BasicAuthReq} from "db://assets/scripts/wire/payload/BasicAuthReq";
import {Global} from "db://assets/scripts/common/Global";
import {AtlasWireMessage} from "db://assets/scripts/wire/base/message";
import {AuthResp} from "db://assets/scripts/wire/payload/AuthResp";
import {eventBus} from "db://assets/scripts/common/EventBus";
import {RegisterReq} from "db://assets/scripts/wire/payload/RegisterReq";
import {RegisterResp} from "db://assets/scripts/wire/payload/RegisterResp";


const {ccclass, property} = _decorator;

@ccclass('AccountMrg')
export class AccountMrg extends Component {

    @property(EditBox)
    account_edit: EditBox | null = null;

    @property(EditBox)
    pwd_edit: EditBox | null = null;

    @property(Node)
    reg_dialog: Node | null = null;

    @property(EditBox)
    reg_account: EditBox | null = null;

    @property(EditBox)
    reg_nickname: EditBox | null = null;

    @property(EditBox)
    reg_password: EditBox | null = null;

    @property(EditBox)
    confirm_password: EditBox | null = null;

    @property(Node)
    status_node: Node | null = null;   // 挂一个 Label 节点

    private authHandler: ((msg: AtlasWireMessage<AuthResp>) => void) | null = null;

    private regHandler: ((msg: AtlasWireMessage<RegisterResp>) => void) | null = null;

    onEnable() {
        this.authHandler = (msg: AtlasWireMessage<AuthResp>) => {
            console.log('[AccountMrg] 收到登录响应:', msg);
            if (msg.payload.ok) {
                this.showStatus('登录成功!');

            } else {
                this.showStatus(`登录失败：${msg.payload.error ?? '未知错误'}`);
            }
        };
        this.regHandler = (msg: AtlasWireMessage<RegisterResp>) => {
            console.log('[AccountMrg] 收到注册响应:', msg);
            if (msg.payload.ok) {
                this.showStatus(`注册成功!`);
            } else {
                this.showStatus(`注册失败：${msg.payload.message ?? '未知错误'}`);
            }
        };
        eventBus.on<AuthResp>(AuthResp.METHOD, this.authHandler);
        eventBus.on<RegisterResp>(RegisterResp.METHOD, this.regHandler);
    }

    onDisable() {
        // 组件销毁时取消订阅
        if (this.authHandler) {
            eventBus.off(AuthResp.METHOD, this.authHandler);
            this.authHandler = null;
        }
        if (this.regHandler) {
            eventBus.off(RegisterResp.METHOD, this.regHandler);
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
        this.reg_dialog.active = !this.reg_dialog.active;
    }

    public onRegisterRequestClick(): void {
        const account = this.reg_account?.string ?? '';
        const password = this.reg_password?.string ?? '';
        const confirm_password = this.confirm_password?.string ?? '';
        const nickname = this.reg_nickname?.string ?? '';

        // 1️⃣ 非空校验
        if (!account || !password || !confirm_password || !nickname) {
            this.showStatus('请填写完整注册信息');
            return;
        }

        // 2️⃣ 密码一致性校验
        if (password !== confirm_password) {
            this.showStatus('两次输入的密码不一致');
            return;
        }

        // 3️⃣ 发请求
        let registerReq = new RegisterReq({
            account: account, nickname: nickname, password: password
        });
        Global.inst.net.sendRequest(registerReq);
    }

    private showStatus(msg: string, duration = 0.5) {
        if (!this.status_node) return;
        this.unscheduleAllCallbacks();
        const node = this.status_node;
        node.active = true;
        const label = node.getComponentInChildren(Label);
        if (!label) return;
        // 重置透明度
        label.color = new Color(
            label.color.r,
            label.color.g,
            label.color.b,
            255
        );

        label.string = msg;

        // duration 秒后淡出
        this.scheduleOnce(() => {
            tween(label.color)
                .to(0.3, { a: 0 })
                .call(() => {
                    node.active = false;
                })
                .start();
        }, duration);
    }
}



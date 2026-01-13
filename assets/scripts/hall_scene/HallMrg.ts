import { _decorator, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('HallMrg')
export class HallMrg extends Component {

    onEnable(){

    }

    start() {
        console.log('start')

    }

    update(_deltaTime: number) {
        //console.log('deltaTime')
    }
}



import { Game } from './../game-engine';
import { DanmakuStgTitleScene } from './title-scene';

export class DanamkuStgGame extends Game {
    constructor() {
        super('弾幕STG', 300, 400, 60);
        const titleScene = new DanmakuStgTitleScene(this.screenCanvas);
        this.changeScene(titleScene);
    }
}
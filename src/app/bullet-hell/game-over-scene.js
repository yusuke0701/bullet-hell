import { Scene } from '../game-engine';
import { TextLabel } from './text-label';

export class DanmakuStgGameOverScene extends Scene {
    constructor(renderingTarget) {
        super('ゲームオーバー', 'black', renderingTarget);
        const text = new TextLabel(50, 200, 'ゲームオーバー…');
        this.add(text);
    }
}
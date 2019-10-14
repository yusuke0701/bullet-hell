import { Scene } from '../game-engine';
import { TextLabel } from './text-label';

export class DanmakuStgEndScene extends Scene {
    constructor(renderingTarget) {
        super('クリア', 'black', renderingTarget);
        const text = new TextLabel(60, 200, 'ゲームクリア！');
        this.add(text);
    }
}
import { Scene } from '../game-engine';
import { Fighter } from './fighter';

export class DanmakuStgMainScene extends Scene {
    constructor(renderingTarget) {
        super('メイン', 'black', renderingTarget);
        const fighter = new Fighter(150, 300);
        this.add(fighter);
    }
}
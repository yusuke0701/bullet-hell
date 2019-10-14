import { Scene } from '../game-engine';
import { DanmakuStgMainScene } from './main-scene';
import { TextLabel } from './text-label';

export class DanmakuStgTitleScene extends Scene {
  constructor(renderingTarget) {
    super('タイトル', 'black', renderingTarget);
    const title = new TextLabel(100, 200, '弾幕STG');
    this.add(title);
  }

  update(gameInfo, input) {
    super.update(gameInfo, input);
    if (input.getKeyDown(' ')) {
      const mainScene = new DanmakuStgMainScene(this.renderingTarget);
      this.changeScene(mainScene);
    }
  }
}

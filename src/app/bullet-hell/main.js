import { Game, assets } from './../game-engine';
import { DanmakuStgTitleScene } from './title-scene';

class DanamkuStgGame extends Game {
  constructor() {
    super('弾幕STG', 300, 400, 60);
    const titleScene = new DanmakuStgTitleScene(this.screenCanvas);
    this.changeScene(titleScene);
  }
}

export const gameStart = function() {
  // 画像はバンドルしてないので、distからの相対パスを入れる
  assets.addImage('sprite', './../assets/sprite.png');
  assets.loadAll().then(() => {
    const game = new DanamkuStgGame();
    document.body.appendChild(game.screenCanvas);
    game.start();
  });
};

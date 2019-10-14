import { Game, assets } from './../game-engine';
import { DanmakuStgTitleScene } from './title-scene';
import spriteImageData from './../../assets/sprite.png';

class DanamkuStgGame extends Game {
  constructor() {
    super('弾幕STG', 300, 400, 60);
    const titleScene = new DanmakuStgTitleScene(this.screenCanvas);
    this.changeScene(titleScene);
  }
}

export const gameStart = function() {
  assets.addImage('sprite', spriteImageData);
  assets.loadAll().then(() => {
    const game = new DanamkuStgGame();
    document.body.appendChild(game.screenCanvas);
    game.start();
  });
};

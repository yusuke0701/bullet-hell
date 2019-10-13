import { Sprite, SpriteActor, Rectangle, assets } from '../game-engine';
import { Bullet } from './bullet';

// ファイターは自機を表す
export class Fighter extends SpriteActor {
  constructor(x, y) {
    const sprite = new Sprite(
      assets.get('sprite'),
      new Rectangle(0, 0, 16, 16)
    );
    const hitArea = new Rectangle(8, 8, 2, 2);
    super(x, y, sprite, hitArea);

    this._interval = 5;
    this._timeCount = 0;
    this._speed = 3;
    this._velocityX = 0;
    this._velocityY = 0;

    // 敵の弾に当たったらdestroyする
    this.addEventListener('hit', e => {
      if (e.target.hasTag('enemyBullet')) {
        this.destroy();
      }
    });
  }

  update(gameInfo, input) {
    // キーを押されたら移動する
    this._velocityX = 0;
    this._velocityY = 0;

    if (input.getKey('ArrowUp')) {
      this._velocityY = -this._speed;
    }
    if (input.getKey('ArrowDown')) {
      this._velocityY = this._speed;
    }
    if (input.getKey('ArrowRight')) {
      this._velocityX = this._speed;
    }
    if (input.getKey('ArrowLeft')) {
      this._velocityX = -this._speed;
    }

    this.x += this._velocityX;
    this.y += this._velocityY;

    // 画面外に行ってしまったら押し戻す
    const boundWidth = gameInfo.screenRectangle.width - this.width;
    const boundHeight = gameInfo.screenRectangle.height - this.height;
    const bound = new Rectangle(this.width, this.height, boundWidth, boundHeight);

    if (this.isOutOfBounds(bound)) {
      this.x -= this._velocityX;
      this.y -= this._velocityY;
    }

    // スペースキーで弾を打つ
    this._timeCount++;
    const isFireReady = this._timeCount > this._interval;
    if (isFireReady && input.getKey(' ')) {
      const bullet = new Bullet(this.x, this.y);
      this.spawnActor(bullet);
      this._timeCount = 0;
    }
  }
}

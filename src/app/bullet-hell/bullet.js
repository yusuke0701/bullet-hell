import { SpriteActor, Sprite, Rectangle, assets } from './../game-engine/index';

export class Bullet extends SpriteActor {
  constructor(x, y) {
    const sprite = new Sprite(
      assets.get('sprite'),
      new Rectangle(0, 16, 16, 16)
    );
    const hitArea = new Rectangle(4, 0, 8, 16);
    super(x, y, sprite, hitArea, ['playerBullet']);

    this.speed = 6;
  }

  update(gameInfo, input) {
    this.y -= this.speed;
    if (this.isOutOfBounds(gameInfo.screenRectangle)) {
      this.destroy();
    }
  }
}

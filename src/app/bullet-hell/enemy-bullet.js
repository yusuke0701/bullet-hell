import { Sprite, SpriteActor, assets, Rectangle } from "../game-engine";

export class EnemyBullet extends SpriteActor {
    constructor(x, y, velocityX, velocityY) {
        const sprite = new Sprite(
            assets.get('sprite'),
            new Rectangle(16, 16, 16, 16)
        );
        const hitArea = new Rectangle(4, 4, 8, 8);
        super(x, y, sprite, hitArea, ['enemyBullet']);

        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    update(gameInfo, input) {
        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.isOutOfBounds(gameInfo.screenRectangle)) {
            this.destroy();
        }
    }
}
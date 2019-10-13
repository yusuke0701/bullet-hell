import { SpriteActor, Sprite, assets, Rectangle, GameEvent } from '../game-engine';

export class Enemy extends SpriteActor {
    constructor(x, y) {
        const sprite = new Sprite(
            assets.get('sprite'),
            new Rectangle(16, 0, 16, 16)
        );
        const hitArea = new Rectangle(0, 0, 16, 16);
        super(x, y, sprite, hitArea, ['enemy']);

        this.maxHp = 50;
        this.currentHp = this.maxHp;

        // プレイヤーの弾に当たったらHPを減らす
        this.addEventListener('hit', e => {
            if (e.target.hasTag('playerBullet')) {
                this.currentHp--;
                this.dispatchEvent('changehp', new GameEvent(this));
            }
        });
    }

    update(gameInfo, input) {
        // HPがゼロになったらdestroyする
        if (this.currentHp <= 0) {
            this.destroy();
        }
    }
}
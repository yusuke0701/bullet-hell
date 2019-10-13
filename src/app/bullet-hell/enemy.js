import { SpriteActor, Sprite, assets, Rectangle, GameEvent } from '../game-engine';
import { EnemyBullet } from './enemy-bullet';

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

        this._interval = 120;
        this._timeCount = 0;
        this._velocityX = 0.3;

        // プレイヤーの弾に当たったらHPを減らす
        this.addEventListener('hit', e => {
            if (e.target.hasTag('playerBullet')) {
                this.currentHp--;
                this.dispatchEvent('changehp', new GameEvent(this));
            }
        });
    }
    // degree度の方向にspeedの速さで弾を発射する
    shootBullet(degree, speed) {
        const rad = degree / 180 * Math.PI;
        const velocityX = Math.cos(rad) * speed;
        const velocityY = Math.sin(rad) * speed;

        const bullet = new EnemyBullet(this.x, this.y, velocityX, velocityY);
        this.spawnActor(bullet);
    }

    // num個の弾を円形に発射する
    shootCircularBullets(num, speed) {
        const degree = 360 / num;
        for (let i = 0; i < num; i++) {
            this.shootBullet(degree * i, speed);
        }
    }

    update(gameInfo, input) {
        // 左右に移動する
        this.x += this._velocityX;
        if (this.x <= 100 || this.x >= 200) {
            this._velocityX *= -1;
        }

        // インターバルを経過していたら弾を撃つ
        this._timeCount++;
        if (this._timeCount > this._interval) {
            this.shootCircularBullets(15, 1);
            this._timeCount = 0;
        }

        // HPがゼロになったらdestroyする
        if (this.currentHp <= 0) {
            this.destroy();
        }
    }
}
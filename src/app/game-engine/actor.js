import { EventDispatcher } from './event-dispatcher';

// アクタークラスは、ゲームのキャラクターを表す
export class Actor extends EventDispatcher {
    // x,y 座標
    // hitArea 当たり判定
    // tags タグ。当たり判定などで使う
    constructor(x, y, hitArea, tags = []) {
        super();
        this.hitArea = hitArea;
        this._hitAreaOffsetX = hitArea.x;
        this._hitAreaOffsetY = hitArea.y;
        this.tags = tags;

        this.x = x;
        this.y = y;
    }

    update(gameInfo, input) { }

    render(target) { }

    hasTag(tagName) {
        return this.tags.includes(tagName);
    }

    spawnActor(actor) {
        this.dispatchEvent('spawnactor', new GameEvent(actor));
    }

    destory() {
        this.dispatchEvent('destory', new GameEvent(this));
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
        this.hitArea.x = value + this._hitAreaOffsetX;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
        this.hitArea.y = value + this._hitAreaOffsetY;
    }
}
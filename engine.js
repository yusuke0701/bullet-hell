'use strict';

// 矩形クラスは、描画や当たり判定で使用する
class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    hitTest(other) {
        const horizontal = (other.x < this.x + this.width) &&
            (this.x < other.x + other.width);
        const vertical = (other.y < this.y + this.height) &&
            (this.y < other.y + other.height);
        return (horizontal && vertical);
    }
}

// スプライトクラスは、画像と短形クラスをもつ
class Sprite {
    constructor(image, rectangle) {
        this.image = image;
        this.rectangle = rectangle;
    }
}

// アセットローダークラスは、アセットを読み込む役割をもつ
class AssetLoader {
    constructor() {
        this._promises = [];
        this._assets = new Map();
    }

    addImage(name, url) {
        const img = new Image();
        img.src = url;

        const promise = new Promise((resolve, reject) =>
            img.addEventListener('load', (e) => {
                this._assets.set(name, img);
                resolve(img);
            }));

        this._promises.push(promise);
    }

    loadAll() {
        return Promise.all(this._promises).then((p) => this._assets);
    }

    get(name) {
        return this._assets.get(name);
    }
}

const assets = new AssetLoader();

// イベントディスパッチャークラスは、コールバック関数の登録とイベント実行時に関数を呼び出す
class EventDispatcher {
    constructor() {
        this._eventListeners = {};
    }

    addEventListener(type, callback) {
        if (this._eventListeners[type] == undefined) {
            this._eventListeners[type] = [];
        }
        this._eventListeners[type].push(callback);
    }

    dispatchEvent(type, event) {
        if (this._eventListeners[type] != undefined) {
            this._eventListeners[type].forEach(callback => callback(event));
        }
    }
}

// ゲームイベントクラスは、イベントディスパッチャーから発火させるイベント用のクラス
class GameEvent {
    constructor(target) {
        this.target = target;
    }
}

// アクタークラスは、ゲームのキャラクターを表す
class Actor extends EventDispatcher {
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
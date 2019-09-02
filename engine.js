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
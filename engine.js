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
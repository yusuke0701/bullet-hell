import { Actor, Rectangle } from './../game-engine';

export class Title extends Actor {
    constructor(x, y) {
        const hitArea = new Rectangle(0, 0, 0, 0);
        super(x, y, hitArea);
    }

    render(target) {
        const context = target.getContext('2d');
        context.font = '25px sans-serif';
        context.fillStyle = 'white';
        context.fillText('弾幕STG', this.x, this.y);
    }
}
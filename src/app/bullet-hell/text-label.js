import { Actor, Rectangle } from "../game-engine";

export class TextLabel extends Actor {
    constructor(x, y, text) {
        const hitArea = new Rectangle(0, 0, 0, 0);
        super(x, y, hitArea);

        this.text = text;
    }

    render(target) {
        const context = target.getContext('2d');
        context.font = '25px sans-serif';
        context.fillStyle = 'white';
        context.fillText(this.text, this.x, this.y);
    }
}
import { DanamkuStgGame } from './bullet-hell/game';

assets.addImage('sprite', 'sprite.png');
assets.loadAll().then((a) => {
    const game = new DanamkuStgGame();
    document.body.appendChild(game.screenCanvas);
    game.start();
});
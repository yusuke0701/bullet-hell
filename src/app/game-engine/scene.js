import { EventDispatcher } from './event-dispatcher';
import { GameEvent } from './game-event';

export class Scene extends EventDispatcher {
  constructor(name, backgroundColor, renderingTarget) {
    super();

    this.name = name;
    this.backgroundColor = backgroundColor;
    this.actors = [];
    this.renderingTarget = renderingTarget;

    this._destroyedActors = [];
  }

  add(actor) {
    this.actors.push(actor);
    actor.addEventListener('spawnactor', e => this.add(e.target));
    actor.addEventListener('destroy', e => this._addDestroyedActor(e.target));
  }

  remove(actor) {
    const index = this.actors.indexOf(actor);
    this.actors.splice(index, 1);
  }

  changeScene(newScene) {
    const event = new GameEvent(newScene);
    this.dispatchEvent('changescene', event);
  }

  update(gameInfo, input) {
    this._updateAll(gameInfo, input);
    this._hitTest();
    this._disposeDestroyedActors();
    this._clearScreen(gameInfo);
    this._renderAll();
  }

  _updateAll(gameInfo, input) {
    this.actors.forEach(actor => actor.update(gameInfo, input));
  }

  // 当たり判定の処理。総当たり方式だが、四分木を使って最適化する
  _hitTest() {
    const length = this.actors.length;
    for (let i = 0; i < length - 1; i++) {
      for (let j = i + 1; j < length; j++) {
        const obj1 = this.actors[i];
        const obj2 = this.actors[j];
        const hit = obj1.hitArea.hitTest(obj2.hitArea);
        if (hit) {
          obj1.dispatchEvent('hit', new GameEvent(obj2));
          obj2.dispatchEvent('hit', new GameEvent(obj1));
        }
      }
    }
  }

  _clearScreen(gameInfo) {
    const context = this.renderingTarget.getContext('2d');
    const width = gameInfo.screenRectangle.width;
    const height = gameInfo.screenRectangle.height;
    context.fillStyle = this.backgroundColor;
    context.fillRect(0, 0, width, height);
  }

  _renderAll() {
    this.actors.forEach(obj => obj.render(this.renderingTarget));
  }

  _addDestroyedActor(actor) {
    this._destroyedActors.push(actor);
  }

  _disposeDestroyedActors() {
    this._destroyedActors.forEach(actor => this.remove(actor));
    this._destroyedActors = [];
  }
}

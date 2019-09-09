// イベントディスパッチャークラスは、コールバック関数の登録とイベント実行時に関数を呼び出す
export class EventDispatcher {
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
    const listeners = this._eventListeners[type];
    if (listeners != undefined) listeners.forEach(callback => callback(event));
  }
}

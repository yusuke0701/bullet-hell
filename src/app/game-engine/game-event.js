// ゲームイベントクラスは、イベントディスパッチャーから発火させるイベント用のクラス
export class GameEvent {
  constructor(target) {
    this.target = target;
  }
}

import { Scene } from '../game-engine';
import { Fighter } from './fighter';
import { Enemy } from './enemy';
import { EnemyHpBar } from './enemy-hp-bar';
import { DanmakuStgEndScene } from './end-scene';
import { DanmakuStgGameOverScene } from './game-over-scene';

export class DanmakuStgMainScene extends Scene {
  constructor(renderingTarget) {
    super('メイン', 'black', renderingTarget);
    const fighter = new Fighter(150, 300);
    const enemy = new Enemy(150, 100);
    const hpBar = new EnemyHpBar(50, 20, enemy);
    this.add(fighter);
    this.add(enemy);
    this.add(hpBar);

    // 自機がやられたらゲームオーバー画面にする
    fighter.addEventListener('destroy', e => {
      const scene = new DanmakuStgGameOverScene(this.renderingTarget);
      this.changeScene(scene);
    });

    // 敵がやられたらクリア画面にする
    enemy.addEventListener('destroy', e => {
      const scene = new DanmakuStgEndScene(this.renderingTarget);
      this.changeScene(scene);
    });
  }
}

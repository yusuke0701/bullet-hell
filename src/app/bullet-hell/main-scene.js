import { Scene } from '../game-engine';
import { Fighter } from './fighter';
import { Enemy } from './enemy';
import { EnemyHpBar } from './enemy-hp-bar';

export class DanmakuStgMainScene extends Scene {
  constructor(renderingTarget) {
    super('メイン', 'black', renderingTarget);
    const fighter = new Fighter(150, 300);
    const enemy = new Enemy(150, 100);
    const hpBar = new EnemyHpBar(50, 20, enemy);
    this.add(fighter);
    this.add(enemy);
    this.add(hpBar);
  }
}

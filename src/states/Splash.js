import Phaser from 'phaser';
import { centerGameObjects } from '../utils';

export default class extends Phaser.State {
  init() {}

  preload() {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);
    this.load.image('MainTower', 'assets/images/main_tower.png');
    this.load.image('ArrowTower', 'assets/images/arrow_tower.png');
    this.load.image('Arrow', 'assets/images/arrow.png');
  }

  create() {
    this.state.start('Game');
  }
}

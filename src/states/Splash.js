import Phaser from 'phaser';
import { centerGameObjects } from '../utils';

export default class extends Phaser.State {
  init() {}

  preload() {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);
    this.load.image('Tower_Main', 'assets/images/towers/main.png');
    this.load.image('Tower_Arrow', 'assets/images/towers/arrow.png');
    this.load.image('Bullet_Arrow', 'assets/images/bullets/arrow.png');
    this.load.image('Monster_Basic', 'assets/images/monsters/basic.png');
  }

  create() {
    this.state.start('Game');
  }
}

/* globals __DEV__ */
import Phaser from 'phaser';
import MainTower from '../sprites/MainTower';
import ArrowTower from '../sprites/ArrowTower';

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    this.mainTower = new MainTower({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'MainTower'
    });
    this.arrowTower = new ArrowTower({
      game: this.game,
      x: this.world.centerX + 50,
      y: this.world.centerY + 50,
      asset: 'ArrowTower',
      mainTower: this.mainTower
    });

    this.game.add.existing(this.mainTower);
    this.game.add.existing(this.arrowTower);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.enable([this.mainTower, this.arrowTower]);
    this.game.physics.arcade.createDistanceConstraint(this.mainTower, this.arrowTower, 150);
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mainTower, 32, 32);
      this.game.debug.spriteInfo(this.arrowTower, 32, 32);
    }
  }
}

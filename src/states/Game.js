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

    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.enable([this.mainTower, this.arrowTower]);
    // this.mainTower.body.clearCollision(true, true);
    // this.arrowTower.body.clearCollision(true, true);

    this.mainTower.body.static = true;
    // this.mainTower.body.setCircle(100);
    // this.outerBound.body.setCircle(300);
    // this.outerBound.body.static = true;
    // this.innerBound.body.setCircle(200);
    // this.innerBound.body.static = true;
    // this.arrowTower.body.setCircle(30);

    // this.game.physics.p2.createDistanceConstraint(this.mainTower, this.arrowTower, 150);
    const constraint = this.game.physics.p2.createRevoluteConstraint(this.mainTower, [30, 70], this.arrowTower, [0, 0]);

  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mainTower, 32, 32);
      this.game.debug.spriteInfo(this.arrowTower, 32, 32);
    }
  }
}

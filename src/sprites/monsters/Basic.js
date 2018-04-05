import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({
    game,
    x,
    y,
    asset,
    beginAngle
  }) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
    this.game = game;
    this.beginAngle = beginAngle;
    this.speed = 10;
    this.maxHp = 20;
    this.nowHp = this.maxHp;
    this.checkWorldBounds = true;
    this.events.onOutOfBounds.add(this.outOfBounds, this);
  }

  outOfBounds() {
    this.kill();
  }

  update() {
    this.body.x += this.speed * Math.cos(this.beginAngle);
    this.body.y += this.speed * Math.sin(this.beginAngle);
    if (this.nowHp <= 0) {
      this.kill();
    }
  }

}
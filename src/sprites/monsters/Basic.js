import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({
    game,
    x,
    y,
    asset,
    beginRadian
  }) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
    this.game = game;
    this.beginRadian = beginRadian;
    this.speed = 1;
    this.maxHp = 1;
    this.nowHp = this.maxHp;
    this.checkWorldBounds = true;
    this.events.onOutOfBounds.add(this.outOfBounds, this);
    this.angle = (this.beginRadian * 180) / Math.PI;
  }

  outOfBounds() {
    this.kill();
  }

  underAttacked(bullet) {
    this.nowHp -= 1;
    if (this.nowHp <= 0) {
      this.kill();
    }
  }

  update() {
    this.body.x += this.speed * Math.cos(this.beginRadian);
    this.body.y += this.speed * Math.sin(this.beginRadian);
    if (this.nowHp <= 0) {
      this.kill();
    }
  }

}
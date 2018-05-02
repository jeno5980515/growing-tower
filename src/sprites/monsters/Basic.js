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
    this.speed = 10;
    this.maxHp = 1;
    this.nowHp = this.maxHp;
    this.checkWorldBounds = true;
    this.events.onOutOfBounds.add(this.outOfBounds, this);
    this.angle = (this.beginRadian * 180) / Math.PI;
    this.state = 'move';
    this.moveX = this.speed * Math.cos(this.beginRadian);
    this.moveY = this.speed * Math.sin(this.beginRadian);
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

  attack(tower) {
    this.state = 'attack';
  }

  move() {
    this.body.x += this.moveX;
    this.body.y += this.moveY;
  }

  update() {
    this[this.state]();
    if (this.nowHp <= 0) {
      this.kill();
    }
  }

}
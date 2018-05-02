import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({
    game,
    x,
    y,
    asset,
    towerAngle
  }) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
    this.game = game;
    this.towerAngle = towerAngle;
    this.speed = 10;
    this.maxHp = 1;
    this.nowHp = this.maxHp;
    this.checkWorldBounds = true;
    this.events.onOutOfBounds.add(this.outOfBounds, this);
    this.moveX = this.speed * Math.cos(this.towerAngle);
    this.moveY = this.speed * Math.sin(this.towerAngle);
  }

  outOfBounds() {
    this.kill();
  }

  attack(monster) {
    this.nowHp -= 1;
    if (this.nowHp <= 0) {
      this.kill();
    }
  }

  update() {
    this.body.x += this.moveX;
    this.body.y += this.moveY;
  }

}
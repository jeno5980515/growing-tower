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
  }

  update() {
    this.body.x += this.speed * Math.cos(this.towerAngle);
    this.body.y += this.speed * Math.sin(this.towerAngle);
  }

}
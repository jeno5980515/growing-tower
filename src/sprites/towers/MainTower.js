import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({
    game,
    x,
    y,
    asset
  }) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
    this.angleSpeed = 3;
  }

  update() {
    this.angle += this.angleSpeed;
  }
}

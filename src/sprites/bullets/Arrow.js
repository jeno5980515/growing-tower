import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({
    game,
    x,
    y,
    asset,
    angle
  }) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
    this.game = game;
    this.angle = angle;
  }

  update() {
    this.body.x += 1;
    this.body.y += 1;
  }

}
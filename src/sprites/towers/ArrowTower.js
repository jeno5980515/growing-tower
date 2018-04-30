import Phaser from 'phaser';
import Bullet from '../bullets/Arrow';

export default class extends Phaser.Sprite {
  constructor({
    game,
    x,
    y,
    asset,
    mainTower,
    bulletGroup
  }) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
    this.game = game;
    this.inputEnabled = true;
    this.mainTower = mainTower;
    this.events.onInputDown.add(this.mouseDown, this);
    this.events.onInputUp.add(this.mouseUp, this);
    this.cd = 200;
    this.timer = 0;
    // this.game.time.events.loop(this.cd, this.generateBulletIntoGame, this);
    this.bulletGroup = bulletGroup;
  }

  generateBulletIntoGame() {
    const bullet = new Bullet({
      game: this.game,
      x: this.x,
      y: this.y,
      asset: 'Bullet_Arrow',
      towerAngle: this.rotation
    });
    this.bulletGroup.add(bullet);
    this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
  }

  mouseDown() {
    this.isMouseDown = true;
  }

  mouseUp() {
    this.isMouseDown = false;
  }

  update() {
    if (this.isMouseDown) {
      const distance = 100;
      const radians = this.game.math.angleBetweenPoints(this.mainTower.position, this.game.input.mousePointer.position);
      this.x = (this.mainTower.position.x) + (distance * Math.cos(radians));
      this.y = (this.mainTower.position.y) + (distance * Math.sin(radians));
      this.angle = (radians * 180) / Math.PI;
    }
  }
}
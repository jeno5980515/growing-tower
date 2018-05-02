import Phaser from 'phaser';
import Bullet from '../bullets/Arrow';

const calculatedMap = {};
for (let i = -180; i <= 180; i += 1) {
  calculatedMap[i] = {};
}

export default class extends Phaser.Sprite {
  constructor({
    game,
    x,
    y,
    asset,
    mainTower,
    bulletGroup,
    beginAngle
  }) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
    this.game = game;
    this.inputEnabled = true;
    this.mainTower = mainTower;
    this.events.onInputDown.add(this.mouseDown, this);
    this.events.onInputUp.add(this.mouseUp, this);
    this.cd = 200;
    this.distance = 100;
    this.timer = 0;
    this.game.time.events.loop(this.cd, this.generateBulletIntoGame, this);
    this.bulletGroup = bulletGroup;
    this.beginAngle = beginAngle - this.mainTower.angle;
    this.precalculate();
  }

  precalculate() {
    if (calculatedMap[0][this.distance]) {
      return;
    }
    for (let i = -180; i <= 180; i += 1) {
      const r = (i * Math.PI) / 180;
      calculatedMap[i][this.distance] = {
        x: (this.mainTower.position.x) + (this.distance * Math.cos(r)),
        y: (this.mainTower.position.y) + (this.distance * Math.sin(r))
      };
    }
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
  }

  mouseUp() {
  }

  update() {
    this.angle = this.mainTower.angle + this.beginAngle;
    const { x, y } = calculatedMap[parseInt(this.angle, 10)][this.distance];
    this.x = x;
    this.y = y;
  }
}
import Phaser from 'phaser';
import Bullet from '../bullets/Arrow';

const calculatedMap = {};
for (let i = -180; i <= 180; i += 1) {
  calculatedMap[i] = {};
}

const fallingMap = {};
for (let i = -180; i <= 180; i += 1) {
  fallingMap[i] = {};
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
    this.cd = 200;
    this.distance = 100;
    this.timer = 0;
    this.heavy = 5;
    // this.game.time.events.loop(this.cd, this.generateBulletIntoGame, this);
    this.bulletGroup = bulletGroup;
    this.beginAngle = beginAngle;
    this.offsetAngle = beginAngle - this.mainTower.angle;
    this.precalculate();
    this.state = 'falling';
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
    if (fallingMap[0][this.heavy]) {
      return;
    }
    for (let i = -180; i <= 180; i += 1) {
      const r = (i * Math.PI) / 180;
      fallingMap[i][this.heavy] = {
        vx: -this.heavy * Math.cos(r),
        vy: -this.heavy * Math.sin(r)
      };
    }
  }

  generateBulletIntoGame() {
    const bullet = new Bullet({
      game: this.game,
      x: this.x,
      y: this.y,
      asset: 'Bullet_Arrow',
      towerRadian: this.rotation
    });
    this.bulletGroup.add(bullet);
    this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
  }

  falling() {
    this.angle = this.beginAngle;
    const { vx, vy } = fallingMap[parseInt(this.angle, 10)][this.heavy];
    this.x += vx;
    this.y += vy;
  }

  attack() {
    this.angle = this.mainTower.angle + this.offsetAngle;
    const { x, y } = calculatedMap[parseInt(this.angle, 10)][this.distance];
    this.x = x;
    this.y = y;
  }

  update() {
    this[this.state]();
  }
}
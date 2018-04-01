import Phaser from 'phaser';
import Bullet from '../bullets/Arrow';

export default class extends Phaser.Sprite {
  constructor({
    game,
    x,
    y,
    asset,
    mainTower
  }) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
    this.game = game;
    this.inputEnabled = true;
    this.mainTower = mainTower;
    this.events.onInputDown.add(this.mouseDown, this);
    this.events.onInputUp.add(this.mouseUp, this);
    this.cd = 20;
    this.timer = 0;
  }

  mouseDown() {
    this.isMouseDown = true;
    // this.body.dynamic = true;
  }

  mouseUp() {
    this.isMouseDown = false;
    this.body.static = true;
  }

  update() {
    this.timer += 1;
    if (this.timer === this.cd) {
      const bullet = new Bullet({
        game: this.game,
        x: this.world.centerX + 50,
        y: this.world.centerY + 50,
        asset: 'Arrow',
        angle: this.angle
      });
      this.game.add.existing(bullet);
      this.game.physics.p2.enable(bullet);
      bullet.body.static = true;
      this.timer = 0;
    }


    if (this.isMouseDown) {
      const distance = 100;
      const radians = this.game.math.angleBetweenPoints(this.mainTower.position, this.game.input.mousePointer.position);
      this.body.x = this.mainTower.position.x + (distance * Math.cos(radians));
      this.body.y = this.mainTower.position.y + (distance * Math.sin(radians));
      this.body.angle = (radians * 180) / Math.PI;
    } 
  }

}
import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor({
    game,
    x,
    y,
    asset,
    MainTower
  }) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
    this.game = game;
    this.inputEnabled = true;
    this.input.enableDrag();
    // const outerBound = new Phaser.Rectangle(circle1.x - (circle1.width / 2), circle1.y - (circle1.height / 2), circle1.width * 2, circle1.height * 2);
    // this.input.boundsRect = outerBound;

    this.events.onDragStart.add(this.startDrag, this);
    this.events.onDragStop.add(this.stopDrag, this);
  }

  startDrag() {
    this.body.moves = false;
    console.log(123);
  }

  stopDrag() {
    console.log(345);
    this.body.moves = true;
  }

  update() {
    this.angle += 3;
    this.newMouseX = this.game.input.mousePointer.position.x;
    this.newMouseY = this.game.input.mousePointer.position.y;
    if (this.game.input.mousePointer.isDown) {
      const dx = this.newMouseX - this.oldMouseX;
      const dy = this.newMouseY - this.oldMouseY;
      this.x += dx;
      this.y += dy;
      this.input.startDrag(this.game.input.mousePointer);
    }
    this.oldMouseX = this.newMouseX;
    this.oldMouseY = this.newMouseY;
  }
}

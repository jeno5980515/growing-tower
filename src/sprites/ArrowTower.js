import Phaser from 'phaser';

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
    // const outerBound = new Phaser.Rectangle(circle1.x - (circle1.width / 2), circle1.y - (circle1.height / 2), circle1.width * 2, circle1.height * 2);
    // this.input.boundsRect = outerBound;
    // this.game.physics.p2.createDistanceConstraint(mainTower, this, 150);
    this.events.onInputDown.add(this.mouseDown, this);
    this.events.onInputUp.add(this.mouseUp, this);
    // this.events.onAddedToGroup.add(this.addedToGroup, this);

    this.mouseConstraint = null;
    // console.log(this.exists);
    // if ( this.exists ){
    //   this.game.physics.p2.createDistanceConstraint(mainTower, this, 150);
    // }
  }

  // addedToGroup() {
  //   this.game.physics.p2.createDistanceConstraint(this.mainTower, this, 150);
  // }

  mouseDown() {
    this.isMouseDown = true;
    // this.body.dynamic = true;
  }

  mouseUp() {
    this.isMouseDown = false;
    // this.game.physics.p2.removeConstraint(this.mouseConstraint);
    // this.body.dynamic = false;
  }

  update() {
    this.newMouseX = this.game.input.mousePointer.position.x;
    this.newMouseY = this.game.input.mousePointer.position.y;
    this.angle += 3;
    if (this.isMouseDown) {
      // this.body.static = false;
      // const dx = this.newMouseX - this.oldMouseX;
      // const dy = this.newMouseY - this.oldMouseY;
      // this.body.x += dx;
      // this.body.y += dy;
      this.body.x = this.newMouseX;
      this.body.y = this.newMouseY;
    } else {
      // this.body.static = true;
      // this.body.x = 100;
      // this.body.y = 100;
      this.body.setZeroForce();
      this.body.setZeroRotation();
      this.body.setZeroVelocity();
    }
    this.oldMouseX = this.newMouseX;
    this.oldMouseY = this.newMouseY;
  //   this.newMouseX = this.game.input.mousePointer.position.x;
  //   this.newMouseY = this.game.input.mousePointer.position.y;
  //   if (this.game.input.mousePointer.isDown) {
  //     const dx = this.newMouseX - this.oldMouseX;
  //     const dy = this.newMouseY - this.oldMouseY;
  //     this.x += dx;
  //     this.y += dy;
  //     this.input.startDrag(this.game.input.mousePointer);
  //   }
  //   this.oldMouseX = this.newMouseX;
  //   this.oldMouseY = this.newMouseY;
  // }
  }

}
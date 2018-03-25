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
      const distance = 100;
      const dx = this.newMouseX - this.mainTower.position.x;
      const dy = this.newMouseY - this.mainTower.position.y;
      const angle = this.game.math.angleBetweenPoints(this.mainTower.position, this.game.input.mousePointer.position);

      // this.body.x += dx;
      // this.body.y += dy;

    // this.mainTower.body.static = true;
      // const distance = this.game.math.distance(this.position.x, this.position.y, this.mainTower.position.x, this.mainTower.position.y);
      // if ( distance > 100 || distance < 50 ) {
      //   this.body.setZeroForce();
      //   this.body.setZeroRotation();
      //   this.body.setZeroVelocity();
      // } else {
      
      this.body.x = this.mainTower.position.x + distance * Math.cos(angle);
      this.body.y = this.mainTower.position.y + distance * Math.sin(angle);
      // }
    } else {
      // this.body.static = true;
      // this.body.x = 100;
      // this.body.y = 100;
      this.mainTower.body.setZeroForce();
      this.mainTower.body.setZeroRotation();
      this.mainTower.body.setZeroVelocity();
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
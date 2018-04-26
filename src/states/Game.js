/* globals __DEV__ */
import Phaser from 'phaser';
import createMonster from '../helpers/createMonster';
import { generateMonsterStartPoint } from '../helpers/random';
import MainTower from '../sprites/towers/MainTower';
import ArrowTower from '../sprites/towers/ArrowTower';

export default class extends Phaser.State {
  init() {
    this.monsterCd = 200;
    this.monsterTimer = 0;
  }
  preload() { }

  create() {
    this.mainTower = new MainTower({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'Tower_Main'
    });

    this.arrowTower = new ArrowTower({
      game: this.game,
      x: this.world.centerX + 100,
      y: this.world.centerY,
      asset: 'Tower_Arrow',
      mainTower: this.mainTower
    });

    this.game.add.existing(this.mainTower);
    this.game.add.existing(this.arrowTower);

    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.enable([this.mainTower, this.arrowTower]);
    // this.mainTower.body.clearCollision(true, true);
    // this.arrowTower.body.clearCollision(true, true);

    this.mainTower.body.static = true;
    this.arrowTower.body.static = true;
    this.game.time.events.loop(this.monsterCd, this.generateMonsterIntoGame, this);
    // this.mainTower.body.setCircle(100);
    // this.outerBound.body.setCircle(300);
    // this.outerBound.body.static = true;
    // this.innerBound.body.setCircle(200);
    // this.innerBound.body.static = true;
    // this.arrowTower.body.setCircle(30);

    // this.game.physics.p2.createDistanceConstraint(this.mainTower, this.arrowTower, 150);
    // const constraint = this.game.physics.p2.createRevoluteConstraint(this.mainTower, [30, 70], this.arrowTower, [0, 0]);

  }

  generateMonsterIntoGame() {
    const point = generateMonsterStartPoint();
    const monster = createMonster(Object.assign(point, {
      game: this.game,
      type: 'Basic'
    }));
    this.game.add.existing(monster);
    this.game.physics.p2.enable(monster);
    monster.body.static = true;
  }

  render() {
    if (__DEV__) {
      this.game.debug.text(this.world.total, 32, 32);
      // this.game.debug.spriteInfo(this.mainTower, 32, 32);
    }
  }
}

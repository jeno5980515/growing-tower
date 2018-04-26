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
    // this.game.physics.startSystem(Phaser.Physics.P2JS);
    // this.game.physics.p2.setImpactEvents(true);
    // this.monsterCollisionGroup = this.game.physics.p2.createCollisionGroup();
    // this.bulletCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.bulletGroup = this.game.add.group();
    this.monsterGroup = this.game.add.group();
    this.towerGroup = this.game.add.group();
    this.bulletGroup.enableBody = true;
    this.bulletGroup.physicsBodyType = Phaser.Physics.ARCADE;
    this.monsterGroup.enableBody = true;
    this.monsterGroup.physicsBodyType = Phaser.Physics.ARCADE;
    this.towerGroup.enableBody = true;
    this.towerGroup.physicsBodyType = Phaser.Physics.ARCADE;

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
      mainTower: this.mainTower,
      bulletGroup: this.bulletGroup
    });

    this.towerGroup.add(this.mainTower);
    this.towerGroup.add(this.arrowTower);

    // this.game.add.existing(this.mainTower);
    // this.game.add.existing(this.arrowTower);

    // this.mainTower.body.static = true;
    // this.arrowTower.body.static = true;
    this.game.time.events.loop(this.monsterCd, this.generateMonsterIntoGame, this);
  }

  generateMonsterIntoGame() {
    const point = generateMonsterStartPoint();
    const monster = createMonster(Object.assign(point, {
      game: this.game,
      type: 'Basic'
    }));
    this.monsterGroup.add(monster);
    // this.game.add.existing(monster);
    this.game.physics.enable(monster, Phaser.Physics.ARCADE);
    // monster.body.setCollisionGroup(this.monsterCollisionGroup);
    // monster.body.collides(this.bulletCollisionGroup, monster.underAttacked, this);
    // monster.body.collides(this.bulletCollisionGroup, () => console.log('aaa'), this);
    // monster.body.static = true;
  }

  attackHandler(bullet, monster) {
    bullet.attack(monster);
    monster.underAttacked(bullet);
  }

  render() {
    if (__DEV__) {
      this.game.debug.text(`Tower: ${this.towerGroup.total}`, 32, 32);
      this.game.debug.text(`Monster: ${this.monsterGroup.total}`, 32, 64);
      this.game.debug.text(`Bullet: ${this.bulletGroup.total}`, 32, 96);
      // this.game.debug.text(this.world.total, 32, 32);
      // this.game.debug.spriteInfo(this.mainTower, 32, 32);
    }
    this.game.physics.arcade.overlap(this.bulletGroup, this.monsterGroup, this.attackHandler, null, this);
  }
}

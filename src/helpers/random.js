import Phaser from 'phaser';

const random = new Phaser.RandomDataGenerator();

const generateMonsterStartPoint = ({ mainTower, world, seed }) => {
  const x = random.integerInRange(0, world.width);
  const y = random.integerInRange(0, world.height);
  const top = { x, y: 0 };
  const left = { x: 0, y };
  const right = { x: world.width, y };
  const bottom = { x, y: world.height };
  const picked = random.pick([top, left, bottom, right]);
  const beginRadian = Phaser.Math.angleBetweenPoints(picked, mainTower.position);
  return Object.assign(picked, { beginRadian });
}

export {
  generateMonsterStartPoint
};

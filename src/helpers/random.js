import Phaser from 'phaser';

const random = new Phaser.RandomDataGenerator();

const generateMonsterStartPoint = (mainTower, seed) => {
  const x = random.integerInRange(0, 500);
  const y = random.integerInRange(0, 500);
  const beginRadian = Phaser.Math.angleBetweenPoints({ x, y }, mainTower.position);
  return {
    x,
    y,
    beginRadian
  };
}

export {
  generateMonsterStartPoint
};

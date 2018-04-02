import Basic from '../sprites/monsters/Basic';

const createMonster = (info) => {
  return new Basic(Object.assign(info, {
    asset: 'Monster_Basic'
  }));
};

export default createMonster;

import MainConnect from '../index.js';

export const getGoodsList = () => {
  return MainConnect.get('/goods');
};

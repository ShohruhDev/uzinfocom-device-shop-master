import MainConnect from '../index.ts';

export const getGoodsList = (page: number, model: string = '', category: string = '') => {
  return MainConnect.get(`/goods?_page=${page}&model=${model}&category=${category}`);
};
export const updateGood = (id, payload) => {
  return MainConnect.put(`/goods/${id}`, payload);
};

export const createGood = payload => {
  return MainConnect.post('/goods', payload);
};

export const deleteGood = id => {
  return MainConnect.delete(`/goods/${id}`);
};

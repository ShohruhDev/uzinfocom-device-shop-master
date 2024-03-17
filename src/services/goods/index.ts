import MainConnect from '~/services/index';
import { GoodEntity } from '~/types/types';

export const getGoodsList = (page: number, model: string = '', category: string = '') => {
  return MainConnect.get(`/goods?_page=${page}&model=${model}&category=${category}`);
};
export const updateGood = (id: string | number, payload: GoodEntity) => {
  return MainConnect.put(`/goods/${id}`, payload);
};

export const createGood = (payload: GoodEntity) => {
  return MainConnect.post('/goods', payload);
};

export const deleteGood = (id: string | number) => {
  return MainConnect.delete(`/goods/${id}`);
};

import * as axios from 'axios';

import {config} from '../config/config';

const api = axios.default;

export const getCategories = async () => {
  try {
    const categories = await api.get(config.CATEGORIES);

    return categories.data;
  } catch (error) {
    console.log(error);
  }

};

export const getRandom = async () => {
  try {
    const response = await api.get(config.RANDOM);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRandomJokesFromCategory = async (category: any) => {
  try {
    const response = await api.get(`${config.JOKES_FROM_CATEGORIES}${category}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

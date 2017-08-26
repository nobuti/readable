import axios from 'axios';
import { URL, APIKEY } from '../config';

export const FETCH_CATEGORIES = 'fetchCategories';

export function fetchCategories () {
  const url = `${URL}/categories`;
  const config = {
    headers: {'Authorization': APIKEY}
  }

  const request = axios.get(url, config);

  return {
    type: FETCH_CATEGORIES,
    data: request
  }
}
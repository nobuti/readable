import axios from 'axios';

import {URL, APIKEY} from '../config';
import * as ActionTypes from './types';

export function fetchCategories () {
  const url = `${URL}/categories`;
  const config = {
    headers: {'Authorization': APIKEY}
  }

  const request = axios.get(url, config);

  return {
    type: ActionTypes.FETCH_CATEGORIES,
    payload: request
  }
}

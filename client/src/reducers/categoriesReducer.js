import { FETCH_CATEGORIES } from '../actions';

const initialState = {
  fetched: false
}

export default function (state = initialState, action) {
  switch (action.type) {
  case FETCH_CATEGORIES:
    return {
      ...state,
      fetched: true,
      data: action.payload.data.categories
    }
  default:
    return state;
  }
}

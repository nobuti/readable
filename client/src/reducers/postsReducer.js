import { FETCH_POSTS, SORT_POSTS, SORT_POSTS_BY, UP_VOTE_POST, DOWN_VOTE_POST, DELETE_POST, DELETE_COMMENT } from '../actions';

const initialState = {
  fetched: false,
  sort:SORT_POSTS_BY.VOTES
}

export default function (state = initialState, action) {
  let data;

  switch (action.type) {
  case FETCH_POSTS:
    return {
      ...state,
      fetched: true,
      data: action.payload
    }

  case SORT_POSTS:
    return {
      ...state,
      sort: action.payload
    }

  case UP_VOTE_POST:
    data = {
      ...state.data
    }
    data[action.payload].voteScore += 1;

    return {
      ...state,
      data
    }

  case DOWN_VOTE_POST:
    data = {
      ...state.data
    }
    data[action.payload].voteScore -= 1;

    return {
      ...state,
      data
    }

  case DELETE_POST:
    data = {
      ...state.data
    }
    delete data[action.payload];

    return {
      ...state,
      data
    }

  case DELETE_COMMENT:
    data = {
      ...state.data
    }
    data[action.meta.post].comments -= 1;

    return {
      ...state,
      data
    }

  default:
    return state;
  }
}

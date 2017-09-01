import { FETCH_COMMENTS, SORT_POSTS_BY, SORT_COMMENTS, UP_VOTE_COMMENT, DOWN_VOTE_COMMENT, DELETE_COMMENT } from '../actions';

const initialState = {
  fetched: false,
  sort:SORT_POSTS_BY.VOTES
}

export default function (state = initialState, action) {
  let data;

  switch (action.type) {
  case FETCH_COMMENTS:
    return {
      ...state,
      fetched: true,
      data: action.payload
    }

  case SORT_COMMENTS:
    return {
      ...state,
      sort: action.payload
    }

  case UP_VOTE_COMMENT:
    data = {
      ...state.data
    }

    data[action.meta.post][action.payload].voteScore += 1;

    return {
      ...state,
      data
    }

  case DOWN_VOTE_COMMENT:
    data = {
      ...state.data
    }

    data[action.meta.post][action.payload].voteScore -= 1;

    return {
      ...state,
      data
    }

  case DELETE_COMMENT:
    data = {
      ...state.data
    }

    delete data[action.meta.post][action.payload];

    return {
      ...state,
      data
    }

  default:
    return state;
  }
}

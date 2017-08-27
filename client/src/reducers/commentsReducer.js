import { FETCH_COMMENTS, SORTBY, SORT_COMMENTS, UP_VOTE_COMMENT, DOWN_VOTE_COMMENT } from '../actions';

const initialState = {
  sort:SORTBY.VOTES,
  data: {}
}

export default function (state = initialState, action) {
  let data;

  switch (action.type) {
  case FETCH_COMMENTS:
    return {
      ...state,
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

  default:
    return state;
  }
}

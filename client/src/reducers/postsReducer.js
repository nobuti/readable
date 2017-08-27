import { FETCH_POSTS, SORT_POSTS, SORTBY, UP_VOTE_POST, DOWN_VOTE_POST } from '../actions';

const initialState = {
  fetched: false,
  sort:SORTBY.VOTES
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

  default:
    return state;
  }
}

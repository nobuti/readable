import axios from 'axios';

import { URL, APIKEY } from '../config';

export const FETCH_CATEGORIES = 'fetchCategories';
export const FETCH_POSTS = 'fetchPosts';
export const SORT_POSTS = 'sortPosts';
export const UP_VOTE_POST = 'upVotePost';
export const DOWN_VOTE_POST = 'downVotePost';
export const FETCH_COMMENTS = 'fetchComments';
export const SORT_COMMENTS = 'sortComments';
export const UP_VOTE_COMMENT = 'upVoteComment';
export const DOWN_VOTE_COMMENT = 'downVoteComment';

export const SORTBY = {
  VOTES: 'voteScore',
  COMMENTS: 'comments',
  DATE: 'timestamp'
}

export const VOTE = {
  UP: 'upVote',
  DOWN: 'downVote'
}

export function fetchCategories () {
  const url = `${URL}/categories`;
  const config = {
    headers: {'Authorization': APIKEY}
  }

  const request = axios.get(url, config);

  return {
    type: FETCH_CATEGORIES,
    payload: request
  }
}

export function fetchPosts () {
  const postUrl = `${URL}/posts`;
  const config = {
    headers: {'Authorization': APIKEY}
  }

  let postsWithComments;

  const request = axios.get(postUrl, config)
    .then((posts) => {
      // Working with an indexed object instead array for posts
      postsWithComments = posts.data.reduce((result, value) => {
        result[value.id] = value;
        return result;
      }, {});

      // for every post we need to get the number of comments in order to be
      // able to sort by popular (number of comments)
      return Promise.all(posts.data.map(post => {
        const postCommentsUrl = `${URL}/posts/${post.id}/comments`;
        return axios.get(postCommentsUrl, config)
          .then(comments => {
            return {
              id: post.id,
              comments: comments.data.length
            }
          });
      }))
        .then(values => {
          return values.reduce((result, value) => {
            result[value.id].comments = value.comments;
            return result;
          }, postsWithComments);
        })
      }
    );

  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export function fetchComments (postID) {
  const url = `${URL}/posts/${postID}/comments`;
  const config = {
    headers: {'Authorization': APIKEY}
  }

  const request = axios.get(url, config)
    .then(comments => {
      let result = {};
      result[postID] = comments.data.reduce((result, comment) => {
        result[comment.id] = comment;
        return result;
      }, {});
      return result;
    })

  return {
    type: FETCH_COMMENTS,
    payload: request
  }
}

export function sortPosts (byKey) {
  return {
    type: SORT_POSTS,
    payload: byKey
  }
}

export function votePost (postID, option) {
  const url = `${URL}/posts/${postID}`;
  const config = {
    headers: {'Authorization': APIKEY}
  }

  const data = {
    option
  }

  axios.post(url, data, config);

  return {
    type: option === VOTE.UP ? UP_VOTE_POST : DOWN_VOTE_POST,
    payload: postID
  }
}

export function voteComment (postID, commentID, option) {
  const url = `${URL}/comments/${commentID}`;
  const config = {
    headers: {'Authorization': APIKEY}
  }

  const data = {
    option
  }

  axios.post(url, data, config);

  return {
    type: option === VOTE.UP ? UP_VOTE_COMMENT : DOWN_VOTE_COMMENT,
    payload: commentID,
    meta: {
      post: postID
    }
  }
}

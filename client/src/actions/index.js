import axios from 'axios';

import {URL, APIKEY} from '../config';
import * as ActionTypes from './types';

const uuidv4 = () => {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

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
    type: ActionTypes.FETCH_POSTS,
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
    type: ActionTypes.FETCH_COMMENTS,
    payload: request
  }
}

export function sortPosts (byKey) {
  return {
    type: ActionTypes.SORT_POSTS,
    payload: byKey
  }
}

export function sortComments (byKey) {
  return {
    type: ActionTypes.SORT_COMMENTS,
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
    type: option === ActionTypes.VOTE.UP ? ActionTypes.UP_VOTE_POST : ActionTypes.DOWN_VOTE_POST,
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
    type: option === ActionTypes.VOTE.UP ? ActionTypes.UP_VOTE_COMMENT : ActionTypes.DOWN_VOTE_COMMENT,
    payload: commentID,
    meta: {
      post: postID
    }
  }
}

export function deletePost (postID, callback) {
  const url = `${URL}/posts/${postID}`;
  const config = {
    headers: {'Authorization': APIKEY}
  }

  axios.delete(url, config)
  .then(() => callback && callback());

  return {
    type: ActionTypes.DELETE_POST,
    payload: postID
  }
}

export function savePost (values, callback) {
  const url = `${URL}/posts`;
  const config = {
    headers: {'Authorization': APIKEY}
  }
  const metadata = {
    id: uuidv4(),
    timestamp: Date.now()
  }
  const data = {
    ...values,
    ...metadata
  }

  axios.post(url, data, config)
    .then(() => callback());

  return {
    type: ActionTypes.NEW_POST,
    payload: data
  }
}

export function updatePost (postID, values, callback) {
  const url = `${URL}/posts/${postID}`;
  const config = {
    headers: {'Authorization': APIKEY}
  }
  const metadata = {
    id: postID
  }
  const data = {
    ...values,
    ...metadata
  }

  axios.put(url, values, config)
    .then(() => callback());

  return {
    type: ActionTypes.UPDATE_POST,
    payload: data
  }
}

export function deleteComment (postID, commentID) {
  const url = `${URL}/comments/${commentID}`;
  const config = {
    headers: {'Authorization': APIKEY}
  }

  axios.delete(url, config);

  return {
    type: ActionTypes.DELETE_COMMENT,
    payload: commentID,
    meta: {
      post: postID
    }
  }
}

export function saveComment (postID, values, callback) {
  const url = `${URL}/comments`;
  const config = {
    headers: {'Authorization': APIKEY}
  }
  const metadata = {
    id: uuidv4(),
    timestamp: Date.now(),
    parentId: postID,
    voteScore: 1
  }
  const data = {
    ...values,
    ...metadata
  }

  axios.post(url, data, config)
    .then(() => callback());

  return {
    type: ActionTypes.NEW_COMMENT,
    payload: data
 }
}

export function updateComment (commentID, values, callback) {
  const url = `${URL}/comments/${commentID}`;
  const config = {
    headers: {'Authorization': APIKEY}
  }
  const metadata = {
    timestamp: Date.now()
  }
  const data = {
    ...values,
    ...metadata
  }

  axios.put(url, data, config)
    .then(() => callback());

  return {
    type: ActionTypes.UPDATE_COMMENT,
    payload: data
  }
}
import React from 'react';
import { connect } from 'react-redux';
import { votePost, UP_VOTE_POST, DOWN_VOTE_POST } from '../actions';

const PostListItem = (props) => {
  const { id, author, title, comments, voteScore, votePost } = props;

  return (
    <li>
      <h2>{title}</h2>
      <div>Submitted by {author}</div>
      <div>{comments} comments</div>
      <div>
        <button onClick={(e) => {
          votePost(id, UP_VOTE_POST);
        }}>+1</button>
        {voteScore} votes
        <button onClick={(e) => {
          votePost(id, DOWN_VOTE_POST);
        }}>-1</button>
        </div>
    </li>
  );
}

export default connect(null, { votePost })(PostListItem);
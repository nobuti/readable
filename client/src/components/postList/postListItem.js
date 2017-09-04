import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { votePost, VOTE } from '../../actions';
import format from 'date-fns/format';

const PostListItem = (props) => {
  const { id, author, title, timestamp, comments, voteScore, votePost } = props;

  return (
    <li>
      <h2>
        <Link to={`/post/${id}`}>
          {title}
        </Link>
      </h2>
      <div>Submitted by {author}, {format(timestamp, 'D MMM YYYY')}</div>
      <div>{comments} comments</div>
      <div>
        <button onClick={(e) => {
          votePost(id, VOTE.UP);
        }}>+1</button>
        {voteScore} votes
        <button onClick={(e) => {
          votePost(id, VOTE.DOWN);
        }}>-1</button>
      </div>
    </li>
  );
}

export default connect(null, { votePost })(PostListItem);
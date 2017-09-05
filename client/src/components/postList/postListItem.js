import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { votePost, VOTE } from '../../actions';
import format from 'date-fns/format';
import Score from '../score';

import './postItem.css';

const PostListItem = (props) => {
  const { id, author, title, timestamp, comments, voteScore, votePost } = props;

  const voteUp = (e) => {
    votePost(id, VOTE.UP);
  }

  const voteDown = (e) => {
    votePost(id, VOTE.DOWN);
  }

  return (
    <li className='PostItem'>
      <h2 className='PostItem-title'>
        <Link to={`/post/${id}`}>
          {title}
        </Link>
      </h2>

      <div className='PostItem-meta'>
        <div>
          Submitted by <span className='PostItem-author'>{author}</span>, {format(timestamp, 'D MMM YYYY')}
        </div>

        <div>{comments} comments</div>
      </div>

      <Score score={voteScore} voteUp={voteUp} voteDown={voteDown} />
    </li>
  );
}

export default connect(null, { votePost })(PostListItem);
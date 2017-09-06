import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

import { voteComment, deleteComment, VOTE } from '../../actions';
import Score from '../score';

class Comment extends Component {
  delete = () => {
    const { id, post, deleteComment } = this.props;
    deleteComment(post, id)
  }

  vote = (option) => {
    const { id, post, voteComment } = this.props;
    voteComment(post, id, option);
  }

  voteUp = () => {
    this.vote(VOTE.UP);
  }

  voteDown = () => {
    this.vote(VOTE.DOWN);
  }

  render () {
    const { id, author, title, body, timestamp, voteScore, post } = this.props;

    return (
      <li>
        <h2>{title}</h2>
        <p>{body}</p>
        <small>Submitted by {author}, {format(timestamp, 'D MMM YYYY, HH:ss')}</small>

        <button onClick={this.delete}>
          Delete
        </button>

        <Link to={`/post/${post}/comment/${id}/edit`}>
          Edit
        </Link>

        <Score score={voteScore} voteUp={this.voteUp} voteDown={this.voteDown} />
      </li>
    );
  }
}

export default connect(null, { voteComment, deleteComment })(Comment);
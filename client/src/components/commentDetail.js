import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

import { voteComment, deleteComment, VOTE } from '../actions';
import Votes from './voteControl';

class Comment extends Component {
  deleteComment = () => {
    const { id, post } = this.props;
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
    const { id, author, title, body, timestamp, voteScore } = this.props;

    return (
      <li>
        <h2>{title}</h2>
        <p>{body}</p>
        <small>Submitted by {author}, {format(timestamp, 'D MMM YYYY, HH:ss')}</small>

        <button onClick={this.deleteComment}>
          Delete
        </button>

        <Link to={`/comments/${id}/edit`}>
          Edit
        </Link>

        <Votes score={voteScore} voteUp={this.voteUp} voteDown={this.voteDown} />
      </li>
    );
  }
}

export default connect(null, { voteComment, deleteComment })(Comment);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';

import Logo from './logo';
import { fetchPosts, fetchComments, votePost, voteComment, VOTE } from '../actions';

class PostDetail extends Component {
  componentDidMount () {
    const { fetchPosts, fetchComments, comments } = this.props;
    const postID = this.getPostID();
    const fetched = this.arePostsFetched();

    if (!fetched) {
      fetchPosts();
    }

    if (!comments.data[postID]) {
      fetchComments(postID);
    }
  }

  arePostsFetched () {
    const { posts } = this.props;
    return posts && posts.fetched;
  }

  getPostID () {
    const { match } = this.props;
    return match.params.post;
  }

  renderPost (post) {
    const { votePost } = this.props;
    const { id, author, title, body, timestamp, voteScore } = post;

    return (
      <div>
        <h2>{ title }</h2>
        <h6>Submitted by {author}, {format(timestamp, 'D MMM YYYY')}</h6>
        <p>{ body }</p>

        <div>
          <button onClick={(e) => {
            votePost(id, VOTE.UP);
          }}>+1</button>
          {voteScore} votes
          <button onClick={(e) => {
            votePost(id, VOTE.DOWN);
          }}>-1</button>
        </div>
      </div>
    );
  }

  sortComments () {
    const { comments } = this.props;
    const sortKey = comments.sort;
    const postID = this.getPostID();
    const postComments = comments.data[postID];

    if (Object.keys(postComments).length === 0) {
      return [];
    }

    return Object.values(postComments).sort((a, b) => {
      return b[sortKey] - a[sortKey]
    });
  }

  renderComments () {
    const postComments = this.sortComments();
    const postID = this.getPostID();
    const { voteComment } = this.props;

    if (postComments.length > 0) {
      return (
        <ul>
        {
          postComments.map((comment) => {
            const { id, author, title, body, timestamp, voteScore } = comment;
            return (
              <li key={id}>
                <h2>{title}</h2>
                <p>{body}</p>
                <small>Submitted by {author}, {format(timestamp, 'D MMM YYYY, HH:ss')}</small>

                <div>
                  <button onClick={(e) => {
                    voteComment(postID, id, VOTE.UP);
                  }}>+1</button>
                  {voteScore} votes
                  <button onClick={(e) => {
                    voteComment(postID, id, VOTE.DOWN);
                  }}>-1</button>
                </div>
              </li>
            );
          })
        }
        </ul>
      );
    } else {
      return (
        <div>No comments yet. Be the first!</div>
      );
    }
  }

  render () {
    const { posts } = this.props;
    const fetched = this.arePostsFetched();
    const postID = this.getPostID();

    if (!fetched) {
      return (
        <div>Loading...</div>
      );
    } else {

      const post = posts.data[postID];

      if (!post) {
        return (
          <div>Ooops, it seems we lost that post along the way.</div>
        );
      }

      return (
        <div>
          <Logo />
          <Link to='/'>
            Back
          </Link>
          <Link to='/post/new'>
            Submit
          </Link>
          { this.renderPost(post) }
          { this.renderComments() }
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comments,
    posts: state.posts
  }
}

export default connect(mapStateToProps, { fetchComments, fetchPosts, votePost, voteComment })(PostDetail);
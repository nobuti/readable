import React, { Component } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';

import Logo from './logo';
import {
  fetchPosts,
  fetchComments,
  votePost,
  VOTE,
  deletePost
} from '../actions';
import SortCommentsOptions from './sortComments';
import Comment from './commentDetail';
import Votes from './voteControl';

class PostDetail extends Component {
  componentDidMount () {
    const { fetchPosts, fetchComments, posts, comments } = this.props;
    const postID = this.getPostID();

    if (!posts || !posts.fetched) {
      fetchPosts();
    }

    if (!comments || !comments.fetched) {
      fetchComments(postID);
    }
  }

  getPostID () {
    const { match } = this.props;
    return match.params.post;
  }

  deletePost = () => {
    const postID = this.getPostID();
    const { deletePost, history } = this.props;
    deletePost(postID, () => {
      history.push("/");
    })
  }

  vote = (option) => {
    const post = this.getPostID();
    const { votePost } = this.props;
    votePost(post, option);
  }

  voteUp = () => {
    this.vote(VOTE.UP);
  }

  voteDown = () => {
    this.vote(VOTE.DOWN);
  }

  renderPost () {
    const { posts } = this.props;
    const postID = this.getPostID();
    const post = posts.data[postID];
    const { author, title, body, timestamp, voteScore } = post;

    return (
      <div>
        <h2>{ title }</h2>
        <h6>Submitted by {author}, {format(timestamp, 'D MMM YYYY')}</h6>
        <p>{ body }</p>

        <Votes score={voteScore} voteUp={this.voteUp} voteDown={this.voteDown} />
      </div>
    );
  }

  sortComments () {
    const { comments } = this.props;
    const sortKey = comments.sort;
    const postID = this.getPostID();
    const postComments = comments.data[postID];

    if (!postComments || Object.keys(postComments).length === 0) {
      return [];
    }

    return Object.values(postComments).sort((a, b) => {
      return b[sortKey] - a[sortKey]
    });
  }

  renderComments () {
    const postComments = this.sortComments();
    const postID = this.getPostID();

    if (postComments.length > 0) {
      return (
        <div>
          <SortCommentsOptions />
          <ul>
          {
            postComments.map((comment) => {
              const { id } = comment;
              return (
                <Comment key={id} post={postID} {...comment} />
              );
            })
          }
          </ul>
        </div>
      );
    } else {
      return (
        <div>No comments yet. Be the first!</div>
      );
    }
  }

  render () {
    const { posts, comments } = this.props;
    const postID = this.getPostID();

    if (!posts.fetched || !comments.fetched) {
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
          <Link to={`/post/${postID}/edit`}>
            Edit
          </Link>
          <Link to={`/post/${postID}/comment/new`}>
            New comment
          </Link>
          <button onClick={this.deletePostHandler}>
            Delete post
          </button>
          { this.renderPost() }
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

export default connect(mapStateToProps, { fetchComments, fetchPosts, votePost, deletePost })(PostDetail);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CommentForm from './commentForm';
import Logo from './logo';
import { fetchPosts, fetchComments, saveComment, updateComment } from '../actions';

class CommentEdition extends Component {
  componentDidMount () {
    const { posts, comments, fetchPosts, fetchComments } = this.props;
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

  getCommentID () {
    const { match } = this.props;
    return match.params.comment;
  }

  submit = (values) => {
    const post = this.getPostID();
    const comment = this.getCommentID();

    const { saveComment, updateComment, history } = this.props;
    if (comment) {
      updateComment(comment, values, () => {
        history.push(`/post/${post}`);
      });
    } else {
      saveComment(post, values, () => {
        history.push(`/post/${post}`);
      });
    }
  }

  getInitialValues () {
    const { comments } = this.props;
    const postID = this.getPostID();
    const commentID = this.getCommentID();
    const postComments = comments.data[postID];
    const comment = postComments[commentID];

    return comment || {};
  }

  render () {
    const { comments, posts } = this.props;
    const post = this.getPostID();

    if (!comments.fetched || !posts.fetched) {
      return (
        <div>Loading categories...</div>
      );
    }

    return (
      <div>
        <Logo />
        { post && <Link to={`/post/${post}`}>Back</Link> }
        <CommentForm initialValues={ this.getInitialValues() } onSubmit={this.submit} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    posts: state.posts
  }
}

export default connect(
  mapStateToProps,
  {
    fetchComments,
    fetchPosts,
    saveComment,
    updateComment
  }
)(CommentEdition);

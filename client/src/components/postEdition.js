import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PostForm from './postForm';
import Logo from './logo';
import {
  fetchCategories,
  fetchPosts,
  savePost,
  updatePost
} from '../actions';

class PostEdition extends Component {
  componentDidMount () {
    const { categories, posts, fetchCategories, fetchPosts } = this.props;
    const fetchedCategories = categories && categories.fetched;
    const fetchedPosts = posts && posts.fetched;
    !fetchedCategories && fetchCategories();
    !fetchedPosts && fetchPosts();
  }

  submit = (values) => {
    const post = this.getPostID();
    const { savePost, updatePost, history } = this.props;
    if (post) {
      updatePost(post, values, () => {
        history.push(`/post/${post}`);
      });
    } else {
      savePost(values, () => {
        history.push('/');
      });
    }
  }

  getPostID () {
    const { match: { params: { post } = {} } } = this.props;
    return post;
  }

  getInitialValues () {
    const { posts } = this.props;
    const post = this.getPostID();
    if (post) {
      return posts.data[post];
    }

    return {};
  }

  render () {
    const { categories, posts } = this.props;
    const fetchedCategories = categories && categories.fetched;
    const fetchedPosts = posts && posts.fetched;
    const fetched = fetchedCategories && fetchedPosts;
    const post = this.getPostID();

    if (!fetched) {
      return (
        <div>Loading categories...</div>
      );
    }

    return (
      <div>
        <Logo />
        { post && <Link to={`/post/${post}`}>Back</Link> }
        <PostForm initialValues={ this.getInitialValues() } categories={categories.data} onSubmit={this.submit} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    posts: state.posts
  }
}

export default connect(mapStateToProps,
  {
    fetchCategories,
    fetchPosts,
    savePost,
    updatePost
  })(PostEdition);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import PostForm from './postForm';
import Logo from './logo';
import { fetchCategories, fetchPosts } from '../actions';

class PostNew extends Component {
  componentDidMount () {
    const { categories, posts, fetchCategories, fetchPosts } = this.props;
    const fetchedCategories = categories && categories.fetched;
    const fetchedPosts = posts && posts.fetched;
    !fetchedCategories && fetchCategories();
    !fetchedPosts && fetchPosts();
  }

  submit = (values) => {
    // print the form values to the console
    console.log(values)
  }

  getInitialValues () {
    const { match: { params: { post } = {} }, posts } = this.props;
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

    if (!fetched) {
      return (
        <div>Loading categories...</div>
      );
    }

    return (
      <div>
        <Logo />
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

export default connect(mapStateToProps, { fetchCategories, fetchPosts })(PostNew);

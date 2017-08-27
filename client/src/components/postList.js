import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Logo from './logo';
import Categories from './categories';
import SortPostOptions from './sortPosts';
import PostListItem from './postListItem';

import { fetchPosts } from '../actions';

class PostList extends Component {
  componentDidMount () {
    const { posts, fetchPosts } = this.props;
    const fetched = posts && posts.fetched;

    if (!fetched) {
      fetchPosts();
    }
  }

  filterAndSort () {
    const { posts, match } = this.props;
    const category = match.params.category || 'all';
    const sortKey = posts.sort;

    let filtered = Object.values(posts.data);

    if (category !== 'all') {
      filtered = filtered.filter(post => {
        return post.category === category;
      })
    }

    return filtered.sort((a, b) => {
      return b[sortKey] - a[sortKey]
    });
  }

  renderPosts () {
    const posts = this.filterAndSort();

    if (posts.length === 0) {
      return (
        <div>There is no post.</div>
      );
    }

    return posts.map(post => {
      return (
        <PostListItem key={post.id} {...post} />
      );
    });
  }

  render () {
    // To pass route props to the children
    const props = this.props;
    const { posts, match } = this.props;

    if (!posts || !posts.data) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div>
        <Logo />
        <Categories {...props} />
        <SortPostOptions />
        <Link to='/post/new'>
          Submit
        </Link>

        <ul>
          { this.renderPosts() }
        </ul>

        <div>Filtered by {match.params.category || 'all'} and sorted by {posts.sort}</div>
      </div>
    );
  }
}

const mapStateToPros = (state) => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToPros, { fetchPosts })(PostList);

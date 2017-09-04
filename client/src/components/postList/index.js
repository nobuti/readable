import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { SortPosts } from '../sort';
import PostListItem from './postListItem';
import Loading from '../loading';

import { fetchPosts } from '../../actions';

class PostList extends Component {
  componentDidMount () {
    const { posts, fetchPosts } = this.props;
    const fetched = posts && posts.fetched;

    !fetched && fetchPosts();
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
    const { posts, match } = this.props;

    if (!posts.fetched) {
      return (
        <Loading />
      );
    }

    return (
      <div className='Content'>
        <div className='Main'>
          <SortPosts />
          <Link to='/post/new'>
            Submit
          </Link>

          <ul>
            { this.renderPosts() }
          </ul>

          <div>Filtered by {match.params.category || 'all'} and sorted by {posts.sort}</div>
        </div>
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

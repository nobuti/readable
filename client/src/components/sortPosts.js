import React from 'react';
import { connect } from 'react-redux';
import { SORT_POSTS_BY, sortPosts } from '../actions';

export const LABEL = {
  voteScore: 'Top',
  comments: 'Popular',
  timestamp: 'New'
}

const SortPostsOptions = ({ activeSort, sortPosts }) => {
  const buttons = Object.values(SORT_POSTS_BY).map((sortKey) => {
    return (
      <li key={sortKey}>
        <button
          className={activeSort === sortKey ? 'active' : ''}
          onClick={(e) => {
              sortPosts(sortKey)
            }
          }
        >{LABEL[sortKey]}</button>
      </li>
    );
  })

  return (
    <ul>
      {buttons}
    </ul>
  );
}

const mapStateToProps = state => {
  return {
    activeSort: state.posts.sort
  }
}

export default connect(mapStateToProps, { sortPosts })(SortPostsOptions);
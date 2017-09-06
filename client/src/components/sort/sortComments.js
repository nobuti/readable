import React from 'react';
import { connect } from 'react-redux';
import { SORT_COMMENTS_BY, sortComments } from '../../actions';

export const LABEL = {
  voteScore: 'Top',
  timestamp: 'New'
}

const SortCommentsOptions = ({ activeSort, sortComments }) => {
  const buttons = Object.values(SORT_COMMENTS_BY).map((sortKey) => {
    return (
      <li key={sortKey}>
        <button
          className={activeSort === sortKey ? 'Button Button--small is-active' : 'Button  Button--small'}
          onClick={(e) => {
              sortComments(sortKey)
            }
          }
        >{LABEL[sortKey]}</button>
      </li>
    );
  })

  return (
    <ul className='Sort'>
      <li key='plain' className='Sort-comments'>
        Sort comments
      </li>

      {buttons}
    </ul>
  );
}

const mapStateToProps = state => {
  return {
    activeSort: state.comments.sort
  }
}

export default connect(mapStateToProps, { sortComments })(SortCommentsOptions);
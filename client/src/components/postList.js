import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Logo from './logo';
import Categories from './categories';

class PostList extends Component {
  render () {
    // To pass route props to the children
    const props = this.props;

    return (
      <div>
        <Logo />
        <Categories {...props} />
        <Link to='/post/new'>
          Submit
        </Link>

        <div>
          Post lists!
        </div>
      </div>
    );
  }
}

export default PostList;
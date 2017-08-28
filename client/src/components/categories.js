import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCategories } from '../actions';

class Categories extends Component {
  componentDidMount () {
    const { categories, fetchCategories } = this.props;
    const fetched = categories && categories.fetched;
    !fetched && fetchCategories();
  }

  renderCategory (name, path) {
    const current = this.props.match.params.category || 'all';
    const category = `${name.substring(0, 1).toUpperCase()}${name.substring(1)}`;
    const css = current === name ? 'active' : '';
    return (
      <li key={name}>
        <Link className={css} to={path}>{category}</Link>
      </li>
    );
  }

  renderCategories (categories) {
    return categories.map((category) => {
      const path = `/category/${category.path}`;
      const { name } = category;
      return this.renderCategory(name, path);
    });
  }

  render () {
    const { categories } = this.props;

    if (categories.fetched) {
      return (
        <ul>
          { this.renderCategory('all', '') }
          { this.renderCategories(categories.data) }
        </ul>
      );
    }

    return null;
  }
}

const mapStateToPros = (state) => {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToPros, { fetchCategories })(Categories);

import React from 'react';
import {Link} from 'react-router-dom';

import './notFound.css';

export default () => {
  return (
    <div className='Content'>
      <div className='Main'>
        <h1 className='Not-found'>Ooops, nothing to see here! But maybe you are interested in reading <Link to='/'>some articles</Link>.</h1>
      </div>
    </div>
  );
}
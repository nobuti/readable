import React from 'react';
import { Route } from 'react-router-dom';

import './header.css';

import Logo from '../logo';
import Categories from '../categories';

const Header = () => {
  return (
    <div className="Header">
      <div className='Left'>
        <Logo />
      </div>
      <div className='Main'>
      {
        ['/', '/category/:category'].map((path) => {
          return (
            <Route exact key={ path } path={ path } render={({ match }) => (
              <Categories category={ match.params.category || 'all' }/>
            )}/>
          );
        })
      }
      </div>
    </div>
  )
}

export default Header;

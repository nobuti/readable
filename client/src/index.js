import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";

import reducers from "./reducers";
import PostList from './components/postList';
import PostNew from './components/postNew';
import PostDetail from './components/postDetail';

const createStoreWithMiddlewares = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddlewares(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={PostList} />
        <Route path='/category/:id' component={PostList} />
        <Route path='/post/new' component={PostNew} />
        <Route path='/post/:id' component={PostDetail} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

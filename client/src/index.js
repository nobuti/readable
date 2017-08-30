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
import PostEdition from './components/postEdition';
import PostDetail from './components/postDetail';
import NotFound from './components/notFound';

const createStoreWithMiddlewares = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddlewares(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={PostList} />
        <Route path='/category/:category' component={PostList} />
        <Route path='/post/new' exact component={PostEdition} />
        <Route path='/post/:post/edit' exact component={PostEdition} />
        <Route path='/post/:post' component={PostDetail} />
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

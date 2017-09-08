import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import promise from "redux-promise";

import reducers from "./reducers";
import PostList from './components/postList';
import {PostEdition, CommentEdition} from './components/form';
import PostDetail from './components/postDetail';
import NotFound from './components/notFound';
import Header from './components/header';

const createStoreWithMiddlewares = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddlewares(reducers)}>
    <Router>
      <div className="Container">
        <Header />

        <Switch className="Content">
          <Route path='/' exact component={PostList} />
          <Route path='/category/:category' component={PostList} />
          <Route path='/post/:post/comment/:comment/edit' component={CommentEdition} />
          <Route path='/post/:post/comment/new' component={CommentEdition} />
          <Route path='/post/:post/edit' component={PostEdition} />
          <Route path='/post/new' exact component={PostEdition} />
          <Route path='/post/:post' component={PostDetail} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

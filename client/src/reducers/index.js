import { combineReducers } from 'redux';
import PostsReducer from './postsReducer';
import CommentsReducer from './commentsReducer';
import CategoriesReducer from './categoriesReducer';

export default combineReducers({
  post: PostsReducer,
  comments: CommentsReducer,
  categories: CategoriesReducer
});

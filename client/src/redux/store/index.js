import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import usersReducer from '../modules/users/users';

export default function configureStore() {
  const reducers = combineReducers({
    usersReducer,
  });
  const store = createStore(reducers, applyMiddleware(thunk));
  return store;
}

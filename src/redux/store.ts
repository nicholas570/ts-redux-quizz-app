import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import Rootreducers from './reducers';

const store = createStore(
  Rootreducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

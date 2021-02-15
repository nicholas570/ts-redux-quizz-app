import { combineReducers } from 'redux';
import { quizzReducer } from './quizz';

const rootReducer = combineReducers({
  quizz: quizzReducer,
});

export default rootReducer;

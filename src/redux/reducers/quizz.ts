import { AnyAction } from 'redux';
import { IAction, IQuizzListItem, IInitialQuizzState } from '../../models';
import {
  GET_QUIZZ_LIST,
  INCREMENT_SCORE,
  RESTART,
  SET_NEXT_QUESTION,
} from '../actions';

export const initialState: IInitialQuizzState = {
  items: [],
  currentIndex: 0,
  score: 0,
};

export const quizzReducer = (
  state = initialState,
  action: AnyAction
): IInitialQuizzState => {
  switch (action.type) {
    case GET_QUIZZ_LIST: {
      return {
        ...state,
        items: (action as IAction<IQuizzListItem[]>).payload,
      };
    }
    case INCREMENT_SCORE: {
      return {
        ...state,
        score: state.score + 1,
      };
    }
    case SET_NEXT_QUESTION: {
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
      };
    }
    case RESTART: {
      return {
        ...state,
        currentIndex: 0,
        score: 0,
      };
    }
    default:
      return state;
  }
};

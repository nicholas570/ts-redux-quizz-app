import axios from 'axios';
import {
  GET_QUIZZ_LIST,
  SET_NEXT_QUESTION,
  RESTART,
  INCREMENT_SCORE,
} from './index';
import { IQuizzList, IQuizzListItem } from '../../models';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

// FETCH QUESTIONS
export enum Difficulty {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
}

const getQuizzListItemsSuccess = (data: IQuizzListItem[]) => {
  return {
    type: GET_QUIZZ_LIST,
    payload: data,
  };
};

export const getQuizzListItems = (
  questionsAmount: number,
  difficulty: Difficulty
) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const r = await axios.get<IQuizzList>(
      `https://opentdb.com/api.php?amount=${questionsAmount}&difficulty=${difficulty}&type=boolean`
    );
    dispatch(getQuizzListItemsSuccess(r.data.results));
  };
};

// PLAY
const incrementScore = () => {
  return {
    type: INCREMENT_SCORE,
  };
};

const setNextQuestion = () => {
  return {
    type: SET_NEXT_QUESTION,
  };
};

export const reply = (isCorrect: boolean, isLastQuestion: boolean) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    if (isCorrect) {
      dispatch(incrementScore());
    }
    if (!isLastQuestion) {
      dispatch(setNextQuestion());
    }
  };
};

// RESTART
const reset = () => {
  return {
    type: RESTART,
  };
};

export const restart = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(reset());
    dispatch(getQuizzListItems(10, Difficulty.easy));
  };
};

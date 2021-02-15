export interface IQuizzListItem {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface IQuizzList {
  results: IQuizzListItem[];
}

export interface IAction<T> {
  type: string;
  payload: T;
}

export interface IStore {
  quizz: IInitialQuizzState;
}

export interface IInitialQuizzState {
  items: IQuizzListItem[];
  currentIndex: number;
  score: number;
}

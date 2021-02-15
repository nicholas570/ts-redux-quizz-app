import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Grid, Snackbar } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import { Difficulty, reply, restart } from './redux/actions/quizz';
import { IStore } from './models/index';
import { getQuizzListItems } from './redux/actions/quizz';

import { StyledButtonTrue, StyledButtonFalse } from './style';

export interface LocalState {
  message: string;
  isOpen: boolean;
  className: 'good' | 'wrong';
}

export function App() {
  const dispatch = useDispatch();
  const { items, currentIndex, score } = useSelector(
    (state: IStore) => state.quizz
  );
  const [state, setState] = useState<LocalState>({
    message: '',
    isOpen: false,
    className: 'wrong',
  });

  const answerQuestion = (answer: 'True' | 'False'): void => {
    const isTrue = answer === items[currentIndex].correct_answer;
    const isLast = currentIndex === items.length - 1;
    console.log(currentIndex, items.length);

    dispatch(reply(isTrue, isLast));
    setState({
      ...state,
      message: isTrue ? 'Well done' : 'Nope',
      className: isTrue ? 'good' : 'wrong',
      isOpen: true,
    });
  };

  const playAgain = () => {
    dispatch(restart());
  };

  const onSnackBarClose = () => {
    setState({ ...state, isOpen: false });
  };

  useEffect(() => {
    dispatch(getQuizzListItems(10, Difficulty.easy));
  }, []);

  const renderHeader = () => {
    return (
      <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='flex-start'>
        <Box mt={10} fontWeight='fontWeightBold' fontSize={40}>
          <div style={{ color: '#e55fff' }}>Easy</div>
          <div style={{ color: '#2858fb' }}>Quizy</div>
        </Box>
        <Box mt={10} fontSize={20} className='txt'>
          {' '}
          Score : {score} / {items.length}
        </Box>
      </Grid>
    );
  };

  const renderQuestionInfo = () => {
    return (
      <Grid
        container
        direction='column'
        alignItems='center'
        justify='center'
        style={{ minHeight: '40vh' }}>
        <div className='txt question_number'>
          Question N° {currentIndex + 1} / {items.length}
        </div>
        <div className='txt question_number'>
          {items[currentIndex].category}{' '}
        </div>
        <div
          className='txt'
          dangerouslySetInnerHTML={{
            __html: items[currentIndex].question,
          }}></div>
      </Grid>
    );
  };

  const renderButton = () => {
    return currentIndex < items.length - 1 ? (
      <Grid
        container
        direction='row'
        alignItems='center'
        justify='space-evenly'>
        <StyledButtonTrue onClick={() => answerQuestion('True')}>
          TRUE
        </StyledButtonTrue>
        <StyledButtonFalse onClick={() => answerQuestion('False')}>
          FALSE
        </StyledButtonFalse>
      </Grid>
    ) : (
      <Grid container direction='column' alignItems='center' justify='center'>
        <Box mt={10} fontSize={20} className='txt'>
          Final Score : {score} / {items.length}
        </Box>
        <StyledButtonFalse onClick={playAgain}>RESTART</StyledButtonFalse>
      </Grid>
    );
  };

  const renderContent = () => {
    return (
      <>
        {items.length > 0 && renderHeader()}
        {items.length > 0 &&
          currentIndex < items.length - 1 &&
          renderQuestionInfo()}
        {renderButton()}
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          autoHideDuration={600}
          open={state.isOpen}
          onClose={onSnackBarClose}
          message={state.message}
          className={state.className}
        />
      </>
    );
  };

  return <Container maxWidth='lg'>{renderContent()}</Container>;
}

export default App;

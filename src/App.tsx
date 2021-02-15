import React from 'react';
import { Container, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import { StyledButtonTrue, StyledButtonFalse } from './style';

export function App() {
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
          Score : TODO / TODO
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
        <div className='txt question_number'>Question N° TODO / TODO </div>
        <div className='txt question_number'> Category TODO </div>
        <div className='txt'>
          TypeScript Quiz starter ! Ici nous devrions afficher une question !
        </div>
      </Grid>
    );
  };

  const renderButton = () => {
    return (
      <Grid
        container
        direction='row'
        alignItems='center'
        justify='space-evenly'>
        <StyledButtonTrue>TRUE</StyledButtonTrue>
        <StyledButtonFalse>FALSE</StyledButtonFalse>
      </Grid>
    );
  };

  return (
    <Container maxWidth='lg'>
      {renderHeader()}
      {renderQuestionInfo()}
      {renderButton()}
    </Container>
  );
}

export default App;

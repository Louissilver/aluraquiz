import styled from 'styled-components';
import React from 'react';

function Logo() {
  return (
    <img src="https://fontmeme.com/permalink/210126/638a4dc7acfbf70c6615b96f2619c55f.png" />
  );
}

const QuizLogo = styled(Logo)`
  width: 70px;
  height: 300px;
  margin: auto;
  display: block;
  @media screen and (max-width: 20) {
    margin: 0;
  }
`;

export default QuizLogo;

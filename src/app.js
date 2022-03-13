import './app.css';
import Game from './components/Game';
import {Fragment} from 'react';

const App = () => {
  return (
    <Fragment>
      <h1>React Tic tac toe:</h1>
      <Game />
    </Fragment>
  );
};

export default App;

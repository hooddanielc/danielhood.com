import * as React from 'react';
import ReactDOM from 'react-dom';
import {Button} from '@mui/material';
import {Homepage} from './homepage/homepage';

function App() {
  return (
    <Homepage />
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));

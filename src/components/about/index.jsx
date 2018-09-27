import React from 'react';
import s from './style.scss';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

export default class extends React.Component {
  render() {
    return (
      <div className={s.container}>
        <Typography variant="subheading">About</Typography>
        <Typography variant="paragraph">
          I'm a passionate software developer who loves to program.
        </Typography>
        <Divider/>
      </div>
    );
  }
}
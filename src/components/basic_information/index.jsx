import React from 'react';
import s from './style.scss';
import Typography from '@material-ui/core/Typography';

export default class extends React.Component {
  render() {
    return (
      <div className={s.container}>
        <Typography variant="subheading">Basic Information</Typography>
        <div className={s.labels}>
          <Typography>Address:</Typography>
          <Typography>Date of Birth:</Typography>
          <Typography>Place of Birth:</Typography>
          <Typography>Language:</Typography>
          <Typography>Gender:</Typography>
        </div>
        <div className={s.info}>
          <Typography>****</Typography>
          <Typography>****</Typography>
          <Typography>****</Typography>
          <Typography>****</Typography>
          <Typography>****</Typography>
        </div>
      </div>
    );
  }
}

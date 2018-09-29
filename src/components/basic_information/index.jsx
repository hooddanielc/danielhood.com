import React from 'react';
import s from './style.scss';
import Typography from '@material-ui/core/Typography';

export default class extends React.Component {
  render() {
    return (
      <div className={s.container}>
        <Typography variant="headline">Basic Information</Typography>
        <div className={s.labels}>
          <Typography variant="subheading">Address:</Typography>
          <Typography variant="subheading">Date of Birth:</Typography>
          <Typography variant="subheading">Place of Birth:</Typography>
          <Typography variant="subheading">Language:</Typography>
          <Typography variant="subheading">Gender:</Typography>
        </div>
        <div className={s.info}>
          <Typography variant="subheading">****</Typography>
          <Typography variant="subheading">****</Typography>
          <Typography variant="subheading">****</Typography>
          <Typography variant="subheading">****</Typography>
          <Typography variant="subheading">****</Typography>
        </div>
      </div>
    );
  }
}

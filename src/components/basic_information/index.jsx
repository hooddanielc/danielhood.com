import React from 'react';
import s from './style.scss';
import Typography from '@material-ui/core/Typography';
import data from '../../data';

export default class extends React.Component {
  render() {
    return (
      <div className={s.container}>
        <Typography display="block" variant="subheading">Address: {data.address}</Typography>
        <Typography display="block" variant="subheading">Phone: {data.phone}</Typography>
      </div>
    );
  }
}

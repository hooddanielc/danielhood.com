import React from 'react';
import s from './style.scss';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import data from '../../data';
export default class extends React.Component {
  render() {
    return (
      <div className={s.container}>
        <Typography variant="subheading">
          {data.short_about_me}
        </Typography>
      </div>
    );
  }
}

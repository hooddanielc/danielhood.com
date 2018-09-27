import React from 'react';
import Typography from '@material-ui/core/Typography';
import OfflineBolt from '@material-ui/icons/OfflineBolt';
import data from '../../data.js';
import s from './styles.scss';

export default class ResumeHeader extends React.Component {
  render_item(obj) {
    const {
      city,
      school,
      endDate,
      startDate,
      state,
      description,
    } = obj;
    return (
      <li>
        <Typography variant="subheading">{school}, {city}, {state}</Typography>
        <Typography>{startDate}/{endDate}</Typography>
        <Typography>{description}</Typography>
      </li>
    );
  }

  render() {
    return (
      <ul className={s.container}>
        {data.education.map((o) => this.render_item(o))}
      </ul>
    );
  }
}

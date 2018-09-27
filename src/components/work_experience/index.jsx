import React from 'react';
import Typography from '@material-ui/core/Typography';
import OfflineBolt from '@material-ui/icons/OfflineBolt';
import data from '../../data.js';
import s from './styles.scss';

export default class ResumeHeader extends React.Component {
  render_item(obj) {
    const {
      city,
      company,
      endDate,
      gained,
      startDate,
      state,
      title,
    } = obj;
    return (
      <li>
        <Typography variant="subheading">{company}, {city}, {state}</Typography>
        <Typography>{startDate}/{endDate}</Typography>
        <ul>
          {gained.map((str) => (
            <li>
              <Typography>{str}</Typography>
              <Typography>{title}</Typography>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  render() {
    return (
      <ul className={s.container}>
        {data.experience.map((o) => this.render_item(o))}
      </ul>
    );
  }
}

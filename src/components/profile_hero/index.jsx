import React from 'react';
import s from './style.scss';
import Typography from '@material-ui/core/Typography';
import OfflineBolt from '@material-ui/icons/OfflineBolt';
import alanTuringImg from '../../../assets/alan_turing_statue.jpeg';
import headImg from '../../../assets/head.jpeg';

export default class extends React.Component {
  render() {
    return (
      <div className={s.container}>
        <div className={s.overlay}>
          <img src={alanTuringImg} className={s.background_image}/>
          <div className={s.background_overlay}/>
          <div className={s.gradient_text}/>
        </div>
        <div className={s.content_container}>
          <div className={s.head_card}>
            <div className={s.head}>
              <img className={s.img} src={headImg} />
            </div>
            <Typography align="center" variant="headline" className={s.name} color="inherit">
              Daniel Hood
            </Typography>
          </div>
          <div className={s.subtitle}>
            <Typography color="inherit" align="center" variant="subheading" gutterBottom>
              <span>User Experience</span>
              <span><OfflineBolt fontSize="inherit" style={{position: 'relative', top: '3px', padding: '0 5px'}}/></span>
              <span>Client & Server</span>
              <span><OfflineBolt fontSize="inherit" style={{position: 'relative', top: '3px', padding: '0 5px'}}/></span>
              <span>Web & Native Mobile Platforms</span>
              <span><OfflineBolt fontSize="inherit" style={{position: 'relative', top: '3px', padding: '0 5px'}}/></span>
              <span>Linux, Mac, Windows</span>
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}

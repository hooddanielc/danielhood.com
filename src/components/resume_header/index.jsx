import React from 'react';
import Typography from '@material-ui/core/Typography';
import OfflineBolt from '@material-ui/icons/OfflineBolt';

export default class ResumeHeader extends React.Component {
  render() {
    return (
      <header>
        <Typography align="center" variant="headline" gutterBottom>
          Daniel Hood
        </Typography>
        <Typography align="center" variant="title" gutterBottom>
          Software Engineer
        </Typography>
        <Typography align="center" variant="subheading" gutterBottom>
          <span>User Experience</span>
          <span><OfflineBolt fontSize="inherit" style={{position: 'relative', top: '3px', padding: '0 5px'}}/></span>
          <span>Client & Server</span>
          <span><OfflineBolt fontSize="inherit" style={{position: 'relative', top: '3px', padding: '0 5px'}}/></span>
          <span>Web & Native Mobile Platforms</span>
          <span><OfflineBolt fontSize="inherit" style={{position: 'relative', top: '3px', padding: '0 5px'}}/></span>
          <span>Linux, Mac, Windows</span>
        </Typography>
      </header>
    );
  }
}

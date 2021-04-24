import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ResumeHeader from '../resume_header';
import Cover from '../cover';
import ProfileHero from '../profile_hero';
import BasicInformation from '../basic_information';
import About from '../about';
import WorkExperience from '../work_experience';
import Education from '../education';
import Skills from '../skills';
import s from './style.scss'

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
  },
  paper: {
    padding: theme.spacing.unit,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing.unit,
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
  paragraph: {
    marginBottom: '10px',
  }
});

function CSSGrid(props) {
  const { classes } = props;

  return (
    <div className={s.wrapper}>
      <div className={s.page}>
        <div className={s.profile_wrapper}>
          <ProfileHero/>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <About/>
            </Grid>
            <Grid item xs={6}>
              <BasicInformation/>
            </Grid>
          </Grid>
          <Divider/>
        </div>
        <div>
          <Skills/>
        </div>
      </div>
      <Divider/>
      <div>
        <Typography variant="h3" display="block" align="center" className={s.name} color="inherit">
          Work Experience
        </Typography>
        <WorkExperience/>
      </div>
      <Divider/>
      <div>
        <Typography align="center" variant="headline" className={s.name} color="inherit">
          Education
        </Typography>
        <Education/>
      </div>
    </div>
  );
}

CSSGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CSSGrid);

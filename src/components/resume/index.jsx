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
    <div>
      <div>
        <ProfileHero/>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <About/>
          </Grid>
          <Grid item xs={6}>
            <BasicInformation/>
          </Grid>
        </Grid>
      </div>
      <div>
        <Skills/>
      </div>
      <div>
        <WorkExperience/>
      </div>
      <div>
        <Education/>
      </div>
      <ResumeHeader {...props}/>
      <Cover {...props}/>
    </div>
  );
}

CSSGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CSSGrid);

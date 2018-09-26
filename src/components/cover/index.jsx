import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

export default class Cover extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <Typography variant="body1" className={classes.paragraph}>
                I'm a passionate software developer currently doing all that I can to better
                myself as a professional software engineer.
              </Typography>
              <Typography variant="body1" className={classes.paragraph}>
                I started programming when I was a teenager and have never stopped. I studied 
                software development in college for three years in Idaho and California, but I 
                have learned at least as much from working on programming projects on my own. 
                I've always been impatient with myself, always eager to learn how to write new 
                kinds of things. Programming keeps leading me forward.
              </Typography>
              <Typography variant="body1" className={classes.paragraph}>
                While a student 2012, I took a summer internship at Tagged in San Francisco. 
                It was the most concentrated learning experience of my life and launched my 
                career as a professional software developer. I stayed on at Tagged after my 
                internship, working as a contractor. It was also the place where I met the man 
                I married, so I can truly say it was a turning point in my life.
              </Typography>
              <Typography variant="body1" className={classes.paragraph}>
                Since then, I have been working in the Seattle area keeping the same mind set.
                Exposure to different development teams and work environments has helped me
                to gain perspective. I think good software development is object-oriented,
                test-driven, rapidly iterated, and as fully automated as possible. I hope
                my next team will build on these ideas and help me to grow and learn as a
                developer.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>xs=4</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

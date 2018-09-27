import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import data from '../../data';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class TabsWrappedLabel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'one',
    };
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  render_skills() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            asdf1
          </Grid>
          <Grid item xs={6}>
            asdf2
          </Grid>
        </Grid>
      </div>
    );
  }

  render_backend() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            {data.backend_buzz_words.map((str) => (
              <Chip label={str} />
            ))}
          </Grid>
          <Grid item xs={6}>
            asdf2
          </Grid>
        </Grid>
        {/*<Chip label="Basic Chip" variant="outlined" />
        <Chip
          avatar={<Avatar>MB</Avatar>}
          label="Clickable Chip"
          variant="outlined"
        />
        <Chip
          avatar={<Avatar src="/static/images/uxceo-128.jpg" />}
          label="Deletable Chip"
          variant="outlined"
        />
        <Chip
          avatar={
            <Avatar>
              <FaceIcon />
            </Avatar>
          }
          label="Clickable Deletable Chip"
          variant="outlined"
        />
        <Chip
          icon={<FaceIcon />}
          label="Clickable Deletable Chip"
          variant="outlined"
        />
        <Chip
          label="Custom delete icon Chip"
          deleteIcon={<DoneIcon />}
          variant="outlined"
        />
        <Chip
          label="Clickable Link Chip"
          component="a"
          href="#chip"
          clickable
          variant="outlined"
        />
        <Chip
          avatar={<Avatar>MB</Avatar>}
          label="Primary Clickable Chip"
          clickable
          color="primary"
          deleteIcon={<DoneIcon />}
          variant="outlined"
        />
        <Chip
          icon={<FaceIcon />}
          label="Primary Clickable Chip"
          clickable
          color="primary"
          deleteIcon={<DoneIcon />}
          variant="outlined"
        />
        <Chip
          label="Deletable Primary Chip"
          color="primary"
          variant="outlined"
        />
        <Chip
          avatar={
            <Avatar>
              <FaceIcon />
            </Avatar>
          }
          label="Deletable Secondary Chip"
          color="secondary"
          variant="outlined"
        />
        <Chip
          icon={<FaceIcon />}
          label="Deletable Secondary Chip"
          color="secondary"
          variant="outlined"
        />*/}
      </div>
        
    );
  }

  render_frontend() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            {data.frontend_buzz_words.map((str) => (
              <Chip label={str} />
            ))}
          </Grid>
          <Grid item xs={6}>
            asdf2
          </Grid>
        </Grid>
      </div>  
    );
  }

  render_tools() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            {data.tool_buzz_words.map((str) => (
              <Chip label={str} />
            ))}
          </Grid>
          <Grid item xs={6}>
            asdf2
          </Grid>
        </Grid>
      </div>  
    );
  }

  render_languages() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            {data.language.map((str) => (
              <Chip label={str} />
            ))}
          </Grid>
          <Grid item xs={6}>
            asdf2
          </Grid>
        </Grid>
      </div>  
    );
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange.bind(this)}>
            <Tab value="skills" label="Skills" />
            <Tab value="backend" label="Backend" />
            <Tab value="frontend" label="Frontend" />
            <Tab value="tools" label="Tools" />
            <Tab value="languages" label="Languages" />
          </Tabs>
        </AppBar>
        {value === 'skills' && <TabContainer>{this.render_skills()}</TabContainer>}
        {value === 'backend' && <TabContainer>{this.render_backend()}</TabContainer>}
        {value === 'frontend' && <TabContainer>{this.render_frontend()}</TabContainer>}
        {value === 'tools' && <TabContainer>{this.render_tools()}</TabContainer>}
        {value === 'languages' && <TabContainer>{this.render_languages()}</TabContainer>}
      </div>
    );
  }
}

TabsWrappedLabel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TabsWrappedLabel);

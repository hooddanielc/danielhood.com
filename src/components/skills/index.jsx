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
import s from './style.scss';

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
      value: 'skills',
    };
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  render_chip_skills({chip_values}) {
    return (
      <div>
        <Grid container spacing={24}>
          {chip_values.map((str, i) => (
            <Chip key={i} className={s.chip} label={str} />
          ))}
        </Grid>
      </div>
    )
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange.bind(this)}>
            <Tab value="skills" label="All Skills" />
            <Tab value="backend" label="Backend" />
            <Tab value="frontend" label="Frontend" />
            <Tab value="tools" label="Tools" />
            <Tab value="languages" label="Languages" />
          </Tabs>
        </AppBar>
        {
          value === 'skills' && (
            <TabContainer>
              {
                this.render_chip_skills({
                  chip_values: data.backend_buzz_words
                    .concat(data.frontend_buzz_words)
                    .concat(data.tool_buzz_words)
                    .concat(data.language)
                })
              }
            </TabContainer>
          )
        }
        {value === 'backend' && <TabContainer>{this.render_chip_skills({chip_values: data.backend_buzz_words})}</TabContainer>}
        {value === 'frontend' && <TabContainer>{this.render_chip_skills({chip_values: data.frontend_buzz_words})}</TabContainer>}
        {value === 'tools' && <TabContainer>{this.render_chip_skills({chip_values: data.tool_buzz_words})}</TabContainer>}
        {value === 'languages' && <TabContainer>{this.render_chip_skills({chip_values: data.language})}</TabContainer>}
      </div>
    );
  }
}

TabsWrappedLabel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TabsWrappedLabel);

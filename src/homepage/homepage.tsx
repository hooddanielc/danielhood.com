import * as React from 'react';
import {css, cx} from '@emotion/css';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import {AllInclusive} from '@mui/icons-material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import {Experience} from '../data';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {data} from '../data';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Daniel Hood
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

interface IState {
  selectedTab: number;
}

export class Homepage extends React.Component<Record<string, unknown>, IState> {
  state: IState = {
    selectedTab: 0,
  }

  onTabChange(e: React.SyntheticEvent, value: number) {
    this.setState({selectedTab: value});
  }

  renderChipSkills(chipValues: string[]) {
    return (
      <Box width={1} p={1}>
        <Box
          display="flex"
          flexWrap="wrap"
          flexDirection="row"
        >
          {chipValues.map((str, i) => (
            <Box margin={1} key={i}>
              <Chip label={str} />
            </Box>
          ))}
        </Box>
      </Box>
    )
  }

  renderTabContent() {
    const {
      backend_buzz_words,
      frontend_buzz_words,
      language,
      tool_buzz_words,
    } = data;

    switch (this.state.selectedTab) {
      case 0: {
        return this.renderChipSkills([
          ...backend_buzz_words,
          ...frontend_buzz_words,
          ...tool_buzz_words,
          ...language,
        ]);
      }
      case 1: {
        return this.renderChipSkills(backend_buzz_words);
      }
      case 2: {
        return this.renderChipSkills(frontend_buzz_words);
      }
      case 3: {
        return this.renderChipSkills(tool_buzz_words);
      }
      case 4: {
        return this.renderChipSkills(language);
      }
    }
    return this.renderChipSkills(['woops']);
  }

  renderWorkExperience() {
    return data.experience.map((experience, i) => {
      const {
        city,
        company,
        endDate,
        gained,
        startDate,
        state,
        title,
      } = experience;
      return (
        <Box key={i}>
          <Typography variant="h5"><b>{company}, {city}, {state}</b></Typography>
          <Typography variant="h6"><b>{startDate} to {endDate}</b></Typography>
          <ul>
            {gained.map((str) => (
              <li>
                <Typography>{str}</Typography>
                <Typography>{title}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      );
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <AllInclusive sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" noWrap>
              Daniel Hood
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
            className={css`
              position: relative;
            `}
          >
            <Box
              className={css`
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-image: url(./assets/alan_turing_statue.png);
                background-position: right;
                background-repeat: no-repeat;
              `}
            />
            <Container
              maxWidth="sm"
              className={css`
                position: relative;
              `}
            >
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
                style={{color: '#ffffff'}} 
              >
                Daniel Hood
              </Typography>
              <Typography variant="h5" align="center" style={{color: '#ffffff'}} paragraph>
                Full Stack Software Engineer
              </Typography>
              {/*<Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained">Main call to action</Button>
                <Button variant="outlined">Secondary action</Button>
              </Stack>*/}
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}

            <Box>
              <Tabs
                value={this.state.selectedTab}
                onChange={this.onTabChange.bind(this)}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="All Skills" />
                <Tab label="Backend" />
                <Tab label="Frontend" />
                <Tab label="Tools" />
                <Tab label="Languages" />
              </Tabs>
              {this.renderTabContent()}
            </Box>

            <Box>
              <Stack>
                {this.renderWorkExperience()}
              </Stack>
            </Box>
          </Container>
        </main>
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            hood.danielc@gmail.com
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            I like to make things.
          </Typography>
          <Copyright />
        </Box>
      </ThemeProvider>
    );
  }
}
import * as React from 'react';
import { css } from '@emotion/css';
import AppBar from '@mui/material/AppBar';
import { AllInclusive } from '@mui/icons-material';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { data } from '../data';
function Copyright() {
    return (React.createElement(Typography, { variant: "body2", color: "text.secondary", align: "center" },
        'Copyright © ',
        React.createElement(Link, { color: "inherit", href: "https://mui.com/" }, "Daniel Hood"),
        ' ',
        new Date().getFullYear(),
        '.'));
}
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});
export class Homepage extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            selectedTab: 0,
        };
    }
    onTabChange(e, value) {
        this.setState({ selectedTab: value });
    }
    renderChipSkills(chipValues) {
        return (React.createElement(Box, { width: 1, p: 1 },
            React.createElement(Box, { display: "flex", flexWrap: "wrap", flexDirection: "row" }, chipValues.map((str, i) => (React.createElement(Box, { margin: 1, key: i },
                React.createElement(Chip, { label: str })))))));
    }
    renderTabContent() {
        const { backend_buzz_words, frontend_buzz_words, language, tool_buzz_words, } = data;
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
            const { city, company, endDate, gained, startDate, state, title, } = experience;
            return (React.createElement(Box, { key: i },
                React.createElement(Typography, { variant: "h5" },
                    React.createElement("b", null,
                        company,
                        ", ",
                        city,
                        ", ",
                        state)),
                React.createElement(Typography, { variant: "h6" },
                    React.createElement("b", null,
                        startDate,
                        " to ",
                        endDate)),
                React.createElement("ul", null, gained.map((str) => (React.createElement("li", null,
                    React.createElement(Typography, null, str),
                    React.createElement(Typography, null, title)))))));
        });
    }
    render() {
        return (React.createElement(ThemeProvider, { theme: theme },
            React.createElement(CssBaseline, null),
            React.createElement(AppBar, { position: "relative" },
                React.createElement(Toolbar, null,
                    React.createElement(AllInclusive, { sx: { mr: 2 } }),
                    React.createElement(Typography, { variant: "h6", color: "inherit", noWrap: true }, "Daniel Hood"))),
            React.createElement("main", null,
                React.createElement(Box, { sx: {
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }, className: css `
              position: relative;
            ` },
                    React.createElement(Box, { className: css `
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-image: url(./assets/alan_turing_statue.png);
                background-position: right;
                background-repeat: no-repeat;
              ` }),
                    React.createElement(Container, { maxWidth: "sm", className: css `
                position: relative;
              ` },
                        React.createElement(Typography, { component: "h1", variant: "h2", align: "center", color: "text.primary", gutterBottom: true, style: { color: '#ffffff' } }, "Daniel Hood"),
                        React.createElement(Typography, { variant: "h5", align: "center", style: { color: '#ffffff' }, paragraph: true }, "Full Stack Software Engineer"))),
                React.createElement(Container, { sx: { py: 8 }, maxWidth: "md" },
                    React.createElement(Box, null,
                        React.createElement(Tabs, { value: this.state.selectedTab, onChange: this.onTabChange.bind(this), indicatorColor: "secondary", textColor: "inherit", variant: "fullWidth", "aria-label": "full width tabs example" },
                            React.createElement(Tab, { label: "All Skills" }),
                            React.createElement(Tab, { label: "Backend" }),
                            React.createElement(Tab, { label: "Frontend" }),
                            React.createElement(Tab, { label: "Tools" }),
                            React.createElement(Tab, { label: "Languages" })),
                        this.renderTabContent()),
                    React.createElement(Box, null,
                        React.createElement(Stack, null, this.renderWorkExperience())))),
            React.createElement(Box, { sx: { bgcolor: 'background.paper', p: 6 }, component: "footer" },
                React.createElement(Typography, { variant: "h6", align: "center", gutterBottom: true }, "hood.danielc@gmail.com"),
                React.createElement(Typography, { variant: "subtitle1", align: "center", color: "text.secondary", component: "p" }, "I like to make things."),
                React.createElement(Copyright, null))));
    }
}
//# sourceMappingURL=homepage.js.map
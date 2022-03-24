import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
function Copyright() {
    return (React.createElement(Typography, { variant: "body2", color: "text.secondary", align: "center" },
        'Copyright © ',
        React.createElement(Link, { color: "inherit", href: "https://mui.com/" }, "Your Website"),
        ' ',
        new Date().getFullYear(),
        '.'));
}
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const theme = createTheme();
export default function Homepage() {
    return (React.createElement(ThemeProvider, { theme: theme },
        React.createElement(CssBaseline, null),
        React.createElement(AppBar, { position: "relative" },
            React.createElement(Toolbar, null,
                React.createElement(CameraIcon, { sx: { mr: 2 } }),
                React.createElement(Typography, { variant: "h6", color: "inherit", noWrap: true }, "Album layout"))),
        React.createElement("main", null,
            React.createElement(Box, { sx: {
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                } },
                React.createElement(Container, { maxWidth: "sm" },
                    React.createElement(Typography, { component: "h1", variant: "h2", align: "center", color: "text.primary", gutterBottom: true }, "Album layout"),
                    React.createElement(Typography, { variant: "h5", align: "center", color: "text.secondary", paragraph: true }, "Something short and leading about the collection below\u2014its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely."),
                    React.createElement(Stack, { sx: { pt: 4 }, direction: "row", spacing: 2, justifyContent: "center" },
                        React.createElement(Button, { variant: "contained" }, "Main call to action"),
                        React.createElement(Button, { variant: "outlined" }, "Secondary action")))),
            React.createElement(Container, { sx: { py: 8 }, maxWidth: "md" },
                React.createElement(Grid, { container: true, spacing: 4 }, cards.map((card) => (React.createElement(Grid, { item: true, key: card, xs: 12, sm: 6, md: 4 },
                    React.createElement(Card, { sx: { height: '100%', display: 'flex', flexDirection: 'column' } },
                        React.createElement(CardMedia, { component: "img", sx: {
                                pt: '56.25%',
                            }, image: "https://source.unsplash.com/random", alt: "random" }),
                        React.createElement(CardContent, { sx: { flexGrow: 1 } },
                            React.createElement(Typography, { gutterBottom: true, variant: "h5", component: "h2" }, "Heading"),
                            React.createElement(Typography, null, "This is a media card. You can use this section to describe the content.")),
                        React.createElement(CardActions, null,
                            React.createElement(Button, { size: "small" }, "View"),
                            React.createElement(Button, { size: "small" }, "Edit"))))))))),
        React.createElement(Box, { sx: { bgcolor: 'background.paper', p: 6 }, component: "footer" },
            React.createElement(Typography, { variant: "h6", align: "center", gutterBottom: true }, "Footer"),
            React.createElement(Typography, { variant: "subtitle1", align: "center", color: "text.secondary", component: "p" }, "Something here to give the footer a purpose!"),
            React.createElement(Copyright, null))));
}
//# sourceMappingURL=index.js.map
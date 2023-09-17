import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { ExitToApp as ExitToAppIcon } from '@mui/icons-material';

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: "#198754",
    color: "white",
    minWidth: "400px",
    padding: theme.spacing(1),
    margin: "0px auto"
  }));

export const LogoutPage = (props) => {

    const {user, setUser} = props;

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        setUser(null);
        window.location= "/";
    };
    
    return (
        <Container maxWidth="md" style={{marginTop: "5%"}}>
            <Box style={{backgroundImage: "url('/img/carousel-2.jpg')", padding: "50px", backgroundSize: "100%"}}>
                <Div>
                    <Typography variant="h4">
                        {user?.displayName !== "" ? user?.displayName : user.name}
                    </Typography>
                </Div>
                <Div style={{marginTop: "10px"}}>
                    <Typography variant="body1">
                        Ви справді хочете вийти з аккаунту?😥
                    </Typography>
                </Div>
                <Button
                    variant="contained"
                    color="warning"
                    fullWidth
                    size="large"
                    className="mt3"
                    style={{marginTop: "200px"}}
                    onClick={handleLogout}
                >
                    Так, Вийти
                </Button>
            </Box>
        </Container>
    );
};
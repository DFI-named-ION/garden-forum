import React, { useState, useEffect } from "react";
import axios from "axios";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const AuthorizationPage = (props) => {
    const {user, setUser} = props;

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        request: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch(name){
            case "password":
                setPassword(value);
                break;
            case "login":
                setLogin(value);
                break;
        };
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleReset = (e) => {
        e.preventDefault();
        setPassword('');
        setLogin('');
    };

    const getCurrentTime = () => {
        const today = new Date();
        const year = today.getUTCFullYear();
        const month = (today.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = today.getUTCDate().toString().padStart(2, '0');
        const hours = today.getUTCHours().toString().padStart(2, '0');
        const minutes = today.getUTCMinutes().toString().padStart(2, '0');
        const seconds = today.getUTCSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('https://localhost:44347/api/Users');
            const u = response.data.filter((u) => u.login === login);
            u[0].lastOnline = getCurrentTime();
            await axios.put('https://localhost:44347/api/Users/' + u[0].id, u[0]);
            if (u.length > 0) {
                setUser(u[0]);
                localStorage.setItem('user', JSON.stringify(u[0]));
                window.location = '/';
            }
        } catch (error) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                request: "Під час авторизації сталася помилка!",
            }));
        }
    };

    return (
        <Container maxWidth="lg">
            <div className="mt-5" style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: "2", background: `url('/img/carousel-3.jpg')`, backgroundSize: "cover", height: "400px", width: "100%", backgroundRepeat: "no-repeat" }}/>
                <div style={{ flex: "1", padding: "20px", minWidth: "500px" }}>
                        <Typography variant="h4" align="center">
                        Форма авторизації
                    </Typography>
                    <form onSubmit={handleSubmit} onReset={handleReset}>
                        <TextField
                            fullWidth
                            label="Логін"
                            name="login"
                            value={login}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                            InputProps={{
                                maxLength: 50,
                                startAdornment: (
                                    <AccountCircleIcon color="success" fontSize="small" style={{ marginRight: "8px" }} />
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Пароль"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                            InputProps={{
                                maxLength: 50,
                                startAdornment: (
                                    <AccountCircleIcon color="success" fontSize="small" style={{ marginRight: "8px" }} />
                                ),
                                endAdornment: (
                                    <Button onClick={handlePasswordVisibility} size="small">
                                    {showPassword ? <VisibilityOffIcon color="success" /> : <VisibilityIcon color="success" />}
                                    </Button>
                                ),
                            }}
                        />
                        {errors.request && (
                            <div style={{ color: "red" }}>{errors.request}</div>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            fullWidth
                            size="large"
                            className="mt-3">
                            Авторизуватися!
                        </Button>
                        <Button
                            type="reset"
                            variant="contained"
                            color="warning"
                            fullWidth
                            size="large"
                            className="mt-3">
                            Скинути
                        </Button>
                    </form>
                </div>
            </div>
        </Container>
    );
};
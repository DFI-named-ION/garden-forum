import React, { useState, useEffect } from "react";
import axios from "axios";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const RegistrationPage = (props) => {
    const {user, setUser} = props;

    const [displayName, setDisplayName] = useState('');
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [errors, setErrors] = useState({
        login: '',
        password: '',
        password2: '',
        request: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch(name){
            case "password":
                setPassword(value);
                break;
            case "password2":
                setPassword2(value);
                break;
            case "login":
                setLogin(value);
                break;
            case "name":
                setName(value);
                break;
            case "displayName":
                setDisplayName(value);
                break;
        };
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleReset = (e) => {
        e.preventDefault();
        setName('');
        setDisplayName('');
        setPassword('');
        setPassword2('');
        setLogin('');
    };

    const checkInputs = async () => {
        const loginRegex = /^(?=[A-Za-z])[A-Za-z0-9_]{6,50}$/;
        const passwordRegex = /^(?=[A-Za-z_])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d_!@#$%^&*]{8,50}$/;

        if (!loginRegex.test(login)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                login: "Ваш логін має бути довшим за 6 символів та меншим за 50 символів, дозволені лише латинські літери від A-z та цифри від 0-9!",
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                login: '',
            }));
        }
        
        if (!passwordRegex.test(password)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: "Ваш пароль має бути довшим за 8 символів та меншим за 50 символів, та обов'язково мати хоча б 1 літеру, 1 цифру та 1 спец символ!",
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: '',
            }));
        }
          
        if (password !== password2) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password2: "Паролі відрізняються!",
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password2: '',
            }));
        }
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
        await checkInputs();
        try {
            let newUser = {
                displayName: displayName,
                name: name,
                login: login,
                password: password,
                lastOnline: getCurrentTime(),
                roleId: 1
            };
            console.log(newUser);
            await axios.post('https://localhost:44347/api/Users', newUser);
            const response = await axios.get('https://localhost:44347/api/Users');
            const u = response.data.filter((u) => u.login === newUser.login);
            if (u.length > 0) {
                setUser(u[0]);
                localStorage.setItem('user', JSON.stringify(u[0]));
                window.location = '/profile';
            } else {
                throw Error("Some error! Hehe...");
            }
        } catch (error) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                request: "Під час реєстрації сталася помилка!",
            }));
        }
    };

    return (
        <Container maxWidth="lg">
            <div className="mt-5" style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: "2", background: `url('/img/service-2.jpg')`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}}/>
                <div style={{ flex: "1", padding: "20px", minWidth: "500px" }}>
                    <Typography variant="h4" align="center">
                        Форма реєстрації
                    </Typography>
                    <form onSubmit={handleSubmit} onReset={handleReset}>
                        <TextField
                            fullWidth
                            label="Відображуване ім'я"
                            name="displayName"
                            value={displayName}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            inputProps={{
                                maxLength: 50,
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Ім'я"
                            name="name"
                            value={name}
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
                            helperText={errors.login && (
                                <div style={{ color: "red" }}>{errors.login}</div>
                            )}
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
                            helperText={errors.password && (
                                <div style={{ color: "red" }}>{errors.password}</div>
                            )}
                        />
                        <TextField
                            fullWidth
                            label="Підтвердження паролю"
                            name="password2"
                            type={showPassword ? "text" : "password"}
                            value={password2}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                            inputProps={{
                                maxLength: 50,
                            }}
                            helperText={errors.password2 && (
                                <div style={{ color: "red" }}>{errors.password2}</div>
                            )}
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
                            Зареєструватися!
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
}
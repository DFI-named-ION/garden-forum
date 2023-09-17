import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Footer } from './components/layout/Footer';
import { NavBar } from './components/navigation/NavBar';

import { MainPage } from './components/pages/MainPage';
import { RegistrationPage } from './components/pages/RegisterationPage';
import { AuthorizationPage } from './components/pages/AuthorizationPage';
import { LogoutPage } from './components/pages/LogoutPage';

function App() {

	const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

	return (
		<>
            <Router>
                <NavBar {...{user, setUser}} />
                <div className="App">
                    <main>
                        <div>
                            <Routes>
                                <Route path='/' element={<MainPage />}/>
                                <Route path='/registration' element={<RegistrationPage {...{user, setUser}}/>}/>
                                <Route path='/authorization' element={<AuthorizationPage {...{user, setUser}}/>}/>
                                <Route path='/logout' element={<LogoutPage {...{user, setUser}}/>}/>
                                <Route path='/*' element={(<h1>Або немає, або буде</h1>)}/>
                            </Routes>
                        </div>
                    </main>
					<Footer />
                </div>
            </Router>
        </>
	);
}

export default App;

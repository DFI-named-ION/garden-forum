import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import { Footer } from './components/layout/Footer';
import { NavBar } from './components/navigation/NavBar';

import { MainPage } from './components/pages/MainPage';
import { RegistrationPage } from './components/pages/RegisterationPage';
import { AuthorizationPage } from './components/pages/AuthorizationPage';
import { LogoutPage } from './components/pages/LogoutPage';
import { AboutPage } from './components/pages/AboutPage';
import { WikiPage } from './components/pages/WikiPage';
import { ArticlePage } from './components/pages/ArticlePage';
import { ReceiptsPage } from './components/pages/ReceiptsPage';
import { ReceiptPage } from './components/pages/ReceiptPage';
import { ProfilePage } from './components/pages/ProfilePage';

function App() {

	const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            let u = null;
            const fetchData = async () => {
                try {
                    u = await axios.get("https://localhost:44347/api/Users/" + JSON.parse(storedUser)?.id).then((respnse) => respnse.data);
                    if (u) {
                        setUser({...u});
                        delete u.login;
                        delete u.password;
                        localStorage.removeItem('user');
                        localStorage.setItem('user', JSON.stringify(u));
                    }
                } catch (error) {}
            };
    
            fetchData();
        }
    }, user);

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
                                <Route path='/about' element={<AboutPage/>}/>
                                <Route path='/receipts' element={<ReceiptsPage {...{user, setUser}}/>}/>
                                <Route path="/receipts/receipt/:id" element={<ReceiptPage {...{user, setUser}} />} />
                                <Route path='/wiki' element={<WikiPage {...{user, setUser}}/>}/>
                                <Route path="/wiki/article/:id" element={<ArticlePage {...{user, setUser}} />} />
                                <Route path="/profile/:id" element={<ProfilePage {...{user, setUser}} />} />
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

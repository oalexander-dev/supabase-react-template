import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import ProtectedPage from './lib/ProtectedPage';
import { sb } from './lib/api';
import urls from './lib/urls';
import AccountPage from './pages/AccountPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyEmailPage from './pages/VerifyEmailPage';

export default function App() {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        setSession(sb.auth.session());

        sb.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    const loggedIn = session !== null;

    return (
        <div className="app">
            <Navbar loggedIn={loggedIn} />
            <Routes>
                <Route path={urls.homeUrl} element={<HomePage />} />
                <Route path={urls.loginUrl} element={<LoginPage />} />
                <Route path={urls.registerUrl} element={<RegisterPage />} />
                <Route
                    path={urls.verifyEmailUrl}
                    element={<VerifyEmailPage />}
                />
                <Route
                    path={urls.accountUrl}
                    element={
                        <ProtectedPage loggedIn={loggedIn}>
                            <AccountPage />
                        </ProtectedPage>
                    }
                />
                <Route path="*" element={<p>Whoops, this does not exist.</p>} />
            </Routes>
        </div>
    );
}

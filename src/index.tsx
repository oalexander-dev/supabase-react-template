import { WuiProvider, WuiTheme, createTheme } from '@welcome-ui/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const theme: WuiTheme = createTheme();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <WuiProvider theme={theme}>
                <App />
            </WuiProvider>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();

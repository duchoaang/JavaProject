import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId="1055285564287-btv8jijatg63ljno0490idtrl9kc4330.apps.googleusercontent.com">
        <React.StrictMode>
            <Router>
                <App />
            </Router>
        </React.StrictMode>
    </GoogleOAuthProvider>,
);

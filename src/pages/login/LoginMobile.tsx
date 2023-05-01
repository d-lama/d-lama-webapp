import React, {useState} from 'react';
import Login from "./Login";
import './Login.css';

export default function LoginMobile() {

    const handleLoginSuccess = () => {
        window.location.href = '/home';
    }

    return (
        <div className="mobile-page">
            <Login onLoginSuccess={handleLoginSuccess} />
        </div>
    );
}
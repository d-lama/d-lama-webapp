import React, {useState} from 'react';
import Login from "./Login";

export default function LoginDesktop() {

const handleLoginSuccess = () => {
    window.location.href = '/home';
}

return (
    <div className="desktop-page">
        <Login onLoginSuccess={handleLoginSuccess}/>
    </div>
);
}

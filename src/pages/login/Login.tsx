import React, {useState} from 'react';
import './Login.css';
import axios from "axios";
import LoginDesktop from "./LoginDesktop";
import LoginMobile from "./LoginMobile";

export default function Login() {
    const [labelText, setLabelText] = useState('');
    const [mask, setMask] = useState({
        email: "",
        password: "",
    })

    function handleChange(e: { target: { name: any; value: any; }; }) {
        setMask(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleLogin = function (e: React.SyntheticEvent) {
        e.preventDefault()
        //TODO: insert correct URL
        axios.post('/api/login', {
            email: mask.email,
            password: mask.password,
        })
            .then(function () {
                window.location.href = '/home';
            })
            .catch(function () {
                setLabelText('Invalid email or password!');
                setTimeout(() => {
                    setLabelText('');
                }, 3000);
            });
    }
    const isDesktop = window.innerWidth >= 768;

    return (
        <>
            (
            <div>
                {isDesktop ? (
                    <LoginDesktop
                        mask={mask}
                        handleChange={handleChange}
                        handleLogin={handleLogin}
                        labelText={labelText}
                    />
                ) : (
                    <LoginMobile
                        mask={mask}
                        handleChange={handleChange}
                        handleLogin={handleLogin}
                        labelText={labelText}
                    />
                )}
            </div>
            );
        </>

    );
}


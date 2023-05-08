import React, {useState} from 'react';
import axios from "axios";
import RegistrationMobile from "./RegistrationMobile";
import RegistrationDesktop from "./RegistrationDesktop";


export default function Registration() {
    const [labelText, setLabelText] = useState('');
    const [mask, setMask] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    function isValidEmail(email: string) {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    }

    function handleChange(e: { target: { name: any; value: any; }; }) {
        setMask(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = function (e: React.SyntheticEvent) {
        e.preventDefault()
        if (!isValidEmail(mask.email)) {
            setLabelText('Invalid email!');
            return;
        }
        if (mask.password !== mask.confirmPassword) {
            setLabelText('Confirm password is not the same!');
            return;
        }
        axios.post('/api/register', {
            fistname: mask.firstName,
            lastname: mask.lastName,
            email: mask.email,
            password: mask.password,
            confirmPassword: mask.confirmPassword

        })
            .then(function () {
                window.location.href = '/registrationSucceed';
            })
            .catch(function () {
                setLabelText('Connection failed!');
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
                    <RegistrationDesktop
                        mask={mask}
                        handleChange={handleChange}
                        handleLogin={handleSubmit}
                        labelText={labelText}
                    />
                ) : (
                    <RegistrationMobile
                        mask={mask}
                        handleChange={handleChange}
                        handleLogin={handleSubmit}
                        labelText={labelText}
                    />
                )}
            </div>
            );
        </>

    );
}

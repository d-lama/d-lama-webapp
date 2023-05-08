import React from 'react';
import './RegistrationSucceed.css';
import RegistrationSucceedMobile from "./RegistrationSucceedMobile";
import RegistrationSucceedDesktop from "./RegistrationSucceedDesktop";


export default function RegistrationSucceed() {

    const isDesktop = window.innerWidth >= 768;

    return (
        <>
            (
            <div>
                {isDesktop ? (
                    <RegistrationSucceedDesktop
                    />
                ) : (
                    <RegistrationSucceedMobile
                    />
                )}
            </div>
            );
        </>

    );
}

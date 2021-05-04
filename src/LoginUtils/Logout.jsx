import React, { useEffect } from 'react';

export default function Logout ({loginCheck}) {
    useEffect(() => {
        async function logMeOut(){
            await fetch('http://localhost:5000/logout_acc',
            {
                method: 'POST',
                credentials: 'include'
            });
        }
        logMeOut();
        localStorage.clear();
        loginCheck(false);
    }, [loginCheck]);
    return (
        <div>
            <p>You Have Been Logged Out.</p>
        </div>
    )
}
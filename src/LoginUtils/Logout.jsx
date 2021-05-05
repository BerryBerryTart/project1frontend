import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Logout ({loginCheck}) {
    const history = useHistory();

    useEffect(() => {
        async function logMeOut(){
            await fetch('http://localhost:5000/logout_acc',
            {
                method: 'POST',
                credentials: 'include'
            });
        }
        logMeOut()
        .then(() => localStorage.clear())
        .then(() => loginCheck(null))
        .then(() => setTimeout(
            () => {
                history.push('/login');
            }, 500
        ));
    }, [loginCheck, history]);
    return (
        <div>
            <p>You Have Been Logged Out.</p>
        </div>
    )
}
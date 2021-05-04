import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

export default function Login ({loginCheck}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser){
            setLoggedIn(true);
        }
    }, []);

    function handleSubmit(event) {
        event.preventDefault();

        const data = {username, password};
        async function fetchData(){
            const res = await fetch('http://localhost:5000/login_acc', {
                method: 'POST',
                body: JSON.stringify(data),
                credentials: 'include'
            });
            res.json()
            .then(res => localStorage.setItem('user',
            JSON.stringify({
                "username": res.username,
                "first_name": res.first_name,
                "last_name": res.last_name,
                "role": res.role_id.role
            })))
            .catch(() => {setLoginError(true)})
        }
        fetchData()
        .then(() => {
            if (loginError === false){
                loginCheck(true);
                //bodge bodge bodge bodge bodge bodge bodge bodge bodge
                setTimeout(() => history.push("/"), 100);
            }
        });
    }

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    if (loggedIn){
        return <Redirect to='/' />;
    }
    else {
        return(
            <div className="login">
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <input type="submit" value="Submit" disabled={!validateForm()}/>
            </form>
            {loginError && <p className="errorText">Wrong Username / Password</p>}
            </div>
        );
    }


}
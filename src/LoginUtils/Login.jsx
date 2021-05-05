import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login ({loginCheck}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userState, setUserState] = useState({});
    const [loginError, setLoginError] = useState(false);

    const history = useHistory();

    async function resetError(){
        return new Promise((resolve, reject) => {
            if (loginError === true){
                setLoginError(false);
                resolve("ok");
            } else if (loginError === false){
                resolve("ok");
            } else {
                reject("error");
            }
        })
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser){
            history.push('/');
        }
    }, [history]);

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
            .then(res => {
                const data = JSON.stringify({
                    "username": res.username,
                    "first_name": res.first_name,
                    "last_name": res.last_name,
                    "role": res.role_id.role
                });
                localStorage.setItem('user', data);
                setUserState(res);
            })
            .then(() => {
                //bodge bodge bodge bodge bodge bodge bodge bodge bodge
                setTimeout(() => history.push("/"), 100);
            })
            .then(() => {
                loginCheck(userState);
            })
            .catch((error) => setLoginError(true));
        }
        resetError()
        .then(() => fetchData());
    }

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    return(
        <div className="loginBox">
        <div className="login">
        <h3>User Login</h3>
        <br></br>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Username</label>
                <input
                    className="form-control"
                    type="text" value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    className="form-control"
                    type="password" value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="form-group">
                <input
                    className="form-control"
                    type="submit"
                    value="Submit"
                    disabled={!validateForm()}
                />
            </div>
        </form>
        {loginError && <p className="errorText">Wrong Username / Password</p>}
        <a href="/register">Register New User</a>
        </div>
        </div>
    );
}
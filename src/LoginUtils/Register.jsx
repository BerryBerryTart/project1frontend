import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Register(){
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);

    const history = useHistory();

    function validateForm() {
        return (
            first_name.length > 0 &&
            last_name.length > 0 &&
            email.length > 0 &&
            username.length > 0 &&
            password.length > 0
        );
    }

    function handleSubmit(event) {
        event.preventDefault();
        const data={first_name, last_name, email, username, password};
        console.log(JSON.stringify(data));
        async function postData(){
            const res = await fetch('http://localhost:5000/register_acc', {
                method: 'POST',
                body: JSON.stringify(data)
            });
            res.json()
            .then(() => {
                //bodge bodge bodge bodge bodge bodge bodge bodge bodge
                setTimeout(() => history.push("/login"), 100);
            })
            .catch((error) => setLoginError(true));
        }
        postData();
    }

    return(
        <div className="loginBox">
        <div className="login">
        <h3>Register New User</h3>
        <br></br>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>First Name</label>
                <input
                    className="form-control"
                    type="text" value={first_name}
                    onChange={(e) => setFirst_name(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input
                    className="form-control"
                    type="text" value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    className="form-control"
                    type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
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
        {loginError && <p className="errorText">Registration Error</p>}
        </div>
        </div>
    );
}
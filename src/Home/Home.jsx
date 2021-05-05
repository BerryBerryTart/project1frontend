
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Home(){
    const [data, setData] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setData(JSON.parse(loggedInUser));
        } else {
            history.push('/login');
        }
    }, [history]);

    return (
        <p>Welcome {data.first_name} {data.last_name}</p>
    );

}
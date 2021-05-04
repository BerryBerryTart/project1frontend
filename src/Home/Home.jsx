
import React, { useState, useEffect } from 'react';

export default function Home(){
    const [data, setData] = useState();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setData(JSON.parse(loggedInUser));
        }
    }, []);

    if (data){
        return (
            <p>Welcome {data.first_name} {data.last_name}</p>
        );
    } else {
        return (
            <p>Please Log In.</p>
        );
    }
}
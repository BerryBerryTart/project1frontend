import {useParams} from "react-router-dom";
import React, { useState, useEffect } from 'react';

export default function ReceiptView () {
    let {id} = useParams();
    const [data, setData] = useState("");

    useEffect(() => {
        async function fetchData(){
            const res = await fetch('http://localhost:5000/ticket_blob/' + id, {
                method: 'GET',
                credentials: 'include'
            });
            res
                .json()
                .then(res => setData(res))
        }
        fetchData();
    }, [id]);

    return(
        <div>
            {data && <img src={"data:image/jpg; base64, " + data}/>}
        </div>
    );
}
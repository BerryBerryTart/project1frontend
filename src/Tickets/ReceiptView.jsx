import { useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import FormatAmount from '../Utils/FormatAmount';
import FormatDate from '../Utils/FormatDate';

export default function ReceiptView () {
    let {id} = useParams();
    const [blobData, setBlobData] = useState("");
    const [ticketData, setTicketData] = useState({});

    const history = useHistory();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser){
            async function fetchData(){
                const res = await fetch('http://localhost:5000/ticket_blob/' + id, {
                    method: 'GET',
                    credentials: 'include'
                });
                res.json()
                .then(res => setBlobData(res));

                const res1 = await fetch('http://localhost:5000/get_ticket_status/' + id, {
                    method: 'GET',
                    credentials: 'include'
                });
                res1.json()
                .then(res1 => setTicketData(res1));
            }
            fetchData();
        } else {
            history.push('/login');
        }
    }, [id, history]);

    console.log(ticketData)
    return(
        <div className="ticketBox">
            { ticketData.type_id && ticketData.status_id &&
            <div className="ticketTable">
                <ul className="list-group">
                    <li className="list-group-item"><b>Description: </b> {ticketData.description}</li>
                    <li className="list-group-item"><b>Amount: </b><FormatAmount amount={ticketData.amount} /></li>
                    <li className="list-group-item"><b>Type: </b>{ticketData.type_id.type}</li>
                    <li className="list-group-item"><b>Status: </b>{ticketData.status_id.status}</li>
                    <li className="list-group-item"><b>Submitted: </b><FormatDate created={ticketData.submitted} /></li>
                    <li className="list-group-item"><b>Resolved: </b><FormatDate created={ticketData.resolved} /></li>
                    <li className="list-group-item"><b>Resolved By: </b></li>
                </ul>
            </div>
            }
            <div className="receiptImage">
                {blobData && <img alt="receipt" id="receiptImg" src={"data:image/jpg; base64, " + blobData}/>}
            </div>
        </div>
    );
}




import { useState, useEffect } from 'react';
import TicketTableFragment from './TicketTableFragment';

export default function TicketList(){
    const [data, setData] = useState({"Reimbursements": []});
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        async function fetchData(){
            const res = await fetch('http://localhost:5000/get_ticket_status',{
                method: 'GET',
                credentials: 'include'
            })
            res.json()
            .then(res => setData(res));
        }
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser){
            setLoggedIn(true);
            fetchData();
        }
    }, []);

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Submitted</th>
                        <th>Resolved</th>
                        <th>Resolved By</th>
                        <th>Receipt</th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.Reimbursements &&
                    data.Reimbursements.map((element, index) => (
                        <TicketTableFragment ticket={element} index={index} />
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TicketTableFragment from './TicketTableFragment';

export default function TicketList(){
    const [data, setData] = useState({"Reimbursements": []});
    const [filterState, setFilterState] = useState("ALL");

    const history = useHistory();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser){
            async function fetchData(){
                const res = await fetch('/get_ticket_status',{
                    method: 'GET',
                    credentials: 'include'
                })
                res.json()
                .then(res => setData(res));
            }
            fetchData();
        } else {
            history.push('/login');
        }
    }, [history]);

    function handleFilterClick(value){
        setFilterState(value);
    }

    let filterTickets = [];
    if(filterState !== 'ALL'){
        filterTickets = data.Reimbursements.filter(item => item.status_id.status === filterState)
        console.log(filterTickets);
    } else {
        filterTickets = data.Reimbursements;
    }

    return(
        <div>
            <h2>Your Tickets</h2>
            <div className='filterBox'>
                <div className='dropdown'>
                    <button
                        className='btn btn-secondary dropdown-toggle'
                        type='button'
                        id='dropdownMenu2'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'
                    >Filter By</button>
                    <div className='dropdown-menu'>
                        <button className='dropdown-item' type='button'
                            onClick={() => { handleFilterClick("ALL") }}>ALL</button>
                        <button className='dropdown-item' type='button'
                            onClick={() => { handleFilterClick("PENDING") }}>PENDING</button>
                        <button className='dropdown-item' type='button'
                            onClick={() => { handleFilterClick("COMPLETED") }}>COMPLETED</button>
                        <button className='dropdown-item' type='button'
                            onClick={() => { handleFilterClick("REJECTED") }}>REJECTED</button>
                    </div>
                </div>
            </div>
            <table className="table table-striped">
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
                    filterTickets.map((element, index) => (
                        <TicketTableFragment ticket={element} key={index} />
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}
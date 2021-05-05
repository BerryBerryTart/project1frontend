import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import React, { useState, useEffect } from 'react';

import './App.css';

import Login from './LoginUtils/Login';
import Logout from './LoginUtils/Logout';
import Register from './LoginUtils/Register';

import Home from './Home/Home';

import TicketList from './Tickets/TicketList';
import ReceiptView from './Tickets/ReceiptView';
import CreateTicket from './Tickets/CreateTicket';
import AdminTicketList from './Tickets/AdminTicketList';
import AdminReceiptView from './Tickets/AdminReceiptView';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser){
            setLoggedIn(JSON.parse(loggedInUser));
        }
    }, []);

    const getLoginStatus = (val) => {
        if (val != null){
            const loggedInUser = localStorage.getItem('user');
            //JUST in case
            if (loggedInUser){
                setLoggedIn(JSON.parse(loggedInUser));
            }
        } else {
            setLoggedIn(null);
        }
    }

  return (
    <div className="App">
        <Router>
            {
                loggedIn &&
                <div >
                    <div id="navBox">
                        <div id="mainNav">
                            <Link className="navElement" to="/">Home</Link>
                            <Link className="navElement" to="/tickets">Your Tickets</Link>
                            <Link className="navElement" to="/create_ticket">New Ticket</Link>
                            {
                                loggedIn.role === "MANAGER" &&
                                <Link className="navElement" to="/all_tickets">All Tickets</Link>
                            }
                        </div>
                        <div id="logout">
                            <Link  className="navElement" to="/logout">Logout</Link>
                        </div>
                    </div>
                     <hr id="navDivider"></hr>
                 </div>
             }
             <div id="appBody">
             <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/login">
                    <Login loginCheck={getLoginStatus}/>
                </Route>
                <Route exact path="/logout">
                    <Logout loginCheck={getLoginStatus}/>
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                 <Route exact path="/register">
                     <Register />
                 </Route>
                 <Route exact path="/tickets">
                     <TicketList />
                 </Route>
                 <Route exact path="/tickets/receipt/:id">
                     <ReceiptView />
                 </Route>
                 <Route exact path="/create_ticket">
                     <CreateTicket />
                 </Route>
                 <Route exact path="/all_tickets">
                     <AdminTicketList />
                 </Route>
                 <Route exact path="/all_tickets/receipt/:id">
                     <AdminReceiptView />
                 </Route>
             </Switch>
             </div>
         </Router>
    </div>
  );
}

export default App;

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

import Home from './Home/Home';

import TicketList from './Tickets/TicketList';
import ReceiptView from './Tickets/ReceiptView';
import CreateTicket from './Tickets/CreateTicket';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser){
            setLoggedIn(true);
        }
    }, []);

    const getLoginStatus = (val) => {
        if (val === true){
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }

  return (
    <div className="App">
        <Router>
            <div id="navBox">
                 <Link className="navElement" to="/">Home</Link>
                 <Link className="navElement" to="/tickets">All Tickets</Link>
                 <Link className="navElement" to="/create_ticket">New Ticket</Link>
                 {
                     loggedIn === true &&
                     <Link className="navElement" to="/logout">Logout</Link>
                 }
                 {
                     loggedIn === false &&
                     <Link className="navElement" to="/login">Login</Link>
                 }
             </div>
             <hr />
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
             </Switch>
         </Router>
    </div>
  );
}

export default App;

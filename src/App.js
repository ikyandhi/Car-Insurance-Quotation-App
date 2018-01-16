import React, { Component } from 'react';
import { setSessionID } from './components/SessionService';
import { login, isLoggedIn } from './components/AuthService';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import Profile from './components/Profile';
import Calc from './components/Calc';
import Summary from './components/Summary';
import DashNav from './components/DashNav';
import Dash from './components/Dash';
import Callback from './components/Callback';

const Footer = (props) => (<footer>
    <div className="columns">
        <div className="column col-xs-12">
            <p className="text-center">v1.0 &copy; {props.yy}</p>
            {isLoggedIn() ? '' : <p className="text-center"><button onClick={() => login()}>Login Admin</button></p> }
            
        </div>
    </div>
</footer>);

class App extends Component {
    
    componentDidMount() {
        setSessionID();
    }
    
    render() {
        console.log(this.state);
        return (
                <Router>
                    <div className="App">
                        {isLoggedIn() ? <DashNav/> : ''}
                        <div className="container-fluid">
                            <Route exact path="/" component={Profile}/>
                            <Route path="/calc" component={Calc}/>
                            <Route path="/summary" component={Summary}/>
                            <Route path="/callback" component={Callback}/>
                            <Route path="/dash" component={Dash}/>
                        <Footer yy={new Date().getYear() + 1900}/>
                        </div>
                    </div>
                </Router>
                );
    }
};

export default App;

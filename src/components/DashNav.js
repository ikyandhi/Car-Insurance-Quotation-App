import React, { Component } from 'react';
import { logout } from './AuthService';
import { Link } from 'react-router-dom';

class DashNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 0
        };

        this.handleDataChange = this.handleDataChange.bind(this);
    }

    handleDataChange(e) {
        e.preventDefault();
        this.setState({data: e.target.value});
    }
    render() {
        return (
                <div className="App">
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <Link to="/" className="navbar-brand">Car Insurance App</Link>
                            </div>

                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav navbar-right">
                                    <li><Link to="/dash">Dashboard</Link></li>
                                    <li><a className="disabled">Quotation Report</a></li>
                                    <li><a className="disabled">Purchase Report</a></li>
                                    <li><a className="disabled">Policy Report</a></li>
                                    <li>
                                        <form className="navbar-form navbar-right">
                                            <button className="btn btn-default" onClick={() => logout()}><i className="fa fa-sign-out"></i> Log out</button>
                                        </form>                            
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>                
                </div>);
    }
}

export default DashNav;
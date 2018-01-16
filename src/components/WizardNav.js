import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

class WizardNav extends Component {
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
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2 wizardNav">
                        <div className="text-center">
                            <ul className="list-unstyled list-inline">
                                <li><NavLink exact
                                    to="/"
                                    activeClassName="active"
                                    className="btn btn-default"
                                    >Profile</NavLink></li>
                                <li><NavLink exact
                                    to="/calc" 
                                    activeClassName="active"
                                    className="btn btn-default"
                                    >Car Information</NavLink></li>
                                <li><NavLink exact
                                    to="/summary"
                                    activeClassName="active"
                                    className="btn btn-default"
                                    >Summary</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
                );
    }
}

export default WizardNav;

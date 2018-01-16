import React, { Component } from 'react';
import { appendData, fetchData } from '../components/SessionService';
import { getValidator } from '../components/Helper';
import WizardNav from '../components/WizardNav';
import { FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import '../App.css';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            identityNumber: "",
            fullname: "",
            email: "",
            mobile: "",
            validation: {
                fullname: ['required'],
                identityNumber: ['required'],
                email: ['required', 'email'],
                mobile: ['required']
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleInputChange(e) {
        e.preventDefault();
        const name = e.target.name;

        this.setState({[name]: e.target.value});
    }

    componentWillMount() {
        const profileData = fetchData('profile');

        for (let key of Object.keys(profileData)) {
            this.setState({[key]: profileData[key]});
        }
    }

    handleSubmit(e) {
        let inputs = {
            identityNumber: this.state.identityNumber,
            fullname: this.state.fullname,
            email: this.state.email,
            mobile: this.state.mobile
        };

        const validation = getValidator(inputs, this.state.validation);

        if (validation.length > 0) {
            let error = validation.pop();
            alert(error.message);
            return;
        }

        appendData('profile', inputs);
        window.location.replace("/calc");
    }

    render() {
        return (
                <div className="App">
                    <WizardNav/>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="page-header">
                                <h3 className="text-center"> Let's start with the basic details. </h3>
                            </div>
                        </div>
                        <div className="jumbotron col-sm-8 col-sm-offset-2">
                            <form className="form-horizontal">
                                <FormGroup
                                    controlId="formBasicText"
                                    >
                                    <ControlLabel className="col-sm-4">Your Fullname <span className="form-required bold" title="This field is required.">*</span></ControlLabel>
                                    <div className="col-sm-8">
                                        <FormControl
                                            type="text"
                                            value={this.state.fullname}
                                            placeholder="John Doe"
                                            onChange={this.handleInputChange}
                                            name="fullname"
                                            />
                                    </div>
                                </FormGroup>
                                <FormGroup
                                    controlId="formBasicText"
                                    >
                                    <ControlLabel className="col-sm-4">NRIC/Passport No. <span className="form-required bold" title="This field is required.">*</span></ControlLabel>
                                    <div className="col-sm-8">
                                        <FormControl
                                            type="text"
                                            value={this.state.identityNumber}
                                            placeholder="851117123456"
                                            onChange={this.handleInputChange}
                                            name="identityNumber"
                                            />
                                    </div>
                                </FormGroup>
                                <FormGroup
                                    controlId="formBasicText"
                                    >
                                    <ControlLabel className="col-sm-4">Email Address <span className="form-required bold" title="This field is required.">*</span></ControlLabel>
                                    <div className="col-sm-8">
                                        <FormControl
                                            type="email"
                                            value={this.state.email}
                                            placeholder="John Doe"
                                            onChange={this.handleInputChange}
                                            name="email"
                                            />
                                    </div>
                                </FormGroup>
                                <FormGroup
                                    controlId="formBasicText"
                                    >
                                    <ControlLabel className="col-sm-4">Mobile Number <span className="form-required bold" title="This field is required.">*</span></ControlLabel>
                                    <div className="col-sm-8">
                                        <FormControl
                                            type="text"
                                            value={this.state.mobile}
                                            placeholder="John Doe"
                                            onChange={this.handleInputChange}
                                            name="mobile"
                                            />
                                    </div>
                                </FormGroup>
                                <button type="button" className="btn btn-primary pull-right" onClick={this.handleSubmit.bind(this)} >Save &amp; Continue</button>
                            </form>
                        </div>
                    </div>
                </div>);
    }
}

export default Profile;

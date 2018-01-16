import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import { appendData, fetchData } from '../components/SessionService';
import WizardNav from '../components/WizardNav';
import { getValidator } from '../components/Helper';
import '../App.css';

const coverageType = {
    'comprehensive': 'Comprehensive',
    'third_party': 'Third Party'
};

const locationType = {
    'area1': 'Semenanjung',
    'area2': 'Sabah/Sarawak'
};

const engineCapacityType = {
    'cc1': '0-1400cc',
    'cc2': '1401-1650cc',
    'cc3': '1651-2200cc'
};

const DATA_KEY = "factors";

class Calc extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coverageType: coverageType,
            locationType: locationType,
            engineCapacityType: engineCapacityType,
            coverageTypeValue: null,
            locationTypeValue: null,
            engineCapacityTypeValue: null,
            marketPrice: 500,
            vehicleNumber: "",
            validation: {
                vehicleNumber: ['required'],
                marketPrice: ['required', 'numeric'],
                coverageTypeValue: ['required'],
                locationTypeValue: ['required'],
                engineCapacityTypeValue: ['required']
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        const carData = fetchData(DATA_KEY);

        for (let key of Object.keys(carData)) {
            this.setState({[key]: carData[key]});
        }

    }

    handleInputChange(e) {
        e.preventDefault();
        const name = e.target.name;
        this.setState({[name]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        const inputs = {
            vehicleNumber: this.state.vehicleNumber,
            marketPrice: this.state.marketPrice,
            coverageTypeValue: this.state.coverageTypeValue,
            locationTypeValue: this.state.locationTypeValue,
            engineCapacityTypeValue: this.state.engineCapacityTypeValue
        };

        const validation = getValidator(inputs, this.state.validation);

        if (validation.length > 0) {
            let error = validation.pop();
            alert(error.message);
            return;
        }

        appendData(DATA_KEY, inputs);
        window.location.replace("/summary");
    }

    render() {
        return (
                <div className="App">
                    <WizardNav/>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="page-header">
                                <h3 className="text-center"> What type of Coverage Location and Car? </h3>
                            </div>
                        </div>
                        <div className="jumbotron col-sm-8 col-sm-offset-2">
                            <div className="row">
                                <form className="form-horizontal">
                                    <FormGroup
                                        controlId="formBasicText"
                                        >
                                        <ControlLabel className="col-sm-4">Market Price <span className="form-required bold" title="This field is required.">*</span></ControlLabel>
                                        <div className="col-sm-8">
                                            <FormControl
                                                type="text"
                                                value={this.state.marketPrice}
                                                placeholder="10000"
                                                onChange={this.handleInputChange}
                                                name="marketPrice"
                                                />
                                        </div>
                                    </FormGroup>
                                    <FormGroup
                                        controlId="formBasicText"
                                        >
                                        <ControlLabel className="col-sm-4">Vehicle Number <span className="form-required bold" title="This field is required.">*</span></ControlLabel>
                                        <div className="col-sm-8">
                                            <FormControl
                                                type="text"
                                                value={this.state.vehicleNumber}
                                                placeholder="VAT123"
                                                onChange={this.handleInputChange}
                                                name="vehicleNumber"
                                                />
                                        </div>
                                    </FormGroup>
                                    <FormGroup
                                        controlId="formBasicText"
                                        >
                                        <ControlLabel className="col-sm-4">Coverage Type <span className="form-required bold" title="This field is required.">*</span></ControlLabel>
                                        <div className="col-sm-8">
                                            <FormControl componentClass="select" placeholder="select"
                                                         onChange={this.handleInputChange}
                                                         name="coverageTypeValue"
                                                         defaultValue={this.state.coverageTypeValue || ""}
                                                         >
                                                <option value="">Select Coverage Type</option>
                                                {Object.keys(this.state.coverageType).map(coverageKey => <option key={coverageKey} value={coverageKey}>{this.state.coverageType[coverageKey]}</option>)}
                                            </FormControl>

                                        </div>
                                    </FormGroup>
                                    <FormGroup
                                        controlId="formBasicText"
                                        >
                                        <ControlLabel className="col-sm-4">Location <span className="form-required bold" title="This field is required.">*</span></ControlLabel>
                                        <div className="col-sm-8">
                                            <FormControl componentClass="select" placeholder="select"
                                                         onChange={this.handleInputChange}
                                                         defaultValue={this.state.locationTypeValue || ""}
                                                         name="locationTypeValue"
                                                         >
                                                <option value="">Select Location</option>
                                                {Object.keys(this.state.locationType).map(locationKey => <option key={locationKey} value={locationKey}>{this.state.locationType[locationKey]}</option>)}
                                            </FormControl>
                                        </div>
                                    </FormGroup>
                                    <FormGroup
                                        controlId="formBasicText"
                                        >
                                        <ControlLabel className="col-sm-4">Engine Capacity <span className="form-required bold" title="This field is required.">*</span></ControlLabel>
                                        <div className="col-sm-8">
                                            <FormControl componentClass="select" placeholder="select"
                                                         onChange={this.handleInputChange}
                                                         defaultValue={this.state.engineCapacityTypeValue || ""}
                                                         name="engineCapacityTypeValue"
                                                         >
                                                <option value="">Select Engine Capacity</option>
                                                {Object.keys(this.state.engineCapacityType).map(engineCapacityKey => <option key={engineCapacityKey} value={engineCapacityKey}>{this.state.engineCapacityType[engineCapacityKey]}</option>)}
                                            </FormControl>
                                        </div>
                                    </FormGroup>
                                    <div className="form-group">
                                        <div className="col-sm-offset-4 col-sm-8">
                                            <div className="pull-right">
                                                <button type="button" className="btn btn-default" onClick={this.handleSubmit.bind(this)} >Back</button> &nbsp;
                                                <button type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)} >Save &amp; Continue</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <p className="text-center">Note : For private cars that are individually registered only. <br/>For roadside assistance request, please contact 8888-88-8888.</p>
                        </div>
                    </div>
                </div>);
    }
}

export default Calc;

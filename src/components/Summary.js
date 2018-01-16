import React, { Component } from 'react';
import { fetchData, getSessionID } from '../components/SessionService';
import WizardNav from '../components/WizardNav';
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

const coverageFactor = {
    'comprehensive': 0.10,
    'third_party': 0.15
};

const locationFactor = {
    'area1': 0.12,
    'area2': 0.20
};

const enginCapacityFactor = {
    'cc1': {
        'base_yearly': 507.80,
        'next_thousand': 26
    },
    'cc2': {
        'base_yearly': 539.50,
        'next_thousand': 26
    },
    'cc3': {
        'base_yearly': 573.10,
        'next_thousand': 26
    }
};

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

class Summary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            baseCurrency: "MYR",
            formData: {},
            coverageType: coverageType,
            locationType: locationType,
            engineCapacityType: engineCapacityType,
            firstName: "",
            today: new Date(),
            expiryAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            grandTotal: 0,
            sessionID: getSessionID()
        };

        this.handleDataChange = this.handleDataChange.bind(this);
    }

    componentWillMount() {
        console.log("componentWillMount");
        const formData = fetchData();

        if (!formData.profile || !formData.factors) {
            window.location.replace("/");
        }

        const arrFullname = formData.profile.fullname.split(" ");

        formData.factors.marketPrice = parseFloat(formData.factors.marketPrice);

        this.setState({formData: formData});
        this.setState({firstName: arrFullname[0]});
    }

    componentDidMount() {
        let grandTotal = 0;
        let baseTotal = 0;
        let factors = this.state.formData.factors;

        let f1 = coverageFactor[factors.coverageTypeValue];
        let f2 = locationFactor[factors.locationTypeValue];
        let itemEnginCapacityFactor = enginCapacityFactor[factors.engineCapacityTypeValue];

        baseTotal = itemEnginCapacityFactor.base_yearly;

        let nThousand = (parseFloat(factors.marketPrice) - 10000) / 1000;
        baseTotal += nThousand > 0 ? (nThousand * itemEnginCapacityFactor.next_thousand) : 0;
        grandTotal = baseTotal + (baseTotal * f1);
        grandTotal += (baseTotal * f2);

        this.setState({grandTotal: parseFloat(Number(grandTotal).toFixed(2))});

    }

    handleDataChange(e) {
        e.preventDefault();
        this.setState({data: e.target.value});
    }
    
    handleSendQuoteSummaryEmail(e){
        e.preventDefault();
        alert("Quote summary email has been sent to " + this.state.formData.profile.email);
    }

    handleSendQuoteSummaryLinkMobile(e){
        e.preventDefault();
        alert("Quote summary sms has been sent to " + this.state.formData.profile.mobile);
    }

    render() {
        return (
                <div className="App">
                    <WizardNav/>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="page-header">
                                <h3 className="text-center"> Last step to own your free headache policy. </h3>
                            </div>
                        </div>

                        <div className="col-sm-10 col-sm-offset-1">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                            <p className="pLabel">Quote ID:</p>
                                            <p>{this.state.sessionID}</p>
                                            <hr/>
                                            <p className="pLabel">Fullname:</p>
                                            <p>{this.state.formData.profile.fullname}</p>
                                            <p className="pLabel">NRIC/Passport No.:</p>
                                            <p>{this.state.formData.profile.identityNumber}</p>
                                            <p className="pLabel">Email Address:</p>
                                            <p>{this.state.formData.profile.email}</p>
                                            <p className="pLabel">Mobile Number:</p>
                                            <p>{this.state.formData.profile.mobile}</p>
                                            <hr/>
                                            <dl className="dl-horizontal">
                                                <dt className="text-left">Market Price (MYR):</dt>
                                                <dd>{this.state.formData.factors.marketPrice}</dd>
                                                <dt className="text-left">Vehicle Number:</dt>
                                                <dd>{this.state.formData.factors.vehicleNumber}</dd>
                                                <dt className="text-left">Coverage Type:</dt>
                                                <dd>{this.state.coverageType[this.state.formData.factors.coverageTypeValue]}</dd>
                                                <dt className="text-left">Location Type:</dt>
                                                <dd>{this.state.locationType[this.state.formData.factors.locationTypeValue]}</dd>
                                                <dt className="text-left">Engine Capacity Type:</dt>
                                                <dd>{this.state.engineCapacityType[this.state.formData.factors.engineCapacityTypeValue]}</dd>
                                            </dl>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-8">
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                            <h3 className="cLabel">Congratulation {this.state.firstName}!</h3>
                                            <p>Your quotation of Car Insurance is now ready. Just a step behind of getting it. Insurance Company is the best partner on the road and will protect you and your car all day 24/7 for 365 days.</p>

                                            <div className="row planDetail">
                                                <div className="col-sm-4">
                                                    <p className="pLabel">Plan Name</p>
                                                    <h4>Advance Protection</h4>
                                                </div>
                                                <div className="col-sm-4">
                                                    <p className="pLabel">From</p>
                                                    <h4>{monthNames[this.state.today.getMonth() + 1]} {this.state.today.getDate()}, {this.state.today.getFullYear()}</h4>
                                                </div>
                                                <div className="col-sm-4">
                                                    <p className="pLabel">To</p>
                                                    <h4>{monthNames[this.state.expiryAt.getMonth() + 1]} {this.state.expiryAt.getDate()}, {this.state.expiryAt.getFullYear()}</h4>
                                                </div>
                                            </div>                
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-7 sendAlternative">
                                            <p><i className="fa fa-envelope-o"></i> <a href="" onClick={this.handleSendQuoteSummaryEmail.bind(this)}>Send quote summary to my email</a></p>
                                            <p><i className="fa fa-mobile"></i> <a href="" onClick={this.handleSendQuoteSummaryLinkMobile.bind(this)}>Send sms of quote link to my phone</a></p>
                                            <p><i className="fa fa-phone"></i> <a href="" onClick={this.handleSendQuoteSummaryLinkMobile.bind(this)}>Contact agent for further question</a></p>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="totalSummary">
                                                <h3 className="text-right"><span className="tLabel">Total : </span>{this.state.baseCurrency} {this.state.grandTotal.toLocaleString()}</h3>
                                                <h5 className="text-right">6% GST Included</h5>
                                                <h5 className="text-right">0% Service Charge Included</h5>
                                            </div>
                                            <div className="checkoutCTA text-center">
                                                <button className="btn btn-success btn-lg btn-block">Pay Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>);
    }
}

export default Summary;

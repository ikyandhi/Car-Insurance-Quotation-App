import React, { Component } from 'react';
import { isLoggedIn } from './AuthService';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { VictoryChart, VictoryAxis, VictoryBar, VictoryTooltip, VictoryVoronoiContainer } from 'victory';
import '../App.css';

const MOCK_QUOTES_SUMMARY_JSON = 'quotes_summary_7d.json';

class Dash extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quoteData: false,
            quoteChartXTick: false,
            quoteChartXTickValues: false
        };
    }

    componentWillMount() {

        if (!isLoggedIn()) {
            window.location.replace("/");
        }
    }

    componentDidMount() {
        this.fetchQuoteSummary();
    }

    fetchQuoteSummary() {

        let data = false;
        axios.get(MOCK_QUOTES_SUMMARY_JSON)
                .then(res => {
                    let resData = res.data;
                    let quoteChartXTick = [];
                    let quoteChartXTickValues = [];

                    if (resData.data.items.length > 0) {

                        let items = resData.data.items;

                        for (let i = 0; i < items.length; i++) {
                            let dt = new Date(items[i]['date']);
                            quoteChartXTick.push(dt.getDate() + "/" + parseInt(dt.getMonth() + 1));
                            quoteChartXTickValues.push(items[i]['date']);
                        }

                        this.setState({quoteData: items});
                        this.setState({quoteChartXTick: quoteChartXTick});
                        this.setState({quoteChartXTickValues: quoteChartXTickValues});
                    }
                })
                .catch(err => {
                    console.log(err);
                });

        return data;
    }

    render() {
        return (
                <div className="App">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="page-header">
                                <h3 className="text-left"> Dashboard </h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <section className="panel panel-primary">
                                <header className="panel-heading">
                                    <h3 className="panel-title text-center">Last 7 days of Quotes Summary</h3>
                                </header>
                                <div className="panel-body">
                                {(this.state.quoteData && this.state.quoteChartXTick.length > 0 && this.state.quoteChartXTickValues.length > 0) ?
                                    <VictoryChart domainPadding={20} containerComponent={<VictoryVoronoiContainer dimension="x" labels={(d) => `${d.count}`} labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{ fill: "white" }} />} />}>

                                        <VictoryAxis
                                            tickValues={this.state.quoteChartXTickValues}
                                            tickFormat={this.state.quoteChartXTick}
                                            label="Date (DD/MM)"
                                            style={{ axisLabel: { fontSize: 10 }, tickLabels: { fontSize: 10 }, axis: { strokeWidth: 1, stroke: "#efefef" } }}/>

                                            <VictoryAxis dependentAxis label="Number of Quote" style={{
                                                                                                grid: {
                                                                                                        stroke: (tick) =>
                                                                                                                tick === -10 ? "transparent" : "#efefef",
                                                                                                        strokeWidth: 1
                                                                                                },
                                                                                                axis: { strokeWidth: 0 },
                                                                                                ticks: { strokeWidth: 0 },
                                                                                                axisLabel: { fontSize: 10 },
                                                                                                tickLabels: { fontSize: 0 }
                                                                                        }}/>

                                            <VictoryAxis dependentAxis orientation="right" style={{ tickLabels: { fontSize: 10, fill: "#aaa" }, axis: { strokeWidth: 0 } }} />

                                            <VictoryBar
                                                data={this.state.quoteData}
                                                x="date"
                                                y="count"
                                                interpolation="natural"
                                                style={{ data: { stroke: "black", fill: "#5277bb" }, parent: { border: "1px solid #ccc" } }}
                                            />
                                    </VictoryChart> : ''}                
                                </div>
                            </section>
                        </div>
                        <div className="col-sm-6">
                            <section className="panel panel-primary">
                                <header className="panel-heading">
                                    <h3 className="panel-title text-center">Last 10 Quotes</h3>
                                </header>
                                <div className="panel-body">                        
                                    <Table striped bordered condensed hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Fullname</th>
                                                <th>Location</th>
                                                <th>Cost Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>John Doe</td>
                                                <td>Semenanjung</td>
                                                <td>MYR 1,510.80</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>John Doe</td>
                                                <td>Semenanjung</td>
                                                <td>MYR 1,510.80</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>John Doe</td>
                                                <td>Semenanjung</td>
                                                <td>MYR 1,510.80</td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>John Doe</td>
                                                <td>Semenanjung</td>
                                                <td>MYR 1,510.80</td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>John Doe</td>
                                                <td>Semenanjung</td>
                                                <td>MYR 1,510.80</td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>John Doe</td>
                                                <td>Semenanjung</td>
                                                <td>MYR 1,510.80</td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>John Doe</td>
                                                <td>Semenanjung</td>
                                                <td>MYR 1,510.80</td>
                                            </tr>
                                            <tr>
                                                <td>8</td>
                                                <td>John Doe</td>
                                                <td>Semenanjung</td>
                                                <td>MYR 1,510.80</td>
                                            </tr>
                                            <tr>
                                                <td>9</td>
                                                <td>John Doe</td>
                                                <td>Semenanjung</td>
                                                <td>MYR 1,510.80</td>
                                            </tr>
                                            <tr>
                                                <td>10</td>
                                                <td>John Doe</td>
                                                <td>Semenanjung</td>
                                                <td>MYR 1,510.80</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>);
    }
}

export default Dash;
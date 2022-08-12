import React, {Component} from 'react';
import ManagersNavBar from "../../ManagersNavBar";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css"
import './AllFares.css'

class Fares extends Component {
    constructor() {
        super();
        this.state = {
            journeys: [],
            expressJourneys: []
        }
    }

    componentDidMount() {
        this.loadJourneys();
        this.loadExpressJourneys();
    }

    loadJourneys(){
        axios.get('http://localhost:5000/journey')
            .then(res => this.setState({ journeys: res.data }))
            .catch(err => console.log(err))
        console.log(this.state.journeys);
    }

    loadExpressJourneys(){
        axios.get('http://localhost:5000/express')
            .then(res => this.setState({ expressJourneys: res.data }))
            .catch(err => console.log(err))
        console.log(this.state.expressJourneys);
    }

    render() {
        return (
            <div className="image-bg-af">
                <ManagersNavBar/>
                <div className="all-fares-header">
                    <br/>
                    <h1 className="mt-1 mb-5">Fare Statistics</h1>
                    <div className="row">
                        <div className="col-3">
                            <div className="row">
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <h3 className="mt-1 mb-5 text-light" align="center">Normal Journey Fare Statistics Table</h3>
                <div className="container">
                    <table className="table table-dark table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Account Number</th>
                            <th scope="col">Token ID</th>
                            <th scope="col">Journey Date</th>
                            <th scope="col">Fare</th>
                        </tr>
                        </thead>
                        <tbody style={{backgroundColor:"#A09D9C"}}>
                        {this.state.journeys.map(journey => (
                            <tr key={journey._id}>
                                <td>{journey.accNo}</td>
                                <td>{journey.tokenID}</td>
                                <td>{journey.jDate.substring(0, 10)}</td>
                                <td>{journey.fare}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <br/>
                <hr/>
                <h3 className="mt-1 mb-5 text-light" align="center">Expressway Fare Statistics Table</h3>
                <div className="container">
                    <table className="table table-dark table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Account Number</th>
                            <th scope="col">Token ID</th>
                            <th scope="col">Journey Date</th>
                            <th scope="col">Fare</th>
                        </tr>
                        </thead>
                        <tbody style={{backgroundColor:"#A09D9C"}}>
                        {this.state.expressJourneys.map(journey => (
                            <tr key={journey._id}>
                                <td>{journey.accNo}</td>
                                <td>{journey.tokenID}</td>
                                <td>{journey.jDate.substring(0, 10)}</td>
                                <td>{journey.fare}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <br/><br/><br/><br/>
                </div>
            </div>
        );
    }
}

export default Fares;

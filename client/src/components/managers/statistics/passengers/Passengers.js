import React, {Component} from 'react';
import ManagersNavBar from "../../ManagersNavBar";
import axios from 'axios';
import './Passengers.css';
import ReactToPrint from 'react-to-print';
import PassengersTable from "./PassengersTable";

class Passengers extends Component {
    constructor() {
        super();
        this.state = {
            journeys: [],
            expressJourneys: [],
            searchBy: 'loc',
            filteredJourneys: undefined,
            isSearchedByLoc: false,
            isSearchedByDay: false,
            isSearchedByTime: false
        }
    }

    componentDidMount() {
        this.loadJourneys();
        this.loadExpressJourneys();
    }

    loadJourneys = () => {
        axios.get('/journey')
            .then(res => {
                this.setState({ journeys: res.data })
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }

    loadExpressJourneys = () => {
        axios.get('/express')
            .then(res => {
                this.setState({expressJourneys: res.data})
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }

    onChangeSearchBy = e => this.setState({ searchBy: e.target.value })

    onChangeTime = e => this.setState({ time: e.target.value })

    onChangeDay = e => this.setState({ day: e.target.value })

    onChangeLocation = e => this.setState({ location: e.target.value })

    onClickSearch = () => {
        if (this.state.searchBy === 'loc') { //when user tries to search by location

            // if user has searched by location previously or if this is the 1st time searching is being done, filter all journeys
            if (this.state.isSearchedByLoc || (!this.state.isSearchedByLoc && !this.state.isSearchedByDay && !this.state.isSearchedByTime)){
                this.setState({
                    filteredJourneys: this.state.journeys.filter(j =>
                        j.startPoint.toLowerCase() === this.state.location.toLowerCase() || j.desPoint.toLowerCase() === this.state.location.toLowerCase()
                    )
                })
            // if user haven't searched by location previously but have searched by day or time filter previously filtered journeys
            } else if (this.state.isSearchedByDay || this.state.isSearchedByTime) {
                this.setState({
                    filteredJourneys: this.state.filteredJourneys.filter(j =>
                        j.startPoint.toLowerCase() === this.state.location.toLowerCase() || j.desPoint.toLowerCase() === this.state.location.toLowerCase()
                    )
                })
            }
            this.setState({ isSearchedByLoc: true })

        } else if (this.state.searchBy === 'day') { //when user tries to search by day

            // if user has searched by day previously or if this is the 1st time searching is being done, filter all journeys
            if (this.state.isSearchedByDay || (!this.state.isSearchedByLoc && !this.state.isSearchedByDay && !this.state.isSearchedByTime)){
                this.setState({
                    filteredJourneys: this.state.journeys.filter(j => new Date(j.jDate).getDay().toString() === this.state.day)
                })
            // if user haven't searched by day previously but have searched by location or time filter previously filtered journeys
            } else if (this.state.isSearchedByLoc || this.state.isSearchedByTime) {
                this.setState({
                    filteredJourneys: this.state.journeys.filter(j => new Date(j.jDate).getDay().toString() === this.state.day)
                })
            }
            this.setState({ isSearchedByDay: true })

        } else if (this.state.searchBy === 'time'){ //when user tries to search by time

            // if user has searched by time previously or if this is the 1st time searching is being done, filter all journeys
            if (this.state.isSearchedByTime || (!this.state.isSearchedByLoc && !this.state.isSearchedByDay && !this.state.isSearchedByTime)){
                this.setState({
                    filteredJourneys: this.state.journeys.filter(j =>  j.jTime.substring(11, 16) === this.state.time)
                })
            // if user haven't searched by time previously but have searched by day or location filter previously filtered journeys
            } else if (this.state.isSearchedByLoc|| this.state.isSearchedByDay) {
                this.setState({
                    filteredJourneys: this.state.filteredJourneys.filter(j => j.jTime.substring(16, 21) === this.state.time)
                })
            }
            this.setState({ isSearchedByTime: true })
        }
    }

    render() {
        return (
            <div className="image-bg-ps">
                <ManagersNavBar/>
                <div className="passenger-header">
                    <h4 className="mt-1 mb-5">Passenger Statistics</h4>
                    <div className="row">
                        <div className="col-3">
                            <div className="row">
                                <div className="col my-2">
                                    <label>Search By:</label>
                                </div>
                                <div className="col">
                                    <select className="form-control" onChange={this.onChangeSearchBy}>
                                        <option value="loc">Location</option>
                                        <option value="time">Time</option>
                                        <option value="day">Day</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <input
                                type="text"
                                className={this.state.searchBy === 'loc' ? "form-control show" : "hide"}
                                onChange={this.onChangeLocation}
                            />
                            <select
                                className={this.state.searchBy === 'day' ? "form-control show" : "hide"}
                                onChange={this.onChangeDay}>
                                <option defaultValue>Choose...</option>
                                <option value="1">Monday</option>
                                <option value="2">Tuesday</option>
                                <option value="3">Wednesday</option>
                                <option value="4">Thursday</option>
                                <option value="5">Friday</option>
                                <option value="6">Saturday</option>
                                <option value="0">Sunday</option>
                            </select>
                            <input
                                type="time"
                                className={this.state.searchBy === 'time' ? "form-control show" : "hide"}
                                onChange={this.onChangeTime}
                            />
                        </div>
                        <div className="col-3 my-2">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultValue="option1" defaultChecked/>
                                <label className="form-check-label" htmlFor="inlineRadio1">Normal Journeys</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" defaultValue="option2" />
                                <label className="form-check-label" htmlFor="inlineRadio2">Expressway Journeys</label>
                            </div>
                        </div>
                        <div className="col-3">
                            <button className="btn btn-primary" onClick={this.onClickSearch} disabled={!this.state.day && !this.state.time && !this.state.location}>Search</button>
                        </div>
                    </div>
                </div>
                {this.state.filteredJourneys !== undefined ? // check whether searching has not been done yet
                    this.state.filteredJourneys.length !== 0 ? // check whether no results found
                        <div className="container">
                            <PassengersTable journeys={this.state.filteredJourneys} ref={el => this.componentRef = el} />
                            <ReactToPrint
                                trigger={() => {return <button className="btn btn-primary">Generate Report</button>}}
                                content={() => this.componentRef}
                                pageStyle
                            />
                        </div>
                    : <h2 className="container mt-4 text-light">No passengers</h2>
                : <h2 className="container mt-4 text-light">Search to see results</h2>}
            </div>
        );
    }
}

export default Passengers;

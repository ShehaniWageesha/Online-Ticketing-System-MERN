import React, {Component} from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css"
import './InspectionsTable'
import ReactToPrint from "react-to-print";
import InspectionsTable from "./InspectionsTable";
import ManagersNavBar from "../managers/ManagersNavBar";
import './Inspections.css';

class Inspections extends Component {
    constructor() {
        super();
        this.state = {
            inspections: [],
            searchBy: 'date',
            filteredInspections: undefined,
            isSearchedByDate: false,
            isSearchedByStatus: false,
        }
    }
    componentDidMount() {
        this.loadInspections();

    }

    loadInspections = () => {
        axios.get('http://localhost:5000/inspections/')
            .then(res => {
                this.setState({ inspections: res.data })
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }

    onChangeSearchBy = e => this.setState({ searchBy: e.target.value })

    onChangeDate = e => this.setState({ date: e.target.value })

    onChangeStatus = e => this.setState({ status: e.target.value })

    onClickSearch = () => {
        if (this.state.searchBy === 'date') {
            if (this.state.isSearchedByDate ) {
                this.setState({
                    filteredInspections: this.state.inspections.filter(j => j.date.substring(0, 10) === this.state.date)
                })
            }
            this.setState({isSearchedByDate: true})
        }
        else if (this.state.searchBy === 'status'){
            if (this.state.isSearchedByStatus ){
                this.setState({
                    filteredInspections: this.state.inspections.filter(j => j.status === this.state.status)
                })
            }
            this.setState({ isSearchedByStatus: true })
        }
    }

    render() {
        return (
            <div className="image-bg-f-n">
                <ManagersNavBar/>
                <div className="inspection-header">
                    <h3 className="mt-1 mb-5">Inspections</h3>
                    <div className="row">
                        <div className="col-3">
                            <div className="row">
                                <div className="col my-2">
                                    <label>Search By : </label>
                                </div>
                                <div className="col">
                                    <select className="form-control" onChange={this.onChangeSearchBy}>
                                        <option value="date">Date</option>
                                        <option value="status">Status</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                           <input type="date"
                                  className={this.state.searchBy === 'date' ? "form-control show" : "hide"}
                                  onChange={this.onChangeDate}
                           />
                            <select
                                className={this.state.searchBy === 'status' ? "form-control show" : "hide"}
                                onChange={this.onChangeStatus}>
                                <option defaultValue>Choose...</option>
                                <option value="valid">Valid</option>
                                <option value="invalid">Invalid</option>
                            </select>
                        </div>
                        <div className="col-3">
                            <button className="btn btn-primary" onClick={this.onClickSearch}>Search</button>
                            <button className="btn btn-primary mx-2" onClick={()=> window.location = "/inspections/viewAll"}>View All</button>
                        </div>
                    </div>
                </div>
                {this.state.filteredInspections !== undefined ? // check whether searching has not been done yet
                    this.state.filteredInspections.length !== 0 ? // check whether no results found
                        <div className="container">
                            <InspectionsTable inspections={this.state.filteredInspections} ref={el => this.componentRef = el} />
                            <ReactToPrint
                                trigger={() => {return <button className="btn btn-primary">Generate Report</button>}}
                                content={() => this.componentRef}
                                pageStyle
                            />
                        </div>
                    : <h2 className="container mt-4 text-light">No Inspections Found</h2>
                : <h2 className="container mt-4 text-light">Search to see results</h2>}
            </div>
        );
    }
}

export default Inspections;

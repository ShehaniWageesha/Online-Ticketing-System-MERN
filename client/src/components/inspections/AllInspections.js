import React, {Component} from 'react';
import ManagersNavBar from "../managers/ManagersNavBar";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css"
import './InspectionsTable'
import ReactToPrint from "react-to-print";
import InspectionsTable from "./InspectionsTable";

class AllInspections extends Component {
    constructor() {
        super();
        this.state = {
            inspections: [],
            tokenID: '',
            status: '',
            inspectorId:'',
            date: '',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/inspections/')
            .then(res => {

                this.setState({inspections: res.data})
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
        <div>
            <ManagersNavBar/>
            <div className="fare-header">
            <br/>
            <div className="row">
                <div className="col-3">
                    <div className="row">
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <h3 className="mt-1 mb-5" align="center">Inspections</h3>
            <div className="container">
                <table className="table table-dark table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Token ID</th>
                        <th scope="col">Status</th>
                        <th scope="col">Inspector ID</th>
                        <th scope="col">Date</th>
                    </tr>
                    </thead>
                    <tbody style={{backgroundColor: "#A09D9C"}}>
                    {this.state.inspections.map(inspection => (
                        <tr key={inspection._id}>
                            <td>{inspection.tokenId}</td>
                            <td>{inspection.status}</td>
                            <td>{inspection.inspectorId}</td>
                            <td>{inspection.date.substring(0,10)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
</div>
        )
    }
}

export default AllInspections;

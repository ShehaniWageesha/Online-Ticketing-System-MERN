import React, {Component} from "react";

class FaresTable extends Component{
    getTotalFare() {
        let total = 0;
        this.props.journeys.map(j => {
            total += j.fare;
        });
        return total;
    }

    render() {
        return(
            <div>
                <h2 className="text-light mt-4">Number Of Fares : { this.props.journeys.length }</h2>
                <h2 className="text-light mt-4">Fare Total : { this.getTotalFare() }</h2>
                <table className="table table-dark table-hover mt-3">
                    <thead>
                    <tr>
                        <th>Account Number</th>
                        <th>Token ID</th>
                        <th>Journey Date</th>
                        <th>Fare</th>
                    </tr>
                    </thead>
                    <tbody style={{backgroundColor:"#A09D9C"}}>
                    {this.props.journeys.map(j => (
                        <tr key={j._id}>
                            <td>{j.accNo}</td>
                            <td>{j.tokenID}</td>
                            <td>{j.jDate.substring(0, 10)}</td>
                            <td>{j.fare}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default FaresTable;
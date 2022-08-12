import React, {Component} from 'react';

class PassengersTable extends Component {
    render() {
        return (
            <div>
                <h2 className="mt-4 text-light">{ this.props.journeys.length } passengers</h2>
                <table className="table table-dark table-hover mt-3">
                    <thead>
                    <tr>
                        <th>Journey ID</th>
                        <th>Account No</th>
                    </tr>
                    </thead>
                    <tbody style={{backgroundColor:"#A09D9C"}}>
                    {this.props.journeys.map(j => (
                        <tr key={j._id}>
                            <td>{j.id}</td>
                            <td>{j.accNo}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PassengersTable;

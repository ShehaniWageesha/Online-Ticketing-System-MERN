import React, {Component} from 'react';
import axios from 'axios'
import swal from "sweetalert";
import PassengersNavBar from "../passengers/PassengersNavBar";

class JourneyDetailsForFixedFare extends Component {

    constructor(props) {
        super(props);
        this.state = {
            acNo: '',
            tokenID: '',
            startPoint: '',
            desPoint: '',
            appFare: '',
            distance: 0,
            jDate: '',
            jTime: '',
            fare: 0,
            journeyDetails: [],
        }

    }

    componentDidMount() {
        axios.get('http://localhost:5000/journeyDetailsForFixedFare/')
            .then(res => {

                this.setState({journeyDetails: res.data})

                console.log(res.data);

            })
            .catch(error => {

                console.log(error);
            })
    }

    selectJourneyType = () => {
        window.location = "/journeyDetails/normalJourney"
    }

    render() {
        return (
            <div>
                <PassengersNavBar/>
            <div className="container">
                <h3 style={{color: "#4A235A"}}>Express Way Journey Details</h3>
                <br/>
                <h5>Type Of The Journey:</h5>
                <input type="radio" id="variableFare" onClick={this.selectJourneyType}/>
                <label htmlFor="variableFare" class="font-weight-bold">Normal</label><br/>
                <input type="radio" id="fixedFare"  checked="checked" />
                <label htmlFor="fixedFare" class="font-weight-bold">Express Way</label><br/>
                <table className="table table-dark table-hover" >
                    <thead >
                    <tr>
                        <th scope="col">Account No</th>
                        <th scope="col">Express Way</th>
                        <th scope="col">Distance (Km)</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Fare (Rs.)</th>
                    </tr>
                    </thead>
                    <tbody style={{backgroundColor:"#A09D9C"}}>


                    {this.state.journeyDetails.map(journey => (
                        <tr key={journey._id}>
                            <td>{journey.accNo}</td>
                            <td>{journey.expressWay}</td>
                            <td>{journey.distance}</td>
                            <td>{journey.jDate.substring(0,10)}</td>
                            <td>{journey.jTime.substring(16,21)}</td>
                            <td>{journey.fare}</td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>
            </div>

        );

    }

}

export default JourneyDetailsForFixedFare
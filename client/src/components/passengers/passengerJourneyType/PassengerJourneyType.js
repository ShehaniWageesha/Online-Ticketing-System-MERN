import React, {Component} from 'react';
import axios from 'axios'
import swal from "sweetalert";
import './PassengerJourneyType.css';
import PassengersNavBar from "../PassengersNavBar";


class PassengerJourneyType extends Component{

    onClickMakeJourney = () => {
        window.location = '/normalWay'
    }

    onClickMakeExpressJourney = () => {
        window.location = '/expressWay'
    }

    render() {
        return(

            <div className="image-bg-home">
                <PassengersNavBar/>
                <div className="btn-bg" style={{ top: "50%" , width: '60%' , height: '50%' }}>
                    <button
                        className="btn-grad"
                        style={{ top: "40%" }}
                        onClick={this.onClickMakeJourney}
                    >
                        Normal Tours
                    </button>
                    <button
                        className="btn-grad"
                        style={{ top: "60%" }}
                        onClick={this.onClickMakeExpressJourney}
                    >
                        Express Way Tours
                    </button>
                </div>
            </div>

        );
    }

}

export default PassengerJourneyType;
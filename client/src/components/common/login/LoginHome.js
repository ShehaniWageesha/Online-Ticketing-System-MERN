import React, {Component} from 'react';
import './LoginHome.css'

class LoginHome extends Component {

    onClickPassengerLogin = () => {
        window.location = '/passengerLogin'
    }

    onClickManagerLogin = () => {
        window.location = '/managerLogin'
    }

    render() {
        return (
                <div className="image-bg-h">
                    <div className="btn-bg">
                        <p> Welcome To Smart Travellers! </p>
                        <button
                            className="btn-grad"
                            style={{ top: "40%" }}
                            onClick={this.onClickPassengerLogin}
                        >
                            Passenger Login
                        </button>
                        <button
                            className="btn-grad"
                            style={{ top: "60%" }}
                            onClick={this.onClickManagerLogin}
                        >
                            Smart Traveller Manager Login
                        </button>
                    </div>
                </div>
        );
    }
}

export default LoginHome;

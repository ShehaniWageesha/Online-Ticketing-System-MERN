import React, { Component } from 'react';

class PassengersNavBar extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a className="navbar-brand" href="/">
                        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Emblem_of_Sri_Lanka.svg/1200px-Emblem_of_Sri_Lanka.svg.png" width="25" height="30" className="d-inline-block align-top mr-4 ml-1" alt=""/> */}
                        <h4>Smart Travellers</h4>
                    </a>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        {/*<li className="nav-item active">*/}
                        {/*    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>*/}
                        {/*</li>*/}
                        {/* <li className="nav-item">
                            <a className="nav-link" href="/passengerJourneyType">Make a Journey</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/localPassengerAddCredit">Add Credits</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/journeyDetails/normalJourney">My Journeys</a>
                        </li> */}
                    </ul>
                    {/*<ul className="navbar-nav my-2 my-lg-0">*/}
                    {/*    <li className="nav-item">*/}
                    {/*        <a className="nav-link my-2 my-sm-0" href="#">Disabled</a>*/}
                    {/*    </li>*/}
                    {/*<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />*/}
                    {/*<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>*/}
                    {/*</ul>*/}
                </div>
            </nav>
        );
    }
}

export default PassengersNavBar

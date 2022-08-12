import React from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { Link } from "react-router-dom";
import "./sideNav.css"

class SideNav extends React.Component {

  render() {
    return (
      <div>
        <div className="sideNav">
        <h1></h1><br></br>
          {/* <div className="name">
          </div> */}
          <Link to="/passengerJourneyType">Make a Tour</Link>
          <Link to="/localPassengerAddCredit">Add Credits</Link>
          <Link to="/journeyDetails/normalJourney">My Tours</Link>
          
          <div className="cal">
            <Calendar />
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default SideNav;

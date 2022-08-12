import React, {Component} from 'react';
import axios from 'axios'
import swal from "sweetalert";
import './MakeExpressJourney.css';
import DatePicker from "react-datepicker";
import PassengersNavBar from "../PassengersNavBar";


class MakeExpressJourney extends Component{

    constructor(props) {
        super(props);

        this.onChangeUserAc = this.onChangeUserAc.bind(this);
        this.onChangeTokenId = this.onChangeTokenId.bind(this);
        this.onChangeExpressWay = this.onChangeExpressWay.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.calculateTotalBill = this.calculateTotalBill.bind(this);
        //this.onSubmit = this.onSubmit.bind(this);
        this.sweetalertfunction = this.sweetalertfunction.bind(this);
        this.getTokenId = this.getTokenId.bind(this);
        this.onChangePassengerType = this.onChangePassengerType.bind(this);

        this.state = {
            id: '',
            accNo: '',
            tokenID: '',
            expressWay: 'Kadawatha_Galle',
            appFare: 'Fixed',
            distance: 0,
            jDate: '',
            jTime: '',
            fare: 0,
            accountDetails: [],
            credit: 0,
            passenger: '',
            check: false
        }

    }

    onChangeUserAc(e){
        this.setState({
            accNo: e.target.value
        });
    }

    onChangeTokenId(e){
        this.setState({
            tokenID: e.target.value
        });
    }

    onChangeExpressWay(e){
        this.setState({
            expressWay: e.target.value
        });
    }


    onChangeDate(date){
        this.setState({
            jDate: date
        });
    }

    onChangeTime(time){
        this.setState({
            jTime: time
        });
    }

    onChangePassengerType(e){
        this.setState({
            passenger: e.target.value
        });
    }

    componentDidMount() {

        axios.get('http://localhost:5000/express/getId')
            .then(res => {
                console.log(res.data.data);
                this.setState({
                    id: res.data.data
                })

            })
            .catch(err =>
                console.log(err)
            )

    }

    sweetalertfunction(){
        swal({
            title: "Journey details Added",
            text: "You are Successfully Added new Journey Detail.",
            icon: "success",
            button: true,
        }).then(()=>{
            this.setState({
                id: '',
                accNo: '',
                tokenID: '',
                expressWay: 'Kadawatha_Galle',
                appFare: "Fixed",
                distance: 0,
                jDate: '',
                jTime: '',
                fare: 0,
                passenger: ''
            });
            window.location = '/passengerJourneyType'
        });
    }


    calculateTotalBill(e){
        e.preventDefault();

        if (this.state.expressWay === "Kadawatha_Galle"){
            this.setState({
                distance: 200,
                fare: 300
            });
        }
        else if (this.state.expressWay === "Kadawatha_Mathara"){
            this.setState({
                distance: 250,
                fare: 350
            });
        }
        else if (this.state.expressWay === "Kadawatha_Hambanthota"){
            this.setState({
                distance: 400,
                fare: 500
            });
        }
        else if (this.state.expressWay === "Katunayaka_Mathara"){
            this.setState({
                distance: 300,
                fare: 400
            });
        }
        else if (this.state.expressWay === "Katunayaka_Colombo"){
            this.setState({
                distance: 80,
                fare: 200
            });
        }
        else {
            this.setState({
                distance: 350,
                fare: 450
            });
        }

    }

    getTokenId(e){

        e.preventDefault();

        axios.get('http://localhost:5000/tokens/')
            .then(response =>{
                console.log(response);
                this.setState({tokenDetails: response.data})
                for (var i = 0;i < this.state.tokenDetails.length;i++){
                    if (this.state.tokenDetails[i].accNo === this.state.accNo){
                        this.setState({
                            tokenID: this.state.tokenDetails[i].tokenID
                        })
                    }

                }

            })
            .catch((error) =>{
                console.log(error);
            });

    }

    onSubmit = e => {

        e.preventDefault();

        const journeyExpress = {
            id: this.state.id,
            accNo: this.state.accNo,
            tokenID: this.state.tokenID,
            expressWay: this.state.expressWay,
            appFare: this.state.appFare,
            distance: this.state.distance,
            jDate: this.state.jDate,
            jTime: this.state.jTime,
            fare: this.state.fare

        };


        axios.get('http://localhost:5000/accounts/')
            .then(response =>{

                this.setState({accountDetails: response.data})
                for (var i = 0;i < this.state.accountDetails.length;i++){
                    if (this.state.accountDetails[i].accNo === this.state.accNo){
                        console.log(this.state.accountDetails[i].credit)
                        if (this.state.passenger === "Foreign") {
                            if (this.state.accountDetails[i].credit < 0) {
                                console.log("hi");
                                this.setState({
                                    check: true
                                })
                                swal({
                                    title: "Credit Insufficient",
                                    text: "Your credit amount is insufficient, Please renew.",
                                    icon: "error",
                                    button: true,
                                    dangerMode: true,
                                }).then(()=>{
                                    this.setState({
                                        id: '',
                                        accNo: '',
                                        tokenID: '',
                                        startPoint: '',
                                        desPoint: '',
                                        appFare: 'Variable',
                                        distance: 0,
                                        jDate: '',
                                        jTime: '',
                                        fare: 0,
                                        passenger: ''
                                    });
                                    window.location = '/passengerJourneyType'
                                });

                            }

                        }
                        this.setState({
                            credit: this.state.accountDetails[i].credit - this.state.fare
                        })
                    }

                }
                const newAccount = {
                    accNo: this.state.accNo,
                    credit: this.state.credit
                };

                axios.put('http://localhost:5000/accounts/update', newAccount)
                    .then(res => {
                            console.log(res);
                            if (res.status === 200) {
                                //this.sweetalertfunction();
                                console.log("hi");
                            }
                            else {
                                swal({
                                    title: "Journey Details Not Added!",
                                    text: res.data.message,
                                    icon: "error",
                                    button: true,
                                    dangerMode: true,
                                });
                            }
                        }

                    );

            })
            .catch((error) =>{
                console.log(error);
            });





        axios.post('http://localhost:5000/express/add', journeyExpress)
            .then(res => {
                console.log(res);
                    if (res.status === 200) {
                        if (this.state.check === false){
                            this.sweetalertfunction();
                        }
                        console.log("hi");
                    }
                    else {
                        swal({
                            title: "Journey Details Not Added!",
                            text: res.data.message,
                            icon: "error",
                            button: true,
                            dangerMode: true,
                        });
                    }
                }

            );

    }

    render() {
        return(
            <div className="image-bg-p">
                <PassengersNavBar/>

                <div className="container">
                    <h3 style={{color: "#fff",paddingTop: "50px"}}>Add Your Journey Details</h3>

                    <form onSubmit={this.onSubmit} className="jumbotron" style={{backgroundColor:"rgba(226, 223, 223, 0.65)",marginTop: "50px"}}>
                        <div className="form-group">
                            <label>Journey Id: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.id}
                            />
                        </div>
                        <div className="form-group">
                            <label>Passenger Type: </label>
                            <select value={this.state.passenger} onChange={this.onChangePassengerType}>
                                <option selected value="Local">Local Passenger</option>
                                <option value="Foreign">Foreign Passenger</option>
                            </select>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Your Account Number/Passport Id: </label>
                                    <input type="text"
                                           className="form-control"
                                           value={this.state.accNo}
                                           onChange={this.onChangeUserAc}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <button onClick={this.getTokenId} style={{ color:"#fff",backgroundColor:"#000",marginTop: "30px"}} className="btn">Get Token Id</button>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Your Token ID: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.tokenID}
                                   onChange={this.onChangeTokenId}
                            />
                        </div>
                        <div className="form-group">
                            <label>Express Way: </label>
                            <select value={this.state.expressWay} onChange={this.onChangeExpressWay}>
                                <option selected value="Kadawatha_Galle">Kadawatha - Galle</option>
                                <option value="Kadawatha_Mathara">Kadawatha - Mathara</option>
                                <option value="Kadawatha_Hambanthota">Kadawatha - Hambanthota</option>
                                <option value="Katunayaka_Mathara">Katunayaka - Mathara</option>
                                <option value="Katunayaka_Colombo">Katunayaka - Colombo</option>
                                <option value="Kottawa_Mathara">Kottawa - Mathara</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Applied Fare: Fixed</label>
                        </div>
                        <div className="form-group">
                            <label>Journey Date: </label>
                            <DatePicker
                                   selected={this.state.jDate}
                                   onChange={this.onChangeDate}
                            />
                        </div>
                        <div className="form-group">
                            <label>Journey Time: </label>
                            <DatePicker
                                selected={this.state.jTime}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                onChange={this.onChangeTime}
                            />
                        </div>
                        <div className="form-group">
                            <button onClick={this.calculateTotalBill} style={{ color:"#fff",backgroundColor:"#000"}} className="btn">Calculate Fare</button>
                        </div>
                        <div className="form-group">
                            <label>Distance: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.distance}
                            />
                        </div>
                        <div className="form-group">
                            <label>Your Journey Fare: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.fare}
                            />
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Add Journey" style={{ color:"#fff"}} className="btn btn-primary"/>
                        </div>
                    </form>
                </div>

            </div>


        );
    }

}

export default MakeExpressJourney;
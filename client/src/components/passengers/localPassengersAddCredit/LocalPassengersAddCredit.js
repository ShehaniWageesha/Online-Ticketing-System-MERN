import React, {Component} from 'react';
import axios from 'axios'
import swal from "sweetalert";
import './LocalPassengersAddCredit.css';
import PassengersNavBar from "../PassengersNavBar";

class LocalPassengersAddCredit extends Component{

    constructor(props) {
        super(props);

        this.onChangeTokenType = this.onChangeTokenType.bind(this);
        this.onChangeUserAc = this.onChangeUserAc.bind(this);
        this.onChangeCredit = this.onChangeCredit.bind(this);
        this.sweetalertfunction = this.sweetalertfunction.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.search = this.search.bind(this);

        this.state = {
            tokenType: 'smart_card',
            accNo: '',
            credits: 0,
            currentBalance: 0,
            accountDetails: [],
            credit: 0
        }
    }

    onChangeTokenType(e){
        this.setState({
            tokenType : e.target.value
        });
    }

    onChangeUserAc(e){
        this.setState({
            accNo: e.target.value
        });
    }

    onChangeCredit(e){
        this.setState({
            credits: e.target.value
        });
    }

    sweetalertfunction(){
        swal({
            title: "Credit details Added",
            text: "You are Successfully Added Credits.",
            icon: "success",
            button: true,
        }).then(()=>{
            this.setState({
                tokenType: 'smart_card',
                accNo: '',
                credits: 0,
                currentBalance: 0
            });
            window.location = '/passengerJourneyType'
        });
    }

    search(e) {

        e.preventDefault()

        axios.get('http://localhost:5000/accounts/')
            .then(response =>{

                this.setState({accountDetails: response.data})
                for (var i = 0;i < this.state.accountDetails.length;i++){
                    if (this.state.accountDetails[i].accNo === this.state.accNo){
                        console.log(this.state.accountDetails[i].credit)
                        this.setState({
                            currentBalance: this.state.accountDetails[i].credit
                        })
                    }

                }

            })
            .catch((error) =>{
                console.log(error);
            });

    }

    onSubmit(e){

        e.preventDefault();

        const creditAdd = {
            tokenType: this.state.tokenType,
            accNo: this.state.accNo,
            credits: this.state.credits
        }


        axios.get('http://localhost:5000/accounts/')
            .then(response =>{

                this.setState({accountDetails: response.data})
                for (var i = 0;i < this.state.accountDetails.length;i++){
                    if (this.state.accountDetails[i].accNo === this.state.accNo){
                        console.log(this.state.accountDetails[i].credit)
                        this.setState({
                            credit: (this.state.accountDetails[i].credit * 1) + (this.state.credits * 1)
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


        axios.post('http://localhost:5000/credit/add', creditAdd)
            .then(res => {
                    if (res.status === 200) {
                        this.sweetalertfunction();
                    }
                    else {
                        swal({
                            title: "Credit Details Not Added!",
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
        const {tokenType} = this.state;
        return(
            <div className="image-bg-p">
                <PassengersNavBar/>

                <div className="container">
                    <h3 style={{color: "#fff",paddingTop: "50px"}}>Add Your Credits</h3>

                    <form onSubmit={this.onSubmit} className="jumbotron" style={{backgroundColor:"rgba(226, 223, 223, 0.65)",marginTop: "50px"}}>
                        <div className="form-group">
                            <label>Select Token Type: </label>
                        </div>
                        <div className="form-group">
                            <label style={{marginRight: "103px"}}>Smart Card</label>
                            <input type="radio"
                                //className="form-control"
                                   value="smart_card"
                                   checked={tokenType === "smart_card"}
                                   onChange={this.onChangeTokenType}
                            />
                        </div>
                        <div className="form-group">
                            <label style={{marginRight: "140px"}}>Ticket</label>
                            <input type="radio"
                                //className="form-control"
                                   value="ticket"
                                   checked={tokenType === "ticket"}
                                   onChange={this.onChangeTokenType}
                            />
                        </div>
                        <div className="form-group">
                            <label style={{marginRight: "29px"}}>Digital in your mobile</label>
                            <input type="radio"
                                //className="form-control"
                                   value="mobile"
                                   checked={tokenType === "mobile"}
                                   onChange={this.onChangeTokenType}
                            />
                        </div>
                        <div className="form-group">
                            <label>Your Account Number: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.accNo}
                                   onChange={this.onChangeUserAc}
                            />
                        </div>
                        <div className="form-group">
                            <button onClick={this.search} style={{ color:"#fff",backgroundColor:"#000"}} className="btn">Display Current Balance</button>
                        </div>
                        <div className="form-group">
                            <label>Current Balance: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.currentBalance}
                            />
                        </div>
                        <div className="form-group">
                            <label>Credit you want to add: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.credits}
                                   onChange={this.onChangeCredit}
                            />
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Add Credit" style={{ color:"#fff"}} className="btn btn-primary"/>
                        </div>
                    </form>
                </div>

            </div>

        );
    }


}

export default LocalPassengersAddCredit;
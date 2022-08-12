import React, {Component} from 'react';
import './PassengerLogin.css';
import axios from 'axios';
import swal from "sweetalert";

class PassengerLogin extends Component {

    constructor() {
        super();
        this.state = {
            accounts: []
        }
    }

    componentDidMount() {
        this.loadAccounts();
    }

    loadAccounts = () => {
        axios.get('/accounts')
            .then(accounts => {
                this.setState({
                    accounts: accounts.data
                })
                console.log(this.state.accounts)
            })
            .catch(err =>
                console.log(err)
            )
    }

    onChangeAccountNo = e => {
        this.setState({
            accNo: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();
        if(this.state.accounts.find(e => e.accNo === this.state.accNo)){
            console.log('success');
            swal({
                title: "Login Successful!",
                text: "Welcome to Sri Lanka Public Transport!",
                icon:"success",
                button: { className: "swal-btn"}
            });
            window.location = '/passengerJourneyType'
        } else{
            console.log('failed')
            swal({
                title: "Account Number is Invalid!",
                text: "Enter a Valid Account Number!",
                icon:"error",
                dangerMode: true
            });
        }
    }

    render() {
        return (
            <div className="image-bg-p">
                <h4 className="login-header">Passenger Login</h4>
                <div className="login">
                    <form onSubmit={this.onSubmit}>
                        <h5 style={{ color:"white" }}>Enter Your Account No</h5>
                        <input style={{ width:"250px", height:"35px" }} type="text" onChange={this.onChangeAccountNo}/>
                        <div>
                            <input type="submit" value="Passenger Login" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default PassengerLogin;

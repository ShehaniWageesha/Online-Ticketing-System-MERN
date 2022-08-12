import React, {Component} from 'react';
import './ManagerLogin.css';
import axios from 'axios'
import swal from "sweetalert";

class ManagerLogin extends Component {

    constructor() {
        super();
        this.state = {
            managers: []
        }
    }

    componentDidMount() {
        this.loadAccounts();
    }

    loadAccounts = () => {
        axios.get('/managers')
            .then(managers => {
                this.setState({
                    managers: managers.data
                })

            })
            .catch(err =>
                console.log(err)
            )
    }

    onChangeManagerId = e => {
        this.setState({
            managerId: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();
        if(this.state.managers.find(e => e.managerId === this.state.managerId)){
            console.log('success')
            swal({
                title: "Login Successful!",
                text: "Welcome to Sri Lanka Public Transport!",
                icon: "success",
                button: {className: "swal-btn"}
            })
                .then(result => {
                    if (result)
                        window.location = '/managers/passenger-stats'
                })
        } else{
            console.log('failed')
            swal({
                title: "Manager ID is Invalid!",
                text: "Enter a Valid Manager ID!",
                icon:"error",
                dangerMode: true
            });
        }
    }

    render() {
        return (
            <div className="image-bg-m">
                <h4 className="login-header">Smart Traveller Manager Login</h4>
                <div className="login">
                    <form onSubmit={this.onSubmit}>
                        <h5 style={{ color:"white" }}>Enter Your Account No</h5>
                        <input style={{ width:"350px", height:"50px" }} type="text" onChange={this.onChangeManagerId}/>
                        <br></br>
                        <br></br>
                        <br></br>

                            <input type="submit" value="Manager Login" className="btn-grad" />
                        
                    </form>
                </div>
            </div>
        );
    }
}

export default ManagerLogin;

import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formControls: {
                email: {
                    value: ''
                },
                firstname: {
                    value: ''
                },
                password: {
                    value: ''
                },
                lastname: {
                    value: ''
                },
                options: [
                    { value: 0, displayValue: 'Listener' },
                    { value: 1, displayValue: 'Artist' }
                ],
                rol: {
                    value: ''
                },
            }
        }
    }

    formSubmitHandler = () => {
        const message = {
            Email: this.state.formControls.email.value,
            Password: this.state.formControls.password.value
        }
         axios.post("users/login", message)
             .then(res => {
                 console.log(res.data)
                toast.success('Welcome')
                 if (res.data.rol == "1") {
                     document.cookie = res.data.firstName
                     window.location.replace("/Artist");
                } else if (res.data.rol == "0") {
                     window.location.replace("/Listener");
                } else {
                    window.location.replace("/");
                }
            })
            .catch(err => { toast.error('Try Again') })
    }
    changeHandler = event => {

        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            formControls: {
                ...this.state.formControls,
                [name]: {
                    ...this.state.formControls[name],
                    value
                }
            }
        });
    }
    render() {
        return (
            <form>
                <h3>Log In</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" name="email" value={this.state.formControls.email.value} onChange={this.changeHandler} placeholder="Enter email" />
                </div>
                <ToastContainer />
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" value={this.state.formControls.password.value} onChange={this.changeHandler} placeholder="Enter password" />
                </div>

                <input onClick={this.formSubmitHandler} type="button" value="Send" className="btn btn-primary btn-block" />
                <p className="forgot-password text-right">
                    <br />
                    Already registered <a href="/SignUp">Sign Up?</a>
                </p>
            </form>
        );
    }
}
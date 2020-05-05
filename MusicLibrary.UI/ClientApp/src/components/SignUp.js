import React, { Component } from 'react';
import axios from 'axios';
import { FormErrors } from './FormValidation';
import './Form.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class SignUp extends Component {
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
            },
            formErrors: { firstname: '', lastname: '', password: '', email: '', rol: '' },
            emailValid: false,
            passwordValid: false,
            firstnameValid: false,
            passwordValid: false,
            lastnameValid: false,
            rolValid: false,
            formValid: false
        }
    }

    formSubmitHandler = () => {
        const message = {
            FirstName: this.state.formControls.firstname.value,
            LastName: this.state.formControls.lastname.value,
            Email: this.state.formControls.email.value,
            Password: this.state.formControls.password.value,
            Rol: this.state.formControls.rol.value
        }
        axios.post("users/register", message)
            .then(res => {
                toast.success("register")
                window.location.replace("/LogIn");
                
            })
            .catch(err => { toast.error("fail") })
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
                },
            }
        }, () =>
        {
                this.validateField(name, value);
        });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let firstnameValid = this.state.firstnameValid;
        let lastnameValid = this.state.lastnameValid;
        let rolValid = this.state.rolValid;
        switch (fieldName) {
            case 'firstname':
                firstnameValid = value.length >= 1;
                fieldValidationErrors.firstname = firstnameValid ? '' : ' is too short';
                break;
            case 'lastname':
                lastnameValid = value.length >= 1;
                fieldValidationErrors.lastname = lastnameValid ? '' : ' is too short';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'rol':
                rolValid = value.length >= 1;
                fieldValidationErrors.rol = rolValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
            firstnameValid: firstnameValid,
            lastnameValid: lastnameValid,
            rolValid: rolValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid && this.state.firstnameValid && this.state.lastnameValid && this.state.rolValid });
    }
    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    render() {
        return (
            <form>
                <ToastContainer />
                <h3>Sign Up</h3>
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.firstname)}`}>
                    <label>First name</label>
                    <input type="text" className="form-control" name="firstname" value={this.state.formControls.firstname.value} onChange={this.changeHandler} placeholder="First name" />
                </div>

                <div className={`form-group ${this.errorClass(this.state.formErrors.lastname)}`}>
                    <label>Last name</label>
                    <input type="text" className="form-control" name="lastname" value={this.state.formControls.lastname.value} onChange={this.changeHandler} placeholder="Last name" />
                </div>

                <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                    <label>Email address</label>
                    <input type="email" className="form-control" name="email" value={this.state.formControls.email.value} onChange={this.changeHandler} placeholder="Email" />
                </div>

                <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" value={this.state.formControls.password.value} onChange={this.changeHandler} placeholder="Enter password" />
                </div>

                <div className={`form-group ${this.errorClass(this.state.formErrors.rol)}`}>
                    <label>Rol</label>
                    <select className="custom-select custom-select-xs" onChange={this.changeHandler} name="rol">
                        <option selected disabled>Seleccione</option>
                        {this.state.formControls.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        ))}
                    </select>
                </div>

                <input onClick={this.formSubmitHandler} disabled={!this.state.formValid} type="button" value="Send" className="btn btn-primary" />
                <p className="forgot-password text-right">
                    <br />
                    Already registered <a href="/LogIn">Log In?</a>
                </p>
            </form>
        );
    }
}
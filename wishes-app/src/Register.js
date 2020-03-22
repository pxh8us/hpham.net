import React, { Component } from 'react';
import FormError from './FormError';
import firebase from './Firebase';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            passOne: '',
            passTwo: '',
            errorMessage: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        console.log("receive event");

        const itemName = e.target.name;
        const itemValue = e.target.value;

        console.log(e.target.name);

        this.setState({[itemName]:itemValue}, () => {
            if (this.state.passOne !== this.state.passTwo) {
                this.setState({ errorMessage: 'Passwords no not match' });
            } else {
                this.setState({ errorMessage: null});
            }
        });
    }

    handleSubmit(e) {
        console.log("submit");
        console.log(e);
        var registrationForm = {
            displayName: this.state.displayName,
            email: this.state.email,
            password: this.state.passOne
        }

        console.log(registrationForm);

        e.preventDefault();

        firebase
        .auth()
        .createUserWithEmailAndPassword(
            registrationForm.email,
            registrationForm.password
        )
        .then(() => {
            console.log("register successfully " + registrationForm.displayName);
            this.props.registerUser(registrationForm.displayName);
        })
        .catch(error => {
            console.warn("register failure");
            console.log(error);
            if (error.message !== null) {
                this.setState({errorMessage: error.message});
            } else {
                this.setState({errorMessage: null});
            }
        });
    }

    render() {
        return(
            <form className="mt-3" onSubmit={this.handleSubmit}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card bg-light">
                                <div className="card-body">
                                    <h3 className="font-weight-light mb-3">Register</h3>
                                    <div className="form-row">
                                        { this.state.errorMessage !== null ? (
                                            <FormError theMessage={this.state.errorMessage}/>
                                        ):null }
                                        <section className="col-sm-12 form-group">
                                            <label 
                                              className="form-control-label sr-only"
                                              htmlFor="displayName"
                                            >
                                                Display Name
                                            </label>
                                            <input 
                                                className="form-control"
                                                type="text"
                                                id="displayName"
                                                placeholder="Display Name"
                                                name="displayName"
                                                required
                                                value={this.state.displayName}
                                                onChange={this.handleChange}
                                            />
                                        </section>
                                        <section className="col-sm-12 form-group">
                                            <label 
                                              className="form-control-label sr-only"
                                              htmlFor="email"
                                            >
                                                Email
                                            </label>
                                            <input 
                                                className="form-control"
                                                type="email"
                                                id="email"
                                                placeholder="Email Address"
                                                name="email"
                                                required
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                            />
                                        </section>
                                        <section className="col-sm-6 form-group">
                                            <input
                                                className="form-control"
                                                type="password"
                                                required
                                                name="passOne"
                                                placeholder="Password"
                                                value={this.state.passOne}
                                                onChange={this.handleChange}
                                            />
                                        </section>
                                        <section className="col-sm-6 form-group">
                                            <input
                                                className="form-control"
                                                type="password"
                                                required
                                                name="passTwo"
                                                placeholder="Repeat Password"
                                                value={this.state.passTwo}
                                                onChange={this.handleChange}
                                            />
                                        </section>
                                    </div>
                                    <div className="form-group text-right mb-0">
                                        <button className="btn btn-primary" type="submit">
                                            Register
                                        </button>
                                    </div>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
            </form>
            
        );
    }
}

export default Register;
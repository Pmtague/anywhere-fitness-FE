import React, { Component } from 'react'
import Loader from "react-loader-spinner";
import { connect } from 'react-redux';
import { register } from '../actions'

export class Register extends Component {
    state = {
        user: {
            fullname: "",
            username: "",
            password: ""
        }
    };

    handleChange = e => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        });
    };


    register = e => {
        e.preventDefault();
        this.props
            .register(this.state.user)
            .then(res => {
                if (res) {
                    this.props.history.push("./login");
                }
            });
    };

    render() {
        return (
            <div className="register">
                Register Page
                <form className="register-form" onSubmit={this.register}>
                    <input
                        type="text"
                        name="fullname"
                        placeholder="Full Name"
                        value={this.state.user.fullname}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={this.state.user.username}
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.user.password}
                        onChange={this.handleChange}
                    />
                    <button>
                        {this.props.creatingUser ? (
                            <Loader type="TailSpin" color="#ffffff" height="26" width="26" />
                        ) : (
                                "Register"
                            )}
                    </button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.registerReducer.error,
        creatingUser: state.registerReducer.creatingUser
    };
};

export default connect(
    mapStateToProps,
    { register }
)(Register);


import React, { Component } from "react";
import "../styles/TodoListCreateForm.css";
import { connect } from "react-redux";
import { register,google } from "../redux/actions/userActions";
import { Redirect } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    // Log in
    const { email, password, name } = this.state;
    if ((name === "" || email === "", password === "")) {
      this.setState({ error: "Please Provide All Details" });
    } else {
      await this.props.register({ name, email, password });
      this.props.history.push("/todos");
    }
  };
  responseGoogle = response =>{
    if(response.error){
      console.log(response)
    }
    if(response.profileObj){
      const user= {
        email:response.profileObj.email,
      }
      this.props.google(user)
    }
  }
  render() {
    return this.props.user ? (
      <Redirect to="/todos" />
    ) : (
      <form className="todo__form" onSubmit={this.handleSubmit}>
         <GoogleLogin
    clientId="672737151355-b07tnobonujvfr51haveunm949km8oha.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
        <input
          onChange={this.handleChange}
          value={this.state.name}
          type="name"
          name="name"
          placeholder="name"
          style={{marginTop:"15px"}}
          required
        />
        <input
          onChange={this.handleChange}
          value={this.state.email}
          type="email"
          name="email"
          placeholder="email"
          required
        />
        <input
          onChange={this.handleChange}
          type="password"
          name="password"
          placeholder="********"
          checked={this.state.isCompleted}
          required
        />
        <p>{this.state.error}</p>
        <input type="submit" className="btn btn-create" value="Register" />
      </form>
    );
  }
}

const mapStateToProps = (storeState) => {
  return { user: storeState.userState.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (user) => dispatch(register(user)),
    google: user => dispatch(google(user))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

import React, { Component } from "react";
import "../styles/TodoListCreateForm.css";
import { connect } from "react-redux";
import { logIn,google } from "../redux/actions/userActions";
import { Redirect } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';


class Login extends Component {
  state = {
    email: "",
    password: "",
    error:""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({error:""})
  };

  handleSubmit = async e => {
    e.preventDefault();
    // Log in
    const { email, password } = this.state;
    await this.props.logIn({ email, password });
    if(this.props.invalid.length>0){
      this.setState({error:this.props.invalid})
    }
    else{
      this.props.history.push("/todos");  
    }
  };
  responseGoogle = response =>{
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
          value={this.state.email}
          type="email"
          name="email"
          placeholder="johndoe123@something.com"
          style={{marginTop:"15px"}}
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
        <input type="submit" className="btn btn-create" value="Login" />
      </form>
    );
  }
}

const mapStateToProps = storeState => {
  return { user: storeState.userState.user ,invalid:storeState.userState.invalid};

};

const mapDispatchToProps = dispatch => {
  return {
    logIn: user => dispatch(logIn(user)),
    google: user => dispatch(google(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

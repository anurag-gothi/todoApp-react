import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logOut } from "../redux/actions/userActions";
import "../styles/Navbar.css";

const button = {
  margin: "10px",
  height: "50px",
  width: "100px",
  float: "right",
};

const NavBar = ({ user, logOut, history, ...restProps }) => {
  console.log(restProps);
  const handleLogout = () => {
    logOut();
    history.push("/login");
  };
  return (
    <div className="navbar">
      {/* <img
        className="logo"
        src="https://res.cloudinary.com/anuraggothi/image/upload/v1594462311/shoe_pl3dsm.jpg"
        alt="home"
      ></img> */}
      {user !== null ? (
        <div>
          <button style={button} onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button style={button}>Login</button>
          </Link>
          <Link to="/register">
            <button style={button}>Register</button>
          </Link>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));

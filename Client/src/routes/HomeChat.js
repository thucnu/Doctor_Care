import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

class HomeChat extends Component {
  render() {
    const { isLoggedHomeIn } = this.props;
    console.log("isLoggedHomeIn", isLoggedHomeIn);
    let linkToLoginHome = isLoggedHomeIn ? "/chat" : "/login-user";
    return <Redirect to={linkToLoginHome} />;
  }
}

const mapStateToProps = (state) => {
  return {
    // isLoggedHomeIn: state.userHome.isLoggedHomeIn,
    isLoggedHomeIn: state.userHome.isLoggedHomeIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeChat);

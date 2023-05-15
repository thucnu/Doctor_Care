import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    const { isLoggedIn } = this.props;
    let linkToLogin = isLoggedIn ? "/system/manager-doctor" : "/login";
    return (
      <>
        <Redirect to={linkToLogin} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedHomeIn: state.userHome.isLoggedHomeIn,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

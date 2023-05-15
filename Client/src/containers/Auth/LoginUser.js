import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./LoginUser.scss";
import { handleLoginUserApi } from "../../services/userService";
import { Redirect } from "react-router";

class LoginUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleOnChangeEmailAddress = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  // handleRedirectLoginUser = () => {
  //   this.props.history.push("/home")
  // }
  handleLoginUser = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginUserApi(this.state.email, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.history.push("/home");
        this.props.userLoginHomeSuccess(data.user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
      console.log("error", error.response);
    }
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLoginUser();
    }
  };
  render() {
    //JSX
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Đăng nhập</div>
            <div className="col-12 form-group login-input">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                placeholder="Nhập địa chỉ email..."
                value={this.state.email}
                onChange={(event) => this.handleOnChangeEmailAddress(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Mật khẩu:</label>
              <div className="custom-input-password">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Nhập mật khẩu..."
                  onChange={(event) => this.handleOnChangePassword(event)}
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLoginUser();
                }}
              >
                Đăng nhập
              </button>
            </div>
            <div className="col-12">
              <p>
                Bạn chưa có tài khoản? <a href="/register">Đăng ký</a>
              </p>
            </div>
            <div className="col-12">
              <span className="forgot">Quên mật khẩu?</span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other-login">Đăng nhập với:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedHomeIn: state.userHome.isLoggedHomeIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginHomeSuccess: (userHomeInfo) =>
      dispatch(actions.userLoginHomeSuccess(userHomeInfo)),
      };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginUser);

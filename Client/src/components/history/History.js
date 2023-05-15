import { connect } from "react-redux";
import React, { Component } from "react";
import DatePicker from "../../../src/components/Input/DatePicker";
import moment from "moment";
import { getHistoryPatient, refund } from "../../../src/services/userService";
import { LANGUAGES } from "../../../src/utils";
import HomeHeader from "../../../src/containers/HomePage/HomeHeader";
import { toast } from "react-toastify";
import "./History.scss";
class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      disable: false,
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { userHomeInfo } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();
    let res = await getHistoryPatient(userHomeInfo.id, formatedDate);
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  handleOnchangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };

  handleCancelBooking = async (item) => {
    let res = await refund(item.billId);
    if (res && res.errCode === 0) {
      toast.success("Refund succeed!");
    }
    this.setState({
      disable: true,
    });
  };

  render() {
    let { dataPatient, disable } = this.state;
    let { language } = this.props;
    return (
      <>
        <HomeHeader isShowBanner={false} />

        <div className="manage-patient-container">
          <div className="m-p-title">Lịch sử khám bệnh</div>
          <div className="row manage-patient-body ">
            <div className="col-4 form-group">
              <label>Chọn ngày khám</label>
              <DatePicker
                onChange={this.handleOnchangeDatePicker}
                className="form-control"
                value={this.state.currentDate}
              />
            </div>
            <div className="col-12 table-manage-patient">
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <th>STT</th>
                    <th>Thời gian</th>
                    <th>Email bác sĩ</th>
                    <th>Bác sĩ</th>
                    <th>Giá khám</th>
                    <th>Hành động</th>
                  </tr>
                  {dataPatient && dataPatient.length > 0 ? (
                    dataPatient.map((item, index) => {
                      let time =
                        language === LANGUAGES.VI
                          ? item.timeTypeDataPatient.valueVi
                          : item.timeTypeDataPatient.valueEn;

                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{time}</td>
                          <td>{item.doctorData.email}</td>
                          <td>
                            {item.doctorData.lastName}{" "}
                            {item.doctorData.firstName}
                          </td>
                          <td>
                            {item.Bill.total} {"VNĐ"}
                          </td>
                          <td>
                            <button
                              id="cancel-booking-btn"
                              className={disable ? "btn-off" : "btn-on"}
                              onClick={() => this.handleCancelBooking(item)}
                            >
                              Hủy
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6">no data</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
    userHomeInfo: state.userHome.userHomeInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(History);

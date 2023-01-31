import React, { Component } from "react";
import {
  Input,
  Button,
  Tag,
  Tabs,
  DatePicker,
  Row,
  Table,
  Pagination,
  notification,
  Select,
  TimePicker,
} from "antd";
import moment from "moment";
import "@styles/request.css";
import "@styles/style.css";
import Request from "@apis/Request";
import cookie from "react-cookies";
import $ from "jquery";
const { TabPane } = Tabs;
const { Column } = Table;
const { TextArea } = Input;
const InputGroup = Input.Group;
const { Option } = Select;
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
const format = "HH:mm";
var formatDateHMS = require("dateformat");
var formatNgay = formatDateHMS(new Date(), "dd/mm/yyyy");
var formatGio = formatDateHMS(new Date(), "HH:MM");
var formatGioLamThem = formatDateHMS(new Date(), "HH:MM");
var current_day = new Date().getDay();
if (current_day > 0 && current_day < 6) {
  formatGioLamThem = "17:30";
} else if (current_day == 6) {
  formatGioLamThem = "12:00";
}
var ten = cookie.load("user");

class Half extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "",
      index: "id",
      pageSize1: 10,
      pageSize2: 10,
      pageSize3: 10,
      pageNumber: 1,
      loaiChamCong: "Vào",
      loaiDangKy: "",
      chonNgay: "",
      chonNgayLamThem: formatNgay,
      chonNgayDiMuon: formatNgay,
      chonNgayNghi: formatNgay,
      chonNgayBatDau: formatNgay,
      chonNgayKetThuc: formatNgay,
      chonNgayChamCong: formatNgay,
      chonNgayBatDauDiCongTac: formatNgay,
      chonNgayKetThucDiCongTac: formatNgay,
      tuGio: formatGio,
      denGio: formatGio,
      gioBatDauDiCongTac: formatGio,
      gioKetThucDiCongTac: formatGio,
      formatGioChamCong: formatGio,
      nguoiDuyetDu: "",
      nguoiDuyetThieu: "",
      lyDo: "",
      name: "",
      registration_time: "",
      day: "",
      date: "",
      person: "",
      reason: "",
    };
  }

  onChangeLoaiDangKy = (e) => {
    $("#dangKyNghi").css("display", "none");
    $("#dangKyChamCong").css("display", "none");
    $("#dangKyDiMuon").css("display", "none");
    $("#dangKyLamThemGio").css("display", "none");
    $("#dangKyCongTac").css("display", "none");
    if (e != "") {
      $("#" + e).css("display", "block");
    }
  };

  onChangeLoaiDangKyNghi = (e) => {
    $("#id_name").css("display", "none");
    $("#id_name1").css("display", "none");
    $("#id_name2").css("display", "none");
    $("#id_name5").css("display", "none");
    $("#id_name6").css("display", "none");
    $("#id_name7").css("display", "none");
    if (e == "Sáng" || e == "Chiều" || e == "Cả Ngày") {
      $("#id_name").css("display", "block");
      $("#id_name5").css("display", "block");
      $("#id_name6").css("display", "block");
    } else {
      $("#id_name1").css("display", "block");
      $("#id_name2").css("display", "block");
      $("#id_name5").css("display", "block");
      $("#id_name7").css("display", "block");
    }
    this.setState({
      loaiDangKy: e,
    });
  };

  onChangeReason = (e) => {
    this.setState({
      lyDo: e.target.value,
    });
  };

  onChange = (e) => {
    if (e != null) {
      this.setState({
        chonNgayNghi: formatDateHMS(e._d, "dd/mm/yyyy"),
      });
    } else {
      this.setState({
        chonNgayNghi: "",
      });
    }
  };

  onChange1 = (e) => {
    if (e != null) {
      this.setState({
        chonNgayBatDau: formatDateHMS(e._d, "dd/mm/yyyy"),
      });
    } else {
      this.setState({
        chonNgayBatDau: "",
      });
    }
  };

  onChange2 = (e) => {
    if (e != null) {
      this.setState({
        chonNgayKetThuc: formatDateHMS(e._d, "dd/mm/yyyy"),
      });
    } else {
      this.setState({
        chonNgayKetThuc: "",
      });
    }
  };

  onChange3 = (e) => {
    if (e != null) {
      this.setState({
        chonNgayChamCong: formatDateHMS(e._d, "dd/mm/yyyy"),
      });
    } else {
      this.setState({
        chonNgayChamCong: "",
      });
    }
  };

  onChange4 = (e) => {
    if (e != null) {
      this.setState({
        chonNgayDiMuon: formatDateHMS(e._d, "dd/mm/yyyy"),
      });
    } else {
      this.setState({
        chonNgayDiMuon: "",
      });
    }
  };

  onChange5 = (e) => {
    if (e != null) {
      this.setState({
        chonNgayLamThem: formatDateHMS(e._d, "dd/mm/yyyy"),
      });
    } else {
      this.setState({
        chonNgayLamThem: "",
      });
    }
  };

  onChangeNgayBatDauDiCongTac = (e) => {
    if (e != null) {
      this.setState({
        chonNgayBatDauDiCongTac: formatDateHMS(e._d, "dd/mm/yyyy"),
      });
    } else {
      this.setState({
        chonNgayBatDauDiCongTac: "",
      });
    }
  };

  onChangeNgayKetThucDiCongTac = (e) => {
    if (e != null) {
      this.setState({
        chonNgayKetThucDiCongTac: formatDateHMS(e._d, "dd/mm/yyyy"),
      });
    } else {
      this.setState({
        chonNgayKetThucDiCongTac: "",
      });
    }
  };

  getSeveral1 = (pageNumber) => {
    //chờ phê duyệt
    Request("several/getchopheduyet", "POST", {
      name: ten,
      pageSize: this.state.pageSize1,
      pageNumber: pageNumber,
      index: this.state.index,
      sortBy: this.state.sortBy,
    }).then((response) => {
      if (response.data.success) {
        this.setState({
          several1: response.data.data.several,
          count1: Number(response.data.data.count),
        });
      }
    });
  };

  getSeveral2 = (pageNumber) => {
    //đã phê duyệt
    Request("several/getdapheduyet", "POST", {
      name: ten,
      pageSize: this.state.pageSize2,
      pageNumber: pageNumber,
      index: this.state.index,
      sortBy: this.state.sortBy,
    }).then((response) => {
      if (response.data.success) {
        console.log(response.data.data.several, "123123");

        this.setState({
          several2: response.data.data.several,
          count2: Number(response.data.data.count),
        });
      }
    });
  };

  getSeveral3 = (pageNumber) => {
    //không phê duyệt
    Request("several/getkhongpheduyet", "POST", {
      name: ten,
      pageSize: this.state.pageSize3,
      pageNumber: pageNumber,
      index: this.state.index,
      sortBy: this.state.sortBy,
    }).then((response) => {
      if (response.data.success) {
        this.setState({
          several3: response.data.data.several,
          count3: Number(response.data.data.count),
        });
      }
    });
  };

  componentDidMount() {
    this.getSeveral1(this.state.pageNumber);
    this.getSeveral2(this.state.pageNumber);
    this.getSeveral3(this.state.pageNumber);
    console.log(this.state, "satea");
  }

  onChangeTimePicker = (e) => {
    if (e != null) {
      this.setState({
        formatGioChamCong: formatDateHMS(e._d, "HH:MM"),
      });
    } else {
      this.setState({
        formatGioChamCong: "",
      });
    }
  };

  onChangeTimePicker1 = (e) => {
    if (e != null) {
      this.setState({
        tuGio: formatDateHMS(e._d, "HH:MM"),
      });
    } else {
      this.setState({
        tuGio: "",
      });
    }
  };

  onChangeTimePicker2 = (e) => {
    if (e != null) {
      this.setState({
        denGio: formatDateHMS(e._d, "HH:MM"),
      });
    } else {
      this.setState({
        denGio: "",
      });
    }
  };

  onChangeGioBatDauDiCongTac = (e) => {
    if (e != null) {
      this.setState({
        gioBatDauDiCongTac: formatDateHMS(e._d, "HH:MM"),
      });
    } else {
      this.setState({
        gioBatDauDiCongTac: "",
      });
    }
  };

  onChangeGioKetThucDiCongTac = (e) => {
    if (e != null) {
      this.setState({
        gioKetThucDiCongTac: formatDateHMS(e._d, "HH:MM"),
      });
    } else {
      this.setState({
        gioKetThucDiCongTac: "",
      });
    }
  };

  onChangeLoaiChamCong = (e) => {
    this.setState({
      loaiChamCong: e,
    });
  };

  onClickRegistrationBonus = async () => {
    if (this.state.chonNgayLamThem == "") {
      notification["warning"]({
        message: "Cảnh Báo",
        description: "Bạn chưa chọn ngày làm thêm giờ ",
      });
    } else if (this.state.denGio == "") {
      notification["warning"]({
        message: "Cảnh Báo",
        description: "Bạn chưa chọn giờ kết thúc làm thêm ",
      });
    } else {
      Request("several/insert3", "POST", {
        name: ten,
        registration_time: formatDateHMS(new Date(), "dd/mm/yyyy - HH:MM:ss"),
        day_start:
          this.state.chonNgayLamThem +
          " từ " +
          this.state.tuGio +
          " đến " +
          this.state.denGio,
        day_end:
          this.state.chonNgayLamThem.split("/")[2] +
          "-" +
          this.state.chonNgayLamThem.split("/")[1] +
          "-" +
          this.state.chonNgayLamThem.split("/")[0],
        reason: this.state.lyDo,
        loaidk: "Đăng Ký Làm Thêm Giờ",
      })
        .then((res) =>
          notification[res.data.success === true ? "success" : "error"]({
            message: "Thông Báo",
            description: res.data.message,
          })
        )
        .catch((err) => {});
      setTimeout(() => {
        this.getSeveral1(this.state.pageNumber);
      }, 1000);
    }
  };

  onClickRegistrationLate = async () => {
    if (this.state.chonNgayDiMuon == "") {
      notification["warning"]({
        message: "Cảnh Báo",
        description: "Bạn chưa chọn ngày đi muộn ",
      });
    } else {
      Request("several/insert3", "POST", {
        name: ten,
        registration_time: formatDateHMS(new Date(), "dd/mm/yyyy - HH:MM:ss"),
        day_start: this.state.chonNgayDiMuon,
        day_end:
          this.state.chonNgayDiMuon.split("/")[2] +
          "-" +
          this.state.chonNgayDiMuon.split("/")[1] +
          "-" +
          this.state.chonNgayDiMuon.split("/")[0],
        reason: this.state.lyDo,
        loaidk: "Đăng Ký Đi Muộn",
      })
        .then((res) =>
          notification[res.data.success === true ? "success" : "error"]({
            message: "Thông Báo",
            description: res.data.message,
          })
        )
        .catch((err) => {});
      setTimeout(() => {
        this.getSeveral1(this.state.pageNumber);
      }, 1000);
    }
  };

  onClickRegistrationTimekeeping = async () => {
    if (this.state.chonNgayChamCong == "") {
      notification["warning"]({
        message: "Cảnh Báo",
        description: "Bạn chưa chọn ngày chấm công",
      });
    } else if (this.state.formatGioChamCong == "") {
      notification["warning"]({
        message: "Cảnh Báo",
        description: "Bạn chưa chọn giờ chấm công",
      });
    } else {
      Request("several/insert3", "POST", {
        name: ten,
        registration_time: formatDateHMS(new Date(), "dd/mm/yyyy - HH:MM:ss"),
        day_start:
          this.state.chonNgayChamCong + " - " + this.state.formatGioChamCong,
        day_end:
          this.state.chonNgayChamCong.split("/")[2] +
          "-" +
          this.state.chonNgayChamCong.split("/")[1] +
          "-" +
          this.state.chonNgayChamCong.split("/")[0],
        reason: this.state.lyDo,
        loaidk: "Đăng Ký Chấm Công " + this.state.loaiChamCong,
      })
        .then((res) =>
          notification[res.data.success === true ? "success" : "error"]({
            message: "Thông Báo",
            description: res.data.message,
          })
        )
        .catch((err) => {});
      setTimeout(() => {
        this.getSeveral1(this.state.pageNumber);
      }, 1000);
    }
  };

  onClickRegistrationOffs = async () => {
    if (this.state.chonNgayBatDau == "") {
      notification["warning"]({
        message: "Cảnh Báo",
        description: "Bạn chưa chọn ngày bắt đầu",
      });
    } else if (this.state.chonNgayKetThuc == "") {
      notification["warning"]({
        message: "Cảnh Báo",
        description: "Bạn chưa chọn ngày kết thúc",
      });
    } else {
      Request("several/insert3", "POST", {
        name: ten,
        registration_time: formatDateHMS(new Date(), "dd/mm/yyyy - HH:MM:ss"),
        day_start:
          this.state.chonNgayBatDau + " - " + this.state.chonNgayKetThuc,
        day_end:
          this.state.chonNgayBatDau.split("/")[2] +
          "-" +
          this.state.chonNgayBatDau.split("/")[1] +
          "-" +
          this.state.chonNgayBatDau.split("/")[0],
        reason: this.state.lyDo,
        loaidk: "Đăng Ký Nghỉ " + this.state.loaiDangKy,
      })
        .then((res) =>
          notification[res.data.success === true ? "success" : "error"]({
            message: "Thông Báo",
            description: res.data.message,
          })
        )
        .catch((err) => {});
      setTimeout(() => {
        this.getSeveral1(this.state.pageNumber);
      }, 1000);
    }
  };

  onClickRegistrationOff = async () => {
    if (this.state.loaiDangKy == "") {
      notification["warning"]({
        message: "Cảnh Báo",
        description: "Bạn chưa chọn loại đăng ký",
      });
    } else if (this.state.chonNgayNghi == "") {
      notification["warning"]({
        message: "Cảnh Báo",
        description: "Bạn chưa chọn ngày đăng ký nghỉ",
      });
    } else {
      Request("several/insert3", "POST", {
        name: ten,
        registration_time: formatDateHMS(new Date(), "dd/mm/yyyy - HH:MM:ss"),
        day_start: this.state.chonNgayNghi,
        day_end:
          this.state.chonNgayBatDau.split("/")[2] +
          "-" +
          this.state.chonNgayBatDau.split("/")[1] +
          "-" +
          this.state.chonNgayBatDau.split("/")[0],
        reason: this.state.lyDo,
        loaidk: "Đăng Ký Nghỉ " + this.state.loaiDangKy,
      })
        .then((res) =>
          notification[res.data.success === true ? "success" : "error"]({
            message: "Thông Báo",
            description: res.data.message,
          })
        )
        .catch((err) => {});
      setTimeout(() => {
        this.getSeveral1(this.state.pageNumber);
      }, 1000);
    }
  };

  onClickRegistrationBusiness = async () => {
    if (this.state.chonNgayBatDauDiCongTac == "") {
      notification["warning"]({
        message: "Cảnh Báo",
        description: "Bạn chưa chọn ngày bắt đầu đi công tác",
      });
    } else if (this.state.chonNgayKetThucDiCongTac == "") {
      notification["warning"]({
        message: "Cảnh Báo",
        description: "Bạn chưa chọn ngày kết thúc đi công tác",
      });
    } else {
      Request("several/insert4", "POST", {
        name: ten,
        registration_time: formatDateHMS(new Date(), "dd/mm/yyyy - HH:MM:ss"),
        day_start:
          "Từ " +
          this.state.gioBatDauDiCongTac +
          " ngày " +
          this.state.chonNgayKetThucDiCongTac +
          " đến " +
          this.state.gioKetThucDiCongTac +
          " ngày " +
          this.state.chonNgayKetThucDiCongTac,
        day_end:
          this.state.chonNgayBatDauDiCongTac.split("/")[2] +
          "-" +
          this.state.chonNgayBatDauDiCongTac.split("/")[1] +
          "-" +
          this.state.chonNgayBatDauDiCongTac.split("/")[0],
        reason: this.state.lyDo,
        loaidk: "Đăng Ký Đi Công Tác",
      })
        .then((res) =>
          notification[res.data.success === true ? "success" : "error"]({
            message: "Thông Báo",
            description: res.data.message,
          })
        )
        .catch((err) => {});
      setTimeout(() => {
        this.getSeveral1(this.state.pageNumber);
      }, 1000);
    }
  };

  onClickDelete = (text) => {
    Request("several/deletechopheduyet", "POST", { id: text }).then(
      (response) => {
        if ((response.status === 200) & (response.data.success === true)) {
          this.getSeveral1(this.state.pageNumber);
          notification[res.data.success === true ? "success" : "error"]({
            message: "Thông Báo",
            description: "Xóa thành công",
          });
        }
      }
    );
  };

  onChangPage1 = (page) => {
    this.setState(
      {
        page: page,
      },
      () => {
        this.getSeveral1(page);
      }
    );
  };

  onShowSizeChange1 = (page, pageSize) => {
    this.setState(
      {
        page: page,
        pageSize1: pageSize,
      },
      () => {
        this.getSeveral1(page);
      }
    );
  };

  onChangPage2 = (page) => {
    this.setState(
      {
        page: page,
      },
      () => {
        this.getSeveral2(page);
      }
    );
  };

  onShowSizeChange2 = (page, pageSize) => {
    this.setState(
      {
        page: page,
        pageSize2: pageSize,
      },
      () => {
        this.getSeveral2(page);
      }
    );
  };

  onChangPage3 = (page) => {
    this.setState(
      {
        page: page,
      },
      () => {
        this.getSeveral3(page);
      }
    );
  };

  onShowSizeChange3 = (page, pageSize) => {
    this.setState(
      {
        page: page,
        pageSize3: pageSize,
      },
      () => {
        this.getSeveral3(page);
      }
    );
  };

  render() {
    return (
      <div>
        <div style={{ display: "flex", height: "306px" }}>
          <div
            style={{
              borderRadius: "10px",
              width: "38%",
              height: "108%",
              textAlign: "center",
              fontSize: "16px",
              background: "#aecfec",
              padding: "4px",
            }}
          >
            <div style={{ textAlign: "left", margin: "5px" }}>
              <div>
                <Select
                  placeholder="Chọn loại đăng ký"
                  onChange={(e) => this.onChangeLoaiDangKy(e)}
                  style={{ width: "100%" }}
                >
                  <Option value="dangKyNghi">Đăng ký nghỉ</Option>
                  <Option value="dangKyChamCong">Đăng ký chấm công</Option>
                  <Option value="dangKyDiMuon">Đăng ký đi muộn</Option>
                  <Option value="dangKyLamThemGio">Đăng ký làm thêm giờ</Option>
                  <Option value="dangKyCongTac">Đăng ký đi công tác</Option>
                </Select>
              </div>
              <div id="dangKyNghi" style={{ display: "none" }}>
                <div style={{ marginTop: 16 }}>
                  <Select
                    placeholder="Chọn loại đăng ký nghỉ"
                    onChange={(e) => this.onChangeLoaiDangKyNghi(e)}
                    style={{ width: "100%" }}
                  >
                    <Option value="Sáng">Nửa ngày buổi sáng</Option>
                    <Option value="Chiều">Nửa ngày buổi chiều</Option>
                    <Option value="Cả Ngày">Một ngày</Option>
                    <Option value="Nhiều Ngày">Nhiều ngày</Option>
                  </Select>
                </div>
                <div id="id_name" style={{ marginTop: 16, display: "none" }}>
                  <DatePicker
                    defaultValue={moment(formatNgay, dateFormatList[0])}
                    format={dateFormatList}
                    placeholder="Chọn ngày đăng ký nghỉ"
                    onChange={(e) => this.onChange(e)}
                    style={{ width: "100%" }}
                  />
                </div>
                <div id="id_name1" style={{ marginTop: 16, display: "none" }}>
                  <DatePicker
                    defaultValue={moment(formatNgay, dateFormatList[0])}
                    format={dateFormatList}
                    placeholder="Chọn ngày bắt đầu"
                    onChange={(e) => this.onChange1(e)}
                    style={{ width: "100%" }}
                  />
                </div>
                <div id="id_name2" style={{ marginTop: 16, display: "none" }}>
                  <DatePicker
                    defaultValue={moment(formatNgay, dateFormatList[0])}
                    format={dateFormatList}
                    placeholder="Chọn ngày kết thúc"
                    onChange={(e) => this.onChange2(e)}
                    style={{ width: "100%" }}
                  />
                </div>
                <div id="id_name5" style={{ marginTop: 16, display: "none" }}>
                  <TextArea
                    style={{ width: "100%" }}
                    placeholder="Lý do nghỉ"
                    autosize={{ minRows: 3, maxRows: 5 }}
                    onChange={(e) => this.onChangeReason(e)}
                  />
                </div>
                <div id="id_name6" style={{ marginTop: 16, display: "none" }}>
                  <Button
                    type="primary"
                    onClick={() => this.onClickRegistrationOff()}
                  >
                    Đăng ký
                  </Button>
                </div>
                <div id="id_name7" style={{ marginTop: 16, display: "none" }}>
                  <Button
                    type="primary"
                    onClick={() => this.onClickRegistrationOffs()}
                  >
                    Đăng ký
                  </Button>
                </div>
              </div>
              <div id="dangKyChamCong" style={{ display: "none" }}>
                <div
                  id="id_name1"
                  style={{ marginTop: 16, width: "100%", display: "flex" }}
                >
                  <Tag color="#f50" style={{ width: "30%" }}>
                    <span style={{ verticalAlign: "middle" }}>
                      Ngày chấm công
                    </span>
                  </Tag>
                  <InputGroup style={{ width: "70%" }} compact>
                    <DatePicker
                      style={{ width: "60%" }}
                      defaultValue={moment(formatNgay, dateFormatList[0])}
                      onChange={(e) => this.onChange3(e)}
                      format={dateFormatList}
                    />
                    <TimePicker
                      style={{ width: "40%" }}
                      defaultValue={moment(formatGio, format)}
                      onChange={(e) => this.onChangeTimePicker(e)}
                      format={format}
                    />
                  </InputGroup>
                </div>
                <div style={{ marginTop: 16, width: "100%", display: "flex" }}>
                  <Tag color="#f50" style={{ width: "30%" }}>
                    <span style={{ verticalAlign: "middle" }}>
                      Loại chấm công
                    </span>
                  </Tag>
                  <Select
                    style={{ width: "70%" }}
                    defaultValue="Vào"
                    onChange={(e) => this.onChangeLoaiChamCong(e)}
                  >
                    <Option value="Vào">Chấm công vào</Option>
                    <Option value="Ra">Chấm công ra</Option>
                  </Select>
                </div>
                <div id="id_name5" style={{ marginTop: 16 }}>
                  <TextArea
                    id="txtGhiChu"
                    style={{ width: "100%" }}
                    placeholder="Ghi chú"
                    autosize={{ minRows: 3, maxRows: 5 }}
                    onKeyUp={(e) => this.onChangeReason(e)}
                  />
                </div>
                <div id="id_name8" style={{ marginTop: 16 }}>
                  <Button
                    type="primary"
                    onClick={() => this.onClickRegistrationTimekeeping()}
                  >
                    Đăng ký
                  </Button>
                </div>
              </div>
              <div id="dangKyDiMuon" style={{ display: "none" }}>
                <div id="id_name" style={{ marginTop: 16 }}>
                  <DatePicker
                    defaultValue={moment(formatNgay, dateFormatList[0])}
                    format={dateFormatList}
                    onChange={(e) => this.onChange4(e)}
                    style={{ width: "100%" }}
                  />
                </div>
                <div id="id_name5" style={{ marginTop: 16 }}>
                  <TextArea
                    id="txtGhiChu"
                    style={{ width: "100%" }}
                    placeholder="Lý do đi muộn"
                    autosize={{ minRows: 3, maxRows: 5 }}
                    onKeyUp={(e) => this.onChangeReason(e)}
                  />
                </div>
                <div id="id_name8" style={{ marginTop: 16 }}>
                  <Button
                    type="primary"
                    onClick={() => this.onClickRegistrationLate()}
                  >
                    Đăng ký
                  </Button>
                </div>
              </div>
              <div id="dangKyLamThemGio" style={{ display: "none" }}>
                <div style={{ marginTop: 16 }}>
                  <DatePicker
                    defaultValue={moment(formatNgay, dateFormatList[0])}
                    format={dateFormatList}
                    onChange={(e) => this.onChange5(e)}
                    style={{ width: "100%" }}
                  />
                </div>
                <div style={{ marginTop: 16, width: "100%", display: "flex" }}>
                  <Tag
                    color="#f50"
                    style={{
                      width: "25%",
                      fontWeight: "bold",
                      textAlign: "center",
                      lineHeight: "2",
                      marginRight: "0px",
                    }}
                  >
                    <span style={{ verticalAlign: "middle" }}>Từ (giờ)</span>
                  </Tag>
                  <TimePicker
                    id="tuGio"
                    style={{ width: "25%" }}
                    defaultValue={moment(formatGioLamThem, format)}
                    onChange={(e) => this.onChangeTimePicker1(e)}
                    format={format}
                  />
                  <Tag
                    color="#f50"
                    style={{
                      width: "25%",
                      fontWeight: "bold",
                      textAlign: "center",
                      lineHeight: "2",
                      marginRight: "0px",
                    }}
                  >
                    <span style={{ verticalAlign: "middle" }}>Đến (giờ)</span>
                  </Tag>
                  <TimePicker
                    id="denGio"
                    style={{ width: "25%" }}
                    defaultValue={moment(formatGio, format)}
                    onChange={(e) => this.onChangeTimePicker2(e)}
                    format={format}
                  />
                </div>
                <div style={{ marginTop: 16 }}>
                  <TextArea
                    id="txtGhiChu"
                    style={{ width: "100%" }}
                    placeholder="Ghi chú"
                    autosize={{ minRows: 3, maxRows: 5 }}
                    onKeyUp={(e) => this.onChangeReason(e)}
                  />
                </div>
                <div style={{ marginTop: 16 }}>
                  <Button
                    type="primary"
                    onClick={() => this.onClickRegistrationBonus()}
                  >
                    Đăng ký
                  </Button>
                </div>
              </div>
              <div id="dangKyCongTac" style={{ display: "none" }}>
                <div style={{ marginTop: 16, width: "100%", display: "flex" }}>
                  <Tag color="#f50" style={{ width: "30%" }}>
                    <span style={{ verticalAlign: "middle" }}>
                      Ngày bắt đầu
                    </span>
                  </Tag>
                  <InputGroup style={{ width: "70%" }} compact>
                    <DatePicker
                      defaultValue={moment(formatNgay, dateFormatList[0])}
                      format={dateFormatList}
                      onChange={(e) => this.onChangeNgayBatDauDiCongTac(e)}
                      style={{ width: "60%" }}
                    />
                    <TimePicker
                      defaultValue={moment(formatGio, format)}
                      onChange={(e) => this.onChangeGioBatDauDiCongTac(e)}
                      format={format}
                      style={{ width: "40%" }}
                    />
                  </InputGroup>
                </div>
                <div style={{ marginTop: 16, width: "100%", display: "flex" }}>
                  <Tag color="#f50" style={{ width: "30%" }}>
                    <span style={{ verticalAlign: "middle" }}>
                      Ngày kết thúc
                    </span>
                  </Tag>
                  <InputGroup style={{ width: "70%" }} compact>
                    <DatePicker
                      defaultValue={moment(formatNgay, dateFormatList[0])}
                      format={dateFormatList}
                      onChange={(e) => this.onChangeNgayKetThucDiCongTac(e)}
                      style={{ width: "60%" }}
                    />
                    <TimePicker
                      defaultValue={moment(formatGio, format)}
                      onChange={(e) => this.onChangeGioKetThucDiCongTac(e)}
                      format={format}
                      style={{ width: "40%" }}
                    />
                  </InputGroup>
                </div>
                <div style={{ marginTop: 16 }}>
                  <TextArea
                    id="txtGhiChuDiCongTac"
                    style={{ width: "100%" }}
                    placeholder="Ghi chú"
                    autosize={{ minRows: 3, maxRows: 5 }}
                    onKeyUp={(e) => this.onChangeReason(e)}
                  />
                </div>
                <div style={{ marginTop: 16 }}>
                  <Button
                    type="primary"
                    onClick={() => this.onClickRegistrationBusiness()}
                  >
                    Đăng ký
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "30px" }}>
          <Tabs type="card">
            <TabPane tab="Chờ phê duyệt" key="1">
              <Row>
                <Table
                  components={this.components}
                  pagination={false}
                  dataSource={this.state.several1}
                  bordered
                  rowKey="id"
                  expandedRowRender={(record, selectedRowKeys) => {
                    return (
                      <div style={{ textAlign: "left" }}>
                        <div style={{ paddingTop: "10px", fontSize: "18px" }}>
                          {" "}
                          Lý do/Ghi chú:{" "}
                        </div>
                        <Row style={{ paddingTop: "7px" }}>
                          {this.state.several1[selectedRowKeys].reason}
                        </Row>
                      </div>
                    );
                  }}
                >
                  <Column
                    title="Tên người đăng lý"
                    dataIndex="fullname"
                    key="fullname"
                  />
                  <Column
                    title="Thời gian đăng ký"
                    dataIndex="day_start"
                    key="day_start"
                  />
                  <Column
                    title="Lý do"
                    className="hidden-action"
                    dataIndex="reason"
                    key="reason"
                  />
                  <Column
                    title="Loại đăng ký"
                    dataIndex="loaidk"
                    key="loaidk"
                  />
                  <Column
                    title="Hành động"
                    dataIndex="id"
                    key="id"
                    render={(text) => (
                      <span>
                        <Tag
                          color="volcano"
                          onClick={() => this.onClickDelete(text)}
                        >
                          Xóa
                        </Tag>
                      </span>
                    )}
                  />
                </Table>
              </Row>
              <Row>
                <Pagination
                  onChange={this.onChangPage1}
                  total={this.state.count1}
                  showSizeChanger
                  onShowSizeChange={this.onShowSizeChange1}
                  showQuickJumper
                />
              </Row>
            </TabPane>
            <TabPane tab="Đã phê duyệt" key="2">
              <Row>
                <Table
                  components={this.components}
                  pagination={false}
                  dataSource={this.state.several2}
                  bordered
                  rowKey="id"
                >
                  <Column
                    title="Tên người đăng ký"
                    dataIndex="fullname"
                    key="fullname"
                  />
                  <Column
                    title="Thời gian đăng ký"
                    dataIndex="day_start"
                    key="day_start"
                  />
                  <Column title="Lý do" dataIndex="reason" key="reason" />
                  <Column
                    title="Loại đăng ký"
                    dataIndex="loaidk"
                    key="loaidk"
                  />
                  <Column
                    title="Người duyệt"
                    dataIndex="nguoiduyet"
                    key="nguoiduyet"
                  />
                </Table>
              </Row>
              <Row>
                <Pagination
                  onChange={this.onChangPage2}
                  total={this.state.count2}
                  showSizeChanger
                  onShowSizeChange={this.onShowSizeChange2}
                  showQuickJumper
                />
              </Row>
            </TabPane>
            <TabPane tab="Không phê duyệt" key="3">
              <Row>
                <Table
                  components={this.components}
                  pagination={false}
                  dataSource={this.state.several3}
                  bordered
                  rowKey="id"
                >
                  <Column
                    title="Tên người đăng ký"
                    dataIndex="fullname"
                    key="fullname"
                  />
                  <Column
                    title="Thời gian đăng ký"
                    dataIndex="day_start"
                    key="day_start"
                  />
                  <Column
                    title="Loại đăng ký"
                    dataIndex="loaidk"
                    key="loaidk"
                  />
                  <Column
                    title="Lý do không phê duyệt"
                    dataIndex="lydo"
                    key="lydo"
                  />
                  <Column
                    title="Người không phê duyệt"
                    dataIndex="nguoiduyet"
                    key="nguoiduyet"
                  />
                </Table>
              </Row>
              <Row>
                <Pagination
                  onChange={this.onChangPage3}
                  total={this.state.count3}
                  showSizeChanger
                  onShowSizeChange={this.onShowSizeChange3}
                  showQuickJumper
                />
              </Row>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
export default Half;

import React from "react";
import {
  Pagination,
  Card,
  Tooltip,
  Icon,
  Table,
  Input,
  message,
  Button,
  Row,
  Col,
  notification,
  Alert,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import cookie from "react-cookies";
import { connect } from "react-redux";
import Request from "@apis/Request";
import "@styles/style.css";
import { fetchLoading } from "@actions/common.action";
import axios from "axios";
const token = cookie.load("token");
const { Column } = Table;
const formatdate = require("dateformat");
class Hopdong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      current: 1,
      page: 1,
      timkiem: [],
      pageSize: 10,
      showPopup: false,
      count: 1,
      show: false,
      visible: false,
      formtype: "horizontal",
      title: "Nhập thông tin cho hợp đồng",
      id_visible: false,
      action: "insert",
      isSearch: 0,
      searchText: "",
      columnSearch: "",
      isSort: true,
      sortBy: "",
      index: "id",
      selectedFile: null,
      orderby: "arrow-up",
      rowthotroselected: {},
      statebuttonedit: true,
      statebuttondelete: true,
      stateconfirmdelete: false,
      selectedRowKeys: [],
      selectedId: [],
      comboBoxDatasource: [],
      comboBoxDuanSource: [],
      propDatasourceSelectLoaiHopDong: {
        dataSource: [],
        label: "Chọn khách hàng là đơn vị:",
        type: "DV",
      },
    };
  }
  deleteHopdong = (nkhd_id) => {
    Request(`hopdong/delete`, "DELETE", { nkhd_id: nkhd_id })
      .then((res) => {
        notification[res.data.success === true ? "success" : "error"]({
          message: "Thông báo",
          description: res.data.message,
        });
        this.getHopdongs(this.state.page);
        this.setState({
          stateconfirmdelete: false,
          statebuttondelete: true,
          statebuttonedit: true,
          selectedRowKeys: [],
        });
        this.render();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getHopdongs = (pageNumber) => {
    let user_cookie = cookie.load("user");
    if (pageNumber <= 0) return;
    this.props.fetchLoading({
      loading: true,
    });
    Request("hotro/getsearch", "POST", {
      pageSize: this.state.pageSize,
      pageNumber: pageNumber,
      index: this.state.index,
      sortBy: this.state.sortBy,
      ns_id_ass: user_cookie,
    }).then((response) => {
      if (response) {
        console.log(response, "response");
        this.setState({
          hopdongs: response.data.data.hopdongs,
          count: response.data.data.count,
        });
      }
    });
    this.props.fetchLoading({
      loading: false,
    });
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8, align: "center" }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={"Từ tìm kiếm"}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, dataIndex, confirm)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, dataIndex, confirm)}
          icon="search"
          size="small"
          style={{ width: 90 }}
        >
          Tìm kiếm
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
  });

  handleSearch = (selectedKeys, value, confirm) => {
    let vl = { values: selectedKeys[0], keys: value };
    if (value && selectedKeys.length > 0) {
      this.state.timkiem.push(vl);
    }
    Request(`hopdong/search1`, "POST", {
      timkiem: this.state.timkiem,
      pageSize: this.state.pageSize,
      pageNumber: this.state.page,
    }).then((res) => {
      notification[res.data.success === true ? "success" : "error"]({
        message: "Đã xuất hiện bản ghi",
        description: res.data.message,
      });
      this.setState({
        hopdongs: res.data.data.hopdongs,
      });
    });
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  onClickHandler = () => {
    const data = new FormData();
    if (this.state.selectedFile !== null) {
      data.append("file", this.state.selectedFile);
      axios
        .post("http://103.74.122.80:5000/upload", data, {
          // receive two    parameter endpoint url ,form data
        })
        .then((res) => {
          // then print response status
          console.log(res.statusText);
        });
    }
  };
  InsertOrUpdateHopdong = () => {
    this.onClickHandler();
    const { form } = this.formRef.props;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      if (this.state.selectedFile !== null) {
        const urlFile =
          "http://103.74.122.80:5000/upload/" + this.state.selectedFile.name;
        values.nkhd_files = urlFile;
      } else {
        values.nkhd_files = " ";
      }
      var url =
        this.state.action === "insert" ? "hopdong/insert" : "hopdong/update";
      Request(url, "POST", values).then((response) => {
        this.setState({
          rowthotroselected: values,
        });
        if ((response.status === 200) & (response.data.success === true)) {
          form.resetFields();
          this.setState({
            visible: false,
            message: response.data.message,
          });
        }
        var description = response.data.message;
        var notifi_type = "success";
        var message = "Thành công";
        if (!!!response.data.success) {
          message = "Có lỗi xảy ra!";
          notifi_type = "error";
          description = response.data.message.map((values) => {
            return <Alert type="error" message={values}></Alert>;
          });
        }
        notification[notifi_type]({
          message: message,
          description: description,
        });
        this.getHopdongs(this.state.page);
      });
    });
  };
  refresh = () => {
    this.getHopdongs(this.state.pageNumber);
  };
  async componentDidMount() {
    await this.getHopdongs(
      this.state.pageNumber,
      this.state.index,
      this.state.sortBy
    );
    document.getElementsByClassName("ant-table-expand-icon-th")[0].innerHTML =
      "Chi tiết";
    document.getElementsByClassName("ant-table-expand-icon-th")[0].style.width =
      "71px";
  }
  onClickDownloadFile = (text) => {
    if (text === " ") {
      alert("Hợp đồng này không có file");
    } else {
      window.open(text);
    }
  };
  onchangpage = (page) => {
    this.setState({
      page: page,
    });
    this.getHopdongs(page);
  };
  onchangeoption = (value) => {
    const { form } = this.formRef.props;
    form.setFieldsValue({
      nkhd_thoigianthuchien: value,
    });
  };
  onChangeSelect = (value) => {
    const { form } = this.formRef.props;
    form.setFieldsValue({
      nkhd_doituong: value,
    });
  };
  showModal = async (hopdong) => {
    Request("hopdong/getdonvi", "POST", null).then((res) => {
      this.setState({
        propDatasourceSelectLoaiHopDong: {
          label: "Chọn khách hàng là đơn vị:",
          dataSource: res.data,
          type: "DV",
        },
      });
      const { form } = this.formRef.props;
      form.setFieldsValue({
        nkhd_doituong: res.data[0].id,
      });
    });
    Request("hopdong/getduan", "POST", null).then((res) => {
      this.setState({
        comboBoxDuanSource: res.data,
      });
    });
    const { form } = this.formRef.props;
    await form.resetFields();
    this.setState({
      visible: true,
      action: "insert",
    });
    form.resetFields();
    if (hopdong.nkhd_id !== undefined) {
      this.setState({
        id_visible: true,
        action: "update",
      });
      var label =
        hopdong.nkhd_loai === "DV"
          ? "Chọn khách hàng là đơn vị:"
          : "Chọn khách hàng là cá nhân:";
      var api =
        hopdong.nkhd_loai === "DV"
          ? "hopdong/getdonvi"
          : "hopdong/getkhachhang";
      const { form } = this.formRef.props;
      Request(api, "post", null).then((res) => {
        this.setState({
          propDatasourceSelectLoaiHopDong: {
            label: label,
            dataSource: res.data,
          },
        });
        form.setFieldsValue({
          nkhd_doituong: hopdong.nkhd_doituong,
        });
      });
      this.setState({
        labelCombobox: label,
      });
      hopdong.nkhd_ngayky =
        hopdong.nkhd_ngayky === null
          ? null
          : formatdate(hopdong.nkhd_ngayky, "yyyy-mm-dd");
      hopdong.nkhd_ngaythanhly =
        hopdong.nkhd_ngaythanhly === null
          ? null
          : formatdate(hopdong.nkhd_ngaythanhly, "yyyy-mm-dd");
      hopdong.nkhd_ngaythanhtoan =
        hopdong.nkhd_ngaythanhtoan === null
          ? null
          : formatdate(hopdong.nkhd_ngaythanhtoan, "yyyy-mm-dd");
      hopdong.nkhd_ngayxuathoadon =
        hopdong.nkhd_ngayxuathoadon === null
          ? null
          : formatdate(hopdong.nkhd_ngayxuathoadon, "yyyy-mm-dd");
      hopdong.nkhd_ngayketthuc =
        hopdong.nkhd_ngayketthuc === null
          ? null
          : formatdate(hopdong.nkhd_ngayketthuc, "yyyy-mm-dd");
      form.setFieldsValue(hopdong);
    }
  };
  handleOK = (e) => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = (e) => {
    this.setState({
      visible: false,
      id_visible: false,
    });
  };
  handleChangeInput = (e) => {
    let state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };
  handleCount = () => {
    let count = this.state.count;
    this.setState({
      count: count + 1,
    });
  };
  confirm = (e) => {
    message.success("Bấm yes để xác nhận");
  };
  cancel = (e) => {
    this.setState({
      stateconfirmdelete: false,
    });
  };
  showTotal = (total) => {
    return `Total ${total} items `;
  };
  onShowSizeChange = async (current, size) => {
    await this.setState({
      pageSize: size,
    });
    if (this.state.isSearch === 1) {
      this.handleSearch(
        this.state.page,
        this.state.searchText,
        this.confirm,
        this.state.nameSearch,
        this.state.codeSearch
      );
    } else {
      this.getHopdongs(this.state.page, this.state.index, this.state.sortBy);
    }
  };
  onChangeSearchType = async (value) => {
    await this.setState({
      columnSearch: value,
    });
    if (this.state.searchText) {
      this.search(this.state.searchText);
    }
  };
  onSearch = (val) => {};
  onHeaderCell = (column) => {
    return {
      onClick: async () => {
        if (this.state.isSort) {
          await this.setState({
            sortBy: "DESC",
            orderby: "arrow-down",
          });
        } else {
          await this.setState({
            sortBy: "ASC",
            orderby: "arrow-up",
          });
        }
        this.setState({
          isSort: !this.state.isSort,
          index: column.dataIndex,
        });
        if (this.state.isSearch === 1) {
          this.search(this.state.searchText);
        } else {
          this.getHopdongs(this.state.page);
        }
      },
    };
  };
  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };
  onChangeFile = async (e) => {
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    var file = e.target.files[0];
    var fileUploadHopdong = await toBase64(file);
    var fileName = file.name;
    this.setState({
      valuefile: fileUploadHopdong,
      valuename: fileName,
    });
  };
  onChangeClick_loaihopdong = (e) => {
    var label =
      e === "DV" ? "Chọn khách hàng là đơn vị:" : "Chọn khách hàng là cá nhân:";
    var api = e === "DV" ? "hopdong/getdonvi" : "hopdong/getkhachhang";
    const { form } = this.formRef.props;
    Request(api, "post", null).then((res) => {
      this.setState({
        propDatasourceSelectLoaiHopDong: {
          label: label,
          dataSource: res.data,
          type: e,
        },
      });
      form.setFieldsValue({
        nkhd_doituong: res.data[0].id,
      });
    });
    this.setState({
      labelCombobox: label,
    });
  };
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };
  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys,
      selectedId: selectedRowKeys,
    });
    if (selectedRowKeys.length > 0) {
      this.setState({
        statebuttondelete: false,
      });
    } else
      this.setState({
        statebuttondelete: true,
      });
    if (selectedRowKeys.length === 1) {
      this.setState({
        statebuttonedit: false,
        rowthotroselected: selectedRows[0],
      });
    } else
      this.setState({
        statebuttonedit: true,
      });
  };
  checkStateConfirm = () => {
    this.setState({
      stateconfirmdelete: true,
    });
  };
  clearChecked = () => {
    this.onSelectChange([], []);
  };
  onRowClick = (row) => {
    this.onSelectChange([row.nkhd_tutang], [row]);
  };
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      hideDefaultSelections: true,
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: (record) => ({
        disabled: Column.title === "Id",
        name: record.name,
      }),
    };
    var dateFormat = require("dateformat");
    if (token)
      return (
        <div>
          <Card>
            <Row>
              <Col span={2}>
                <Tooltip title="Quay lại">
                  <Button
                    shape="round"
                    type="primary"
                    size="default"
                    style={{ marginLeft: "10px" }}
                  >
                    <NavLink to="/hotro" className="">
                      <ArrowLeftOutlined />
                    </NavLink>
                  </Button>
                </Tooltip>
              </Col>
            </Row>
          </Card>
          <Row style={{ marginTop: 5 }}>
            <Table
              onRowClick={this.onRowClick}
              pagination={false}
              dataSource={this.state.hopdongs}
              bordered="1"
              rowKey="nkhd_tutang"
              scroll={{ x: 1000 }}
              dataSource={this.state.hopdongs}
              expandedRowRender={(record, selectedRowKeys) => {
                return (
                  <div style={{ textAlign: "left" }}>
                    <div style={{ paddingTop: "10px", fontSize: "18px" }}>
                      {" "}
                      Nội dung yêu cầu:{" "}
                    </div>
                    <Row style={{ paddingTop: "7px" }}>
                      {this.state.hopdongs[selectedRowKeys].noidung}
                    </Row>
                    <div style={{ paddingTop: "10px", fontSize: "18px" }}>
                      {" "}
                      Ghi chú:{" "}
                    </div>
                    <Row style={{ paddingTop: "7px" }}>
                      {this.state.hopdongs[selectedRowKeys].ghichu}
                    </Row>
                    <div style={{ paddingTop: "10px", fontSize: "18px" }}>
                      {" "}
                      Đơn vị:{" "}
                    </div>
                    <Row style={{ paddingTop: "7px" }}>
                      {this.state.hopdongs[selectedRowKeys].donvi}
                    </Row>
                    <div style={{ paddingTop: "10px", fontSize: "18px" }}>
                      {" "}
                      Khách hàng:{" "}
                    </div>
                    <Row style={{ paddingTop: "7px" }}>
                      {this.state.hopdongs[selectedRowKeys].khachhang}
                    </Row>
                    <div style={{ paddingTop: "10px", fontSize: "18px" }}>
                      {" "}
                      Trạng thái:{" "}
                    </div>
                    <Row style={{ paddingTop: "7px" }}>
                      {this.state.hopdongs[selectedRowKeys].trangthai}
                    </Row>
                    <div style={{ paddingTop: "10px", fontSize: "18px" }}>
                      {" "}
                      Phân loại:{" "}
                    </div>
                    <Row style={{ paddingTop: "7px" }}>
                      {this.state.hopdongs[selectedRowKeys].phanloai}
                    </Row>
                  </div>
                );
              }}
            >
              <Column
                title="Dự án"
                dataIndex="tenduan"
                key="tenduan"
                onHeaderCell={this.onHeaderCell}
              />
              <Column
                title="Người tạo"
                dataIndex="nguoitao"
                key="nguoitao"
                onHeaderCell={this.onHeaderCell}
              />
              <Column
                title="Người được giao"
                dataIndex="nguoiduocgiao"
                key="nguoiduocgiao"
                onHeaderCell={this.onHeaderCell}
              />
              <Column
                title="Ưu tiên"
                dataIndex="uutien"
                key="uutien"
                onHeaderCell={this.onHeaderCell}
              />
              <Column
                title="Thời gian tiếp nhận"
                dataIndex="thoigiantiepnhan"
                key="thoigiantiepnhan"
                onHeaderCell={this.onHeaderCell}
              />
              <Column
                title="Thời gian dự kiến hoàn thành"
                dataIndex="thoigiandukien"
                key="thoigiandukien"
                onHeaderCell={this.onHeaderCell}
              />
              <Column
                title="Thời gian hoàn thành"
                dataIndex="thoigianhoanthanh"
                key="thoigianhoanthanh"
                onHeaderCell={this.onHeaderCell}
              />
            </Table>
          </Row>
          <Row>
            <Pagination
              onChange={this.onchangpage}
              total={this.state.count}
              showSizeChanger
              onShowSizeChange={this.onShowSizeChange}
              showQuickJumper
            />
          </Row>
        </div>
      );
  }
}
const mapStateToProps = (state) => ({
  ...state,
});
export default connect(
  mapStateToProps,
  {
    fetchLoading,
  }
)(Hopdong);

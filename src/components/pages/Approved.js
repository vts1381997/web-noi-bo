import React, { Component } from "react";
import {
  Table,
  Divider,
  Tag,
  Row,
  Pagination,
  Tabs,
  notification,
  Select,
  DatePicker,
} from "antd";
import Request from "@apis/Request";
import { fetchLoading } from "@actions/common.action";
import { connect } from "react-redux";
import cookie from "react-cookies";
import jwt from "jsonwebtoken";
import { Modal } from "antd";
import { Input } from "antd";
import Permisison from "../Authen/Permission";
const { TextArea } = Input;
const token = cookie.load("token");
const payload = jwt.decode(token);
const { Column } = Table;
const { TabPane } = Tabs;
const { Option } = Select;
const dateFormat = "DD/MM/YYYY";
const formatDate = require("dateformat");
class Approved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrSeveral: [],
      selectedRowKeys: [],
      rowthotroselected: {},
      statebuttonedit: true,
      statebuttondelete: true,
      stateconfirmdelete: false,
      selectedId: [],
      dataSourceNhanSu: [],
      pageSize: 10,
      pageNumber: 1,
      page: 1,
      count1: 1,
      count2: 1,
      count3: 1,
      count4: 1,
      count5: 1,
      count6: 1,
      current: 1,
      isSort: true,
      sortBy: "",
      index: "id",
      isSearch: 0,
      textInput: "",
      idpheduyet: "",
      idpheduyetnghi: "",
      valueExprTen: "",
      valueExprLoai: "",
      valueExprTuNgay: "",
      valueExprDenNgay: "",
    };
  }

  getHopdongs = (pageNumber) => {
    //cho phe duyet
    if (pageNumber <= 0) return;
    let duyetnua = payload.claims.indexOf(Permisison.PheDuyet.DuyetNua) >= 0;
    let duyetca = payload.claims.indexOf(Permisison.PheDuyet.DuyetCa) >= 0;
    if (duyetnua && !duyetca) {
      Request("several/get1", "POST", {
        pageSize: this.state.pageSize,
        pageNumber: pageNumber,
        index: this.state.index,
        sortBy: this.state.sortBy,
      }).then((response) => {
        if (response)
          this.setState({
            several: response.data.data.several,
            count1: Number(response.data.data.count),
          });
      });
    } else {
      Request("several/get", "POST", {
        pageSize: this.state.pageSize,
        pageNumber: pageNumber,
        index: this.state.index,
        sortBy: this.state.sortBy,
        duyetnua: duyetnua,
      }).then((response) => {
        if (Number(response.data.data.count) > 0)
          this.setState({
            several: response.data.data.several,
            count1: Number(response.data.data.count),
          });
      });
    }
    this.props.fetchLoading({
      loading: false,
    });
  };

  getHopdong = (pageNumber) => {
    //da phe duyet
    if (pageNumber <= 0) return;
    Request("several/getaccept", "POST", {
      pageSize: this.state.pageSize,
      pageNumber: pageNumber,
      index: this.state.index,
      sortBy: this.state.sortBy,
    }).then((response) => {
      if (Number(response.data.data.count) > 0)
        this.setState({
          severals: response.data.data.several,
          count2: Number(response.data.data.count),
        });
    });
  };

  getHopdongss = (pageNumber) => {
    //khong phe duyet
    if (pageNumber <= 0) return;
    Request("several/getrefuse", "POST", {
      pageSize: this.state.pageSize,
      pageNumber: pageNumber,
      index: this.state.index,
      sortBy: this.state.sortBy,
    }).then((response) => {
      if (Number(response.data.data.count) > 0)
        this.setState({
          severalss: response.data.data.several,
          count3: Number(response.data.data.count),
        });
    });
    this.props.fetchLoading({
      loading: false,
    });
  };

  getChamCong = (pageNumber) => {
    if (pageNumber <= 0) return;
    Request("chamcong/get", "POST", {
      pageSize: this.state.pageSize,
      pageNumber: pageNumber,
      index: this.state.index,
      sortBy: this.state.sortBy,
    }).then((response) => {
      if (response) {
        this.setState({
          choPheDuyet: response.data.data.choPheDuyet,
          count4: Number(response.data.data.count),
        });
      }
    });
    this.props.fetchLoading({
      loading: false,
    });
  };

  getChamCong1 = (pageNumber) => {
    if (pageNumber <= 0) return;
    Request("chamcong/get1", "POST", {
      pageSize: this.state.pageSize,
      pageNumber: pageNumber,
      index: this.state.index,
      sortBy: this.state.sortBy,
    }).then((response) => {
      if (response) {
        this.setState({
          daPheDuyet: response.data.data.daPheDuyet,
          count5: Number(response.data.data.count),
        });
      }
    });
    this.props.fetchLoading({
      loading: false,
    });
  };

  getChamCong2 = (pageNumber) => {
    if (pageNumber <= 0) return;
    Request("chamcong/get2", "POST", {
      pageSize: this.state.pageSize,
      pageNumber: pageNumber,
      index: this.state.index,
      sortBy: this.state.sortBy,
    }).then((response) => {
      if (response) {
        this.setState({
          khongPheDuyet: response.data.data.khongPheDuyet,
          count6: Number(response.data.data.count),
        });
      }
    });
    this.props.fetchLoading({
      loading: false,
    });
  };

  handleCount = () => {
    let count1 = this.state.count1;
    let count2 = this.state.count2;
    let count3 = this.state.count3;
    let count4 = this.state.count4;
    let count5 = this.state.count5;
    let count6 = this.state.count6;
    this.setState({
      count1: count1 + 1,
      count2: count2 + 1,
      count3: count3 + 1,
      count4: count4 + 1,
      count5: count5 + 1,
      count6: count6 + 1,
    });
  };

  async componentDidMount() {
    await this.getHopdongs(this.state.pageNumber, this.state.index);
    await this.getHopdong(this.state.pageNumber, this.state.index);
    await this.getHopdongss(this.state.pageNumber, this.state.index);
    await this.getChamCong(this.state.pageNumber, this.state.index);
    await this.getChamCong1(this.state.pageNumber, this.state.index);
    await this.getChamCong2(this.state.pageNumber, this.state.index);
    Request("nhansu/getall", "POST", {}).then((res) => {
      if (res.data.success) {
        this.setState({
          dataSourceNhanSu: res.data.data,
        });
      }
    });
  }

  onClickPheDuyet = (text) => {
    this.state.several.map((value) => {
      let username = payload.userName;
      if (text === value.id) {
        Request("several/update", "POST", { value, username }).then(
          (response) => {
            if ((response.status === 200) & (response.data.success === true)) {
              this.getHopdong(this.state.page);
              this.getHopdongs(this.state.page);
              this.getHopdongss(this.state.page);
            }
          }
        );
      }
    });
  };

  onClickPheDuyetChamCong = (text) => {
    Request("chamcong/updateApproved", "POST", { chamcongid: text }).then(
      (response) => {
        if ((response.status === 200) & (response.data.success === true)) {
          this.getChamCong(this.state.page);
          this.getChamCong1(this.state.page);
          this.getChamCong2(this.state.page);
        }
      }
    );
  };

  onClickKhongPheDuyet = (text) => {
    this.setState({
      visible: true,
      idpheduyetnghi: text,
      textInput: "",
    });
  };

  onClickKhongPheDuyetChamCong = (text) => {
    this.setState({
      visible1: true,
      idpheduyet: text,
      textInput: "",
    });
  };

  onchangpage1 = (page) => {
    this.setState({
      page: page,
    });
    this.getHopdongs(page);
  };

  onchangpage2 = (page) => {
    this.setState({
      page: page,
    });
    this.getHopdong(page);
  };

  onchangpage3 = (page) => {
    this.setState({
      page: page,
    });
    this.getHopdongss(page);
  };

  onchangpage4 = (page) => {
    this.setState({
      page: page,
    });
    this.getChamCong(page);
  };

  onchangpage5 = (page) => {
    this.setState({
      page: page,
    });
    this.getChamCong1(page);
  };

  onchangpage6 = (page) => {
    this.setState({
      page: page,
    });
    this.getChamCong2(page);
  };

  refresh = () => {
    this.getHopdong(this.state.pageNumber);
    this.getHopdongs(this.state.pageNumber);
    this.getHopdongss(this.state.pageNumber);
    this.getChamCong(this.state.pageNumber);
    this.getChamCong1(this.state.pageNumber);
    this.getChamCong2(this.state.pageNumber);
  };

  onShowSizeChange = async (current, size) => {
    await this.setState({
      pageSize: size,
    });
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

  onRowClick = (row) => {
    if (this.state.selectedRowKeys[0] === row.id) {
      this.onSelectChange([], []);
    } else {
      this.onSelectChange([row.id], [row]);
    }
  };

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
          this.getHopdongss(this.state.page);
          this.getChamCong(this.state.page);
          this.getHopdong(this.state.page);
          this.getHalf(this.state.page);
          this.getHalfs(this.state.page);
          this.getHalfss(this.state.page);
        }
      },
    };
  };

  onchangeText = (e) => {
    this.setState({
      textInput: e.target.value,
    });
  };

  handleOk = (e) => {
    if (this.state.textInput == "") {
      notification["warning"]({
        message: "Cảnh Báo",
        description: "Lý do không được để trống",
      });
    } else {
      let inp = this.state.textInput;
      let username = payload.userName;
      let id = this.state.idpheduyetnghi;
      Request("several/update4", "POST", { inp, username, id }).then(
        (response) => {
          if ((response.status === 200) & (response.data.success === true)) {
            this.getHopdong(this.state.page);
            this.getHopdongs(this.state.page);
            this.getHopdongss(this.state.page);
            this.setState({
              visible: false,
            });
          }
        }
      );
    }
  };

  handleOkChamCong = (e) => {
    var chamcongid = this.state.idpheduyet;
    var lydo = this.state.textInput;
    if (lydo == "") {
      notification["warning"]({
        message: "Cảnh Báo",
        description: "Lý do không được để trống",
      });
    } else {
      Request("chamcong/updateRefuse", "POST", { chamcongid, lydo }).then(
        (response) => {
          if ((response.status === 200) & (response.data.success === true)) {
            this.getChamCong(this.state.page);
            this.getChamCong1(this.state.page);
            this.getChamCong2(this.state.page);
            this.setState({
              visible1: false,
            });
          }
        }
      );
    }
  };

  handleCancel = (e) => {
    document.getElementById("pheDuyetNghi").value = "";
    this.setState({
      visible: false,
    });
  };

  handleCancel1 = (e) => {
    document.getElementById("pheDuyetChamCong").value = "";
    this.setState({
      visible1: false,
    });
  };

  getSearch = () => {
    Request("several/getsearch", "POST", {
      pageSize: this.state.pageSize,
      pageNumber: this.state.page,
      ten: this.state.valueExprTen,
      loai: this.state.valueExprLoai,
      tungay: this.state.valueExprTuNgay,
      denngay: this.state.valueExprDenNgay,
    }).then((response) => {
      this.setState({
        severals: response.data.data.several,
        count2: Number(response.data.data.count),
      });
    });
  };

  handleChangeSelectTen = (e) => {
    this.setState(
      {
        pageSize: 10,
        page: 1,
        valueExprTen: e || "",
      },
      () => {
        this.getSearch();
      }
    );
  };

  handleChangeSelectLoai = (e) => {
    this.setState(
      {
        pageSize: 10,
        page: 1,
        valueExprLoai: e || "",
      },
      () => {
        this.getSearch();
      }
    );
  };

  handleChangeDatePickerTuNgay = (e) => {
    this.setState(
      {
        pageSize: 10,
        page: 1,
        valueExprTuNgay: e ? formatDate(e._d, "dd/mm/yyyy") : "",
      },
      () => {
        this.getSearch();
      }
    );
  };

  handleChangeDatePickerDenNgay = (e) => {
    this.setState(
      {
        pageSize: 10,
        page: 1,
        valueExprDenNgay: e ? formatDate(e._d, "dd/mm/yyyy") : "",
      },
      () => {
        this.getSearch();
      }
    );
  };

  render() {
    var combobox = [];
    this.state.dataSourceNhanSu.map((value) => {
      combobox.push(<Option value={value.name}>{value.fullname}</Option>);
    });
    let duyetnua = payload.claims.indexOf(Permisison.PheDuyet.DuyetNua) >= 0;
    let duyetca = payload.claims.indexOf(Permisison.PheDuyet.DuyetCa) >= 0;
    return (
      <div>
        <Modal
          title="Lý do không phê duyệt nghỉ"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <TextArea
            id="pheDuyetNghi"
            rows={4}
            onChange={(e) => this.onchangeText(e)}
          />
        </Modal>
        <Modal
          title="Lý do không phê duyệt chấm công"
          visible={this.state.visible1}
          onOk={this.handleOkChamCong}
          onCancel={this.handleCancel1}
        >
          <TextArea
            id="pheDuyetChamCong"
            rows={4}
            onChange={(e) => this.onchangeText(e)}
          />
        </Modal>
        <Tabs type="card">
          {duyetca || duyetnua ? (
            <TabPane tab="Chờ phê duyệt" key="1">
              <Row>
                <Table
                  components={this.components}
                  pagination={false}
                  dataSource={this.state.several}
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
                          {this.state.several[selectedRowKeys].reason}
                        </Row>
                      </div>
                    );
                  }}
                >
                  <Column
                    title="Tên người đăng lý"
                    dataIndex="fullname"
                    key="fullname"
                    onHeaderCell={this.onHeaderCell}
                  />
                  <Column
                    title="Thời gian đăng ký"
                    dataIndex="day_start"
                    key="day_start"
                    onHeaderCell={this.onHeaderCell}
                  />
                  <Column
                    title="Lý do"
                    className="hidden-action"
                    dataIndex="reason"
                    key="reason"
                    onHeaderCell={this.onHeaderCell}
                  />
                  <Column
                    title="Loại đăng ký"
                    dataIndex="loaidk"
                    key="loaidk"
                    onHeaderCell={this.onHeaderCell}
                  />
                  <Column
                    title="Hành động"
                    dataIndex="id"
                    key="id"
                    render={(text) => (
                      <span>
                        <Tag
                          color="geekblue"
                          onClick={() => this.onClickPheDuyet(text)}
                        >
                          Phê duyệt
                        </Tag>
                        <Divider type="vertical" />
                        <Tag
                          color="volcano"
                          onClick={() => this.onClickKhongPheDuyet(text)}
                        >
                          Không phê duyệt
                        </Tag>
                      </span>
                    )}
                  />
                </Table>
              </Row>
              <Row>
                <Pagination
                  onChange={this.onchangpage1}
                  total={this.state.count1}
                  showSizeChanger
                  onShowSizeChange={this.onShowSizeChange}
                  showQuickJumper
                />
              </Row>
            </TabPane>
          ) : null}
          <TabPane tab="Đã phê duyệt" key="2">
            <Select
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0 ||
                option.props.value.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
              }
              style={{
                width: "20%",
                marginRight: "20px",
                marginBottom: "16px",
              }}
              placeholder="Tìm kiếm theo tên"
              onChange={this.handleChangeSelectTen}
            >
              {combobox}
            </Select>
            <Select
              allowClear
              showSearch
              style={{
                width: "30%",
                marginRight: "20px",
                marginBottom: "16px",
              }}
              placeholder="Tìm kiếm theo loại đăng ký"
              onChange={this.handleChangeSelectLoai}
            >
              <Option key="Đăng Ký Làm Thêm Giờ">Đăng Ký Làm Thêm Giờ</Option>
              <Option key="Đăng Ký Nghỉ Sáng">Đăng Ký Nghỉ Sáng</Option>
              <Option key="Đăng Ký Nghỉ Chiều">Đăng Ký Nghỉ Chiều</Option>
              <Option key="Đăng Ký Nghỉ Cả Ngày">Đăng Ký Nghỉ Cả Ngày</Option>
              <Option key="Đăng Ký Nghỉ Nhiều Ngày">
                Đăng Ký Nghỉ Nhiều Ngày
              </Option>
              <Option key="Đăng Ký Chấm Công Vào">Đăng Ký Chấm Công Vào</Option>
              <Option key="Đăng Ký Chấm Công Ra">Đăng Ký Chấm Công Ra</Option>
              <Option key="Đăng Ký Đi Muộn">Đăng Ký Đi Muộn</Option>
              <Option key="Đăng Ký Đi Công Tác">Đăng Ký Đi Công Tác</Option>
            </Select>
            <DatePicker
              style={{
                marginRight: "20px",
                marginBottom: "16px",
              }}
              placeholder="Từ ngày"
              format={dateFormat}
              onChange={this.handleChangeDatePickerTuNgay}
            />
            <DatePicker
              style={{
                marginRight: "20px",
                marginBottom: "16px",
              }}
              placeholder="Đến ngày"
              format={dateFormat}
              onChange={this.handleChangeDatePickerDenNgay}
            />
            <Row>
              <Table
                components={this.components}
                pagination={false}
                dataSource={this.state.severals}
                bordered
                rowKey="id"
              >
                <Column
                  title="Tên người đăng ký"
                  dataIndex="fullname"
                  key="fullname"
                  onHeaderCell={this.onHeaderCell}
                />
                <Column
                  title="Thời gian đăng ký"
                  dataIndex="day_start"
                  key="day_start"
                  onHeaderCell={this.onHeaderCell}
                />
                <Column
                  title="Loại đăng ký"
                  dataIndex="loaidk"
                  key="loaidk"
                  onHeaderCell={this.onHeaderCell}
                />
                <Column
                  title="Lý do"
                  dataIndex="reason"
                  key="reason"
                  onHeaderCell={this.onHeaderCell}
                />
                <Column
                  title="Người duyệt"
                  dataIndex="nguoiduyet"
                  key="nguoiduyet"
                  onHeaderCell={this.onHeaderCell}
                />
              </Table>
            </Row>
            <Row>
              <Pagination
                onChange={this.onchangpage2}
                total={this.state.count2}
                showSizeChanger
                onShowSizeChange={this.onShowSizeChange}
                showQuickJumper
              />
            </Row>
          </TabPane>
          <TabPane tab="Không phê duyệt" key="3">
            <Row>
              <Table
                components={this.components}
                pagination={false}
                dataSource={this.state.severalss}
                bordered
                rowKey="id"
              >
                <Column
                  title="Tên người đăng ký"
                  dataIndex="fullname"
                  key="fullname"
                  onHeaderCell={this.onHeaderCell}
                />
                <Column
                  title="Thời gian đăng ký"
                  dataIndex="day_start"
                  key="day_start"
                  onHeaderCell={this.onHeaderCell}
                />
                <Column
                  title="Loại đăng ký"
                  dataIndex="loaidk"
                  key="loaidk"
                  onHeaderCell={this.onHeaderCell}
                />
                <Column
                  title="Lý do không phê duyệt"
                  dataIndex="lydo"
                  key="lydo"
                  onHeaderCell={this.onHeaderCell}
                />
                <Column
                  title="Người không phê duyệt"
                  dataIndex="nguoiduyet"
                  key="nguoiduyet"
                  onHeaderCell={this.onHeaderCell}
                />
              </Table>
            </Row>
            <Row>
              <Pagination
                onChange={this.onchangpage3}
                total={this.state.count3}
                showSizeChanger
                onShowSizeChange={this.onShowSizeChange}
                showQuickJumper
              />
            </Row>
          </TabPane>
        </Tabs>
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
)(Approved);
//export default Approved;

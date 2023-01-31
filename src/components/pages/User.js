import React from "react";
import {
  Pagination,
  Tooltip,
  Icon,
  Table,
  Input,
  Modal,
  Popconfirm,
  message,
  Button,
  Form,
  Row,
  Col,
  notification,
  Alert,
} from "antd";
import cookie from "react-cookies";
import { connect } from "react-redux";
import Login from "@components/Authen/Login";
import Request from "@apis/Request";
import { fetchUser } from "@actions/user.action";
import { fetchLoading } from "@actions/common.action";
import "@styles/style.css";
import jwt from "jsonwebtoken";
import Permission from "../Authen/Permission";
import TreeRole from "../common/Tree";
import SearchModal from "../common/searchModal";
const { Column } = Table;
const token = cookie.load("token");

const payload = jwt.decode(token);
const FormModal = Form.create({ name: "form_in_modal" })(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        messageRequired: "Trường này không được bỏ trống!",
      };
    }
    render() {
      const {
        visible,
        onCancel,
        onSave,
        Data,
        form,
        title,
        confirmLoading,
        formtype,
        id_visible,
      } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title={title}
          okText="Lưu"
          onCancel={onCancel}
          onOk={onSave}
          confirmLoading={confirmLoading}
          width={1000}
        >
          <Form layout={formtype}>
            <Row gutter={24}>
              <Col span={24}>
                <div style={{ display: "none" }}>
                  <Form.Item label="Id:">
                    {getFieldDecorator("id", {})(
                      <Input type="number" disabled />
                    )}
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Tên đầy đủ:">
                  {getFieldDecorator("fullname", {
                    rules: [
                      { required: true, message: this.state.messageRequired },
                    ],
                  })(<Input type="text" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Mã Định Danh(CMT / Thẻ căn cước):">
                  {getFieldDecorator("madinhdanh", {
                    rules: [
                      { required: true, message: this.state.messageRequired },
                    ],
                  })(<Input type="text" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Tên đăng nhập">
                  {getFieldDecorator("name", {
                    rules: [
                      { required: true, message: this.state.messageRequired },
                    ],
                  })(<Input type="text" placeholder="user name" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Mật khẩu:">
                  {getFieldDecorator("password", {
                    rules: [
                      { required: true, message: this.state.messageRequired },
                    ],
                  })(<Input type="password" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Email:">
                  {getFieldDecorator("email", {
                    rules: [
                      { required: true, message: this.state.messageRequired },
                      { email: true, message: "Trường này phải là email!" },
                    ],
                  })(<Input type="email" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Số điện thoại:">
                  {getFieldDecorator("phone", {
                    rules: [
                      { required: true, message: this.state.messageRequired },
                    ],
                  })(<Input type="phone" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      );
    }
  }
);

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      current: 1,
      page: 1,
      pageSize: 10,
      showPopup: false,
      count: 1,
      show: false,
      visible: false,
      formtype: "horizontal",
      title: "Nhập thông tin",
      id_visible: false,
      action: "insert",
      isSearch: 0,
      searchText: "",
      columnSearch: "name",
      isSort: true,
      sortBy: "ASC",
      index: "name",
      orderby: "arrow-up",
      nameSearch: "",
      emailSearch: "",
      phoneSearch: "",
      passwordSearch: "",
      fullnameSearch: "",
      codeSearch: "",
      roleVisible: "none",
      modalRoleVisible: false,
      actionColumn: "hidden-action",
      users: [],
      selectedRowKeys: [],
    };
  }

  deleteUser = async (id) => {
    await Request(`user/delete`, "DELETE", { id: id }).then((res) => {
      notification[res.data.success === true ? "success" : "error"]({
        message: "Thông báo",
        description: res.data.message,
      });
    });
    this.getUsers(this.state.page);
  };

  getUsers = (pageNumber) => {
    if (pageNumber <= 0) return;
    Request("user/get", "POST", {
      pageSize: this.state.pageSize,
      pageNumber: pageNumber,
      index: this.state.index,
      sortBy: this.state.sortBy,
    }).then((response) => {
      if (response) {
        let data = response.data;
        let objUsers = Object.keys(data.data.users[0]);
        if (data.data)
          this.setState({
            objUsers: objUsers,
            users: data.data.users,
            count: Number(data.data.count),
          });
        this.props.fetchLoading({
          loading: false,
        });
      }
    });
  };

  InsertOrUpdateUser = () => {
    const { form } = this.formRef.props;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      var url = this.state.action === "insert" ? "user/insert" : "user/update";
      Request(url, "POST", values).then((response) => {
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
          message = "Lỗi Cmnr";
          notifi_type = "error";
          description = response.data.message.map((value, index) => {
            return <Alert type="error" message={value}></Alert>;
          });
        }
        //thông báo lỗi vòa thành công
        notification[notifi_type]({
          message: message,
          description: description,
        });
        this.getUsers(this.state.page);
      });
    });
  };

  refresh = (pageNumber) => {
    this.getUsers(this.state.pageNumber);
  };

  componentDidMount() {
    this.getUsers(this.state.pageNumber);
  };

  onchangpage = async (page) => {
    await this.setState({
      page: page,
    });

    if (this.state.isSearch === 1) {
      this.search(this.state.searchText);
    } else {
      this.getUsers(page);
    }
  };

  showModal = (user) => {
    const { form } = this.formRef.props;
    this.setState({
      visible: true,
    });
    form.resetFields();
    if (user.id !== undefined) {
      this.setState({
        id_visible: true,
        action: "update",
      });
      form.setFieldsValue(user);
    }
  };

  handleOk = (e) => {
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

  cancel = (e) => {};

  showTotal = (total) => {
    return `Total ${total} items`;
  };

  onShowSizeChange = async (current, size) => {
    await this.setState({
      pageSize: size,
    });
    if (this.state.searchText) {
      this.search(this.state.searchText);
    } else {
      this.getUsers(this.state.page);
    }
  };

  search = async (xxxx) => {
    Request("user/search", "POST", {
      pageSize: this.state.pageSize,
      pageNumber: this.state.page,
      searchText: xxxx,
      columnSearch: this.state.columnSearch,
      p1: this.state.index,
      p2: this.state.sortBy,
    }).then((response) => {
      let data = response.data;

      if (data.data)
        this.setState({
          users: data.data.users,
          count: Number(data.data.count),  
          searchText: xxxx,
          isSearch: 1,
        });
    });
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
        if (this.state.isSearch == 1) {
          this.search(this.state.searchText);
        } else {
          this.getUsers(this.state.page);
        }
      },
    };
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };
  removeSearch = () => {
    this.setState({
      searchText: "",
    });
  };
  onchangeSearch = (event) => {
    let value = event.target.value;
    this.search(value);
  };
  ChangeCheckbox = () => {};
  showmodalRole = async (name) => {
    this.setState({
      modalRoleVisible: true,
    });
  };
  okRole = async (e) => {
    let user = this.state.selectedId;
    let a = this.child.state.checkedKeys;
    Request("setpermission", "POST", { a, user }).then((res) => {});
    await this.setState({
      modalRoleVisible: false,
    });
  };

  cancelRole = (e) => {
    this.setState({
      modalRoleVisible: false,
    });
  };
  changeRows = (selectedRowKeys, selectedRows) => {};

  handleClickRow(rowIndex) {
    let users = this.state.users;
    users[rowIndex].Selected = true;
    this.setState({
      users: users,
    });
  }
  render() {
    let token = cookie.load("token");
    if (!token || !jwt.decode(token)) {
      return <Login />;
    }
    let claims = payload.claims;
    let canPermiss = claims.indexOf(Permission.Role.Permiss) >= 0;
    let canRead = claims.indexOf(Permission.User.Read) >= 0;
    let canUpdate = claims.indexOf(Permission.User.Update) >= 0;
    let canDelete = claims.indexOf(Permission.User.Delete) >= 0;
    let canCreate = claims.indexOf(Permission.User.Insert) >= 0;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      type: "radio",
      hideDefaultSelections: true,
      selectedRowKeys,
      onChange: async (selectedRowKeys, selectedRows) => {
        let sl = selectedRowKeys[0];
        await Request("checkrole", "POST", { sl }).then((res) => {
          let data = res.data;
          let a = data.map(function(value) {
            return (a = {
              role: value.split(".")[0],
              acton: value.split(".")[1],
            });
          });
          this.setState({
            dataTree: data,
          });
        });
        if (selectedRows[0]) {
          await this.setState({
            selectedId: selectedRowKeys[0],
            user: selectedRows[0],
            selectedRowKeys,
          });
        }
      },

      getCheckboxProps: (record) => ({
        disabled: Column.title === "Id", // Column configuration not to be checked
        name: record.name,
      }),
    };
    return (
      <div>
        <div>
          <Modal
            title="Phân quyền "
            visible={this.state.modalRoleVisible}
            onOk={this.okRole}
            onCancel={this.cancelRole}
          >
            <TreeRole
              ref={(instance) => (this.child = instance)}
              dataTree={this.state.dataTree}
            />
          </Modal>

          <SearchModal
            col={this.state.objUsers}
            changesearch={this.onchangeSearch}
            remove={this.removeSearch}
            callback={this.search}
            onchangeSearch={this.onChangeSearchType}
          />
          <div style={{ display: "flex" }}>
            {canPermiss ? (
              <div>
                <Tooltip title="Phân quyền">
                  <Button
                    shape="round"
                    style={{ margin: "20px" }}
                    onClick={this.showmodalRole.bind(
                      this,
                      this.state.selectedId
                    )}
                  >
                    <Icon type="user" />
                  </Button>
                </Tooltip>
              </div>
            ) : null}
            {canUpdate ? (
              <div>
                <Tooltip title="Sửa User">
                  <Button
                    shape="round"
                    style={{ margin: "20px" }}
                    onClick={this.showModal.bind(this, this.state.user)}
                  >
                    <Icon type="edit" />
                  </Button>
                </Tooltip>
              </div>
            ) : null}

            {canCreate ? (
              <div>
                <Tooltip title="Thêm User">
                  <Button
                    shape="round"
                    style={{ margin: "20px" }}
                    onClick={this.showModal.bind(null)}
                  >
                    <Icon type="user-add" />
                  </Button>
                </Tooltip>
              </div>
            ) : null}
            {canDelete ? (
              <Tooltip title="Xóa User">
                <Popconfirm
                  title="Bạn chắc chắn muốn xóa?"
                  onConfirm={this.deleteUser.bind(this, this.state.selectedId)}
                  onCancel={this.cancel}
                  okText="Có"
                  cancelText="Không"
                >
                  <Button
                    shape="round"
                    type="danger"
                    style={{ margin: "20px" }}
                  >
                    <Icon type="delete" />
                  </Button>
                </Popconfirm>
              </Tooltip>
            ) : null}
          </div>

          <div>
            <div>
              <Row className="table-margin-bt">
                <FormModal
                  datacha={this.state.datacha}
                  wrappedComponentRef={this.saveFormRef}
                  visible={this.state.visible}
                  onCancel={this.handleCancel}
                  onSave={this.InsertOrUpdateUser}
                  title={this.state.title}
                  formtype={this.state.formtype}
                  id_visible={this.state.id_visible}
                />

                <Table
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: async (event) => {
                        // this.handleClickRow.bind(this, rowIndex)
                        // await this.setState({
                        //   selectedRowKeys: [record.name],
                        //   selectedId: record.name,
                        //   user: record
                        // })
                      },
                    };
                  }}
                  expandRowByClick="true"
                  onChange={this.changeRows}
                  pagination={false}
                  rowSelection={rowSelection}
                  dataSource={this.state.users}
                  rowKey="name"
                >
                  <Column
                    className="hidden-action"
                    title={
                      <span>
                        Id <Icon type={this.state.orderby} />
                      </span>
                    }
                    dataIndex="id"
                    key="id"
                    onHeaderCell={this.onHeaderCell}
                  />
                  <Column
                    title={
                      <span>
                        Tên đăng nhập
                        <Icon type={this.state.orderby} />
                      </span>
                    }
                    dataIndex="name"
                    key="name"
                    onHeaderCell={this.onHeaderCell}
                  />
                  <Column
                    className="hidden-action"
                    title="Password"
                    dataIndex="password"
                    key="password"
                    onHeaderCell={this.onHeaderCell}
                  />
                  <Column
                    title="Số điện thoại"
                    dataIndex="phone"
                    key="phone"
                    onHeaderCell={this.onHeaderCell}
                  />
                  <Column
                    title="Tên đầy đủ"
                    dataIndex="fullname"
                    key="fullname"
                    onHeaderCell={this.onHeaderCell}
                  />
                  <Column
                    title="Email"
                    dataIndex="email"
                    key="email"
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
          </div>
        </div>
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
    fetchUser,
    fetchLoading,
  }
)(User);

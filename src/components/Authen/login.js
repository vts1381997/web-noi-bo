import React, { Component } from "react";
import Request from "@apis/Request";
import { Form, Icon, Input, Button, message } from "antd";
import cookie from "react-cookies";
import logo from "@images/logo.png";
import "@styles/login.css";

class NormalLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loadding: false,
    };
  }

  Login = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var user = {
          username: this.state.username,
          password: this.state.password,
        };
        Request("Login", "POST", user);
        Request("Login", "POST", values)
          .then((response) => {
            if (response.data.success === true) {
              let data = response.data;
              cookie.save("token", data.token, { path: "/" });
              cookie.save("role", data.role, {});
              cookie.save("user", this.state.username);
              window.location.reload();
            } else {
              message.error(response.data.message);
              this.LoadingButton(500);
            }
          })
          .catch((res) => {
            message.err("Có lỗi xảy ra!");
            this.LoadingButton(500);
          });
      }
    });
  };

  getState = () => {};

  handleChangeInput = (e) => {
    var user = this.props.form.getFieldsValue(["username", "password"]);
    this.setState(user);
  };

  LoadingButton = (time) => {
    this.setState({
      loadding: true,
    });
    setTimeout(() => {
      this.setState({
        loadding: false,
      });
    }, time);
  };

  onEnter = () => {};

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-page">
        <img
          src={logo}
          className="background-login"
          alt=""
          style={{ marginTop: "0px" }}
        />
        <Form onSubmit={this.Login} className="login-form">
          <h3
            style={{
              fontSize: "20px",
              fontStyle: "italic",
              fontWeight: "bold",
              textAlign: "center",
              color: "#40a9ff",
            }}
          >
            Đăng nhập hệ thống
          </h3>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: "Tên đăng nhập không  được để trống!",
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Tên tài khoản"
                onBlur={this.handleChangeInput}
                type={"text"}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Mật khẩu không được để trống!" },
              ],
            })(
              <Input.Password
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Mật khẩu"
                onBlur={this.handleChangeInput}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              className="login-form-forgot"
              href="/"
              style={{ backgroundColor: "white", color: "black" }}
            >
              Quên Mật Khẩu
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={this.state.loadding}
            >
              Đăng Nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const Login = Form.create({ name: "normal_login" })(NormalLoginForm);
export default Login;

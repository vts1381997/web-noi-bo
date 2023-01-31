import React, { Component } from 'react';
import { Input, message, Row, Col, Button } from 'antd';
import cookie from 'react-cookies'
import jwt from 'jsonwebtoken'
import Axios from 'axios';
import Request from '@apis/Request'

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passcu: '',
            passmoi: '',
            passnhaplai: ''

        }
    }
    ChangePass = () => {
        let user = {
            username: this.state.username,
            password: this.state.passcu,
        };
        Request('Login', 'POST', user).then(res => {
            if (res.data.success) {
                if (this.state.passmoi == this.state.passnhaplai) {
                    let user1 = {
                        username: this.state.username,
                        password: this.state.passnhaplai
                    }
                    Request('changepass', 'POST', user1).then(response => {
                        if(response.data.success){
                            window.location.href="/ok"

                        }
                    })
                } else {
                    message.error('Nhập lại MK ');

                }
            }
            else{
                message.error('sai mk cũ rồi nhóc')
            }
        })
    }
    passcu = (e) => {
        this.setState({
            passcu: e.target.value
        })
    }
    passmoi = (e) => {
        this.setState({
            passmoi: e.target.value
        })
    }
    passnhaplai = (e) => {
        this.setState({
            passnhaplai: e.target.value
        })
    }
    componentDidMount() {
        var token = cookie.load('token');
        var payload = jwt.decode(token);
        this.setState({
            username:payload.userName
        })
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={12}>
                        Mật khẩu cũ: <Input onChange={this.passcu} type="password" />
                        Mật khẩu mới: <Input onChange={this.passmoi} type="password" />
                        Nhập lại mật khẩu: <Input onChange={this.passnhaplai} type="password" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button style={{ marginTop: '20px' }} onClick={this.ChangePass}>Thay đổi</Button>

                    </Col>
                </Row>


            </div>
        );
    }
}

export default ChangePassword;
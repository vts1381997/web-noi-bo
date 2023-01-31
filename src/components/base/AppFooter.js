import React, { Component } from 'react';
import { Layout } from 'antd';
import { Popover } from 'antd';
import $ from 'jquery';
import '@styles/appFooter.css';
import io from 'socket.io-client';
import cookie from 'react-cookies';
import Request from '@apis/Request';
var socket = io('http://103.74.122.80:6969');
// var socket = io('fscvn.ddns.net:6969');
// var socket = io('localhost:6969');
var userOnline = [];
var userOffline = [];
const { Footer } = Layout;
function arr_diff(a1, a2) {
    var a = [], diff = [];
    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }
    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }
    for (var k in a) {
        diff.push(k);
    }
    return diff;
}
class AppFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mangUser: ''
        }
    }
    state = {
        visible: false,
    };
    hide = () => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = visible => {
        var html = "";
        var html1 = "";
        var arr = [];
        Request('nhansu/getall', 'POST', null).then((response) => {
            if (response.data.success == true) {
                var data = response.data.data;
                data.map(value => {
                    arr.push(value.name)
                })
                userOffline = arr_diff(userOnline, arr)
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < userOnline.length; j++) {
                        if (data[i].name == userOnline[j]) {
                            html = html + '<div style="display: -webkit-box;"><img id=' + data[i].name + ' src="http://103.74.122.80:5000/uploads/OK.png"/><p>' + data[i].fullname + '</p></div>';
                        }
                    }
                }
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < userOffline.length; j++) {
                        if (data[i].name == userOffline[j]) {
                            html1 = html1 + '<div style="display: -webkit-box;"><img id=' + data[i].name + ' src="http://103.74.122.80:5000/uploads/KO.png"/><p>' + data[i].fullname + '</p></div>';
                        }
                    }
                }
                $("#listUsersOnline").html(html + html1)
            }
        })
        this.setState({ visible });
    };
    componentDidMount() {
        socket.on("user disconnected", function (data) {
            for (var i = 0; i < userOnline.length; i++) {
                if (userOnline[i] == data) {
                    userOnline.splice(i, 1)
                }
            }
            localStorage.setItem("listUserOnline", data)
        })
        socket.on("server-send-request", function (data) {
            userOnline = data;
            localStorage.setItem("listUserOnline", data)
        });
        let user_cookie = cookie.load('user');
        socket.emit("user-send-request", user_cookie);
    }
    render() {
        return (
            <Footer style={{ textAlign: 'center', fontSize: '12px', padding: '5px' }}>
                <div id="appFooter" tabindex="0" role="button" style={{ cursor: "pointer", outline: "none", paddingLeft: "75%" }}>
                    <Popover
                        content={
                            <div id="listUsersOnline" style={{ overflow: "auto", height: "400px" }}></div>
                        }
                        title="Trạng thái hoạt động"
                        trigger="click"
                        visible={this.state.visible}
                        onVisibleChange={this.handleVisibleChange}
                        id="popoverChat"
                    >
                        <svg style={{ position: "fixed", bottom: "5%", zIndex: "999" }} width="60px" height="60px" viewBox="0 0 60 60"><svg x="0" y="0" width="60px" height="60px"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g><circle fill="#0084ff" cx="30" cy="30" r="30"></circle><svg x="10" y="10"><g transform="translate(0.000000, -10.000000)" fill="#FFFFFF"><g id="logo" transform="translate(0.000000, 10.000000)"><path d="M20,0 C31.2666,0 40,8.2528 40,19.4 C40,30.5472 31.2666,38.8 20,38.8 C17.9763,38.8 16.0348,38.5327 14.2106,38.0311 C13.856,37.9335 13.4789,37.9612 13.1424,38.1098 L9.1727,39.8621 C8.1343,40.3205 6.9621,39.5819 6.9273,38.4474 L6.8184,34.8894 C6.805,34.4513 6.6078,34.0414 6.2811,33.7492 C2.3896,30.2691 0,25.2307 0,19.4 C0,8.2528 8.7334,0 20,0 Z M7.99009,25.07344 C7.42629,25.96794 8.52579,26.97594 9.36809,26.33674 L15.67879,21.54734 C16.10569,21.22334 16.69559,21.22164 17.12429,21.54314 L21.79709,25.04774 C23.19919,26.09944 25.20039,25.73014 26.13499,24.24744 L32.00999,14.92654 C32.57369,14.03204 31.47419,13.02404 30.63189,13.66324 L24.32119,18.45264 C23.89429,18.77664 23.30439,18.77834 22.87569,18.45674 L18.20299,14.95224 C16.80079,13.90064 14.79959,14.26984 13.86509,15.75264 L7.99009,25.07344 Z"></path></g></g></svg></g></g></svg></svg>
                    </Popover>
                </div>
                <div>Version 1.1 .</div>
                <div>Copyright @ 2019 HCM Company .</div>
                <div>All rights reserved .</div>
            </Footer>
        )
    }
}

export default AppFooter
import React, { Component } from "react";
import io from "socket.io-client";
import $ from "jquery";
import "@styles/layout.css";
import cookie from "react-cookies";
import { Button, Input, Avatar } from "antd";
import Request from "@apis/Request";
// var socket = io("http://103.74.122.80:6969");
// var socket = io('fscvn.ddns.net:6969');
var socket = io("localhost:6969");
var ten = cookie.load("user");
var format = require("dateformat");
socket.on("server-send-danhsach-Users", function(data) {
  $("#boxContent").html("");
  data.forEach(function(i) {
    $("#boxContent").append("<div class='user'>" + i + "</div>");
  });
});
socket.on("server-send-dki-thanhcong", function(data) {
  $("#currentUser").html(data);
  $("#loginForm").hide(2000);
  $("#chatForm").show(1000);
});
socket.on("server-send-message", function(data) {
  $("#listMessages").append(
    "<div class='ms'>" + data.un + ": " + data.nd + "</div>"
  );
});
socket.on("server-send-message-person", function(data) {
  if (
    data.nguoiGui == localStorage.getItem("nguoiGui") ||
    data.nguoiGui == localStorage.getItem("nguoiNhan")
  ) {
    //người vừa gõ tin nhắn
    // Request('hotro/getchat', 'POST', { nguoiGui: data.nguoiGui, nguoiNhan: data.nguoiNhan }).then((response) => {
    //     for (var i = 0; i < response.data.data.result.length; i++) {
    //         var messageBody = document.querySelector('#listMessagesPerson');
    //         messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    //         var item = response.data.data.result[i];
    //         $("#listMessagesPerson").append("<div class='ms'>" + item.tennguoigui + ": " + item.tinnhan + "</div>");
    //     }
    // })
    $("#listMessagesPerson").append(
      '<div style="padding-left: 12px; padding-right: 12px"><div style="border: 1px solid #0068ff; border-radius: 8px; width: fit-content; position: relative; display: block; background: #dae9ff; padding: 12px; margin-bottom: 4px">' +
        data.tinNhan +
        "</div></div>"
    );
    // $("#listMessagesPerson").append("<div class='ms'>" + data.tenNguoiGui + ": " + data.tinNhan + "</div>");
    var messageBody = document.querySelector("#listMessagesPerson");
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
  }
});
socket.on("ai-do-dang-go-chu", function(data) {
  $("#thongbao").html(data);
});
socket.on("ai-do-stop-go-chu", function() {
  $("#thongbao").html("");
});
socket.on("ai-do-dang-go-chu-person", function(data) {
  if (data.nguoiNhan == localStorage.getItem("nguoiGui")) {
    $("#thongbaoPerson").html(data.thongBao);
  }
});
socket.on("ai-do-stop-go-chu-person", function() {
  $("#thongbaoPerson").html("");
});
$("#txtMessage").focusin(function() {
  socket.emit("toi-dang-go-chu");
});
$("#txtMessage").focusout(function() {
  socket.emit("toi-stop-go-chu");
});
$("#txtMessagePerson").focusin(function() {
  socket.emit("toi-dang-go-chu-person", $("#personChat").text());
});
$("#txtMessagePerson").focusout(function() {
  socket.emit("toi-stop-go-chu-person");
});
$("#btnRegister").click(function() {
  socket.emit("client-send-Username", $("#txtUsername").val());
});
$("#btnLogout").click(function() {
  socket.emit("logout");
  $("#chatForm").hide(2000);
  $("#loginForm").show(1000);
});
$("#btnSendMessage").click(function() {
  socket.emit("user-send-message", $("#txtMessage").val());
});
$("body").on("click", ".user", function() {
  if (
    document.getElementById($(this).attr("id")).style.background ==
    "rgb(153, 194, 255)"
  ) {
    $("#personChat").text("");
    $(".user").css("background", "white");
  } else {
    Request("hotro/getalls", "POST", { username: $(this).attr("id") }).then(
      (response) => {
        $("#personChat").text(response.data.data[0].fullname);
      }
    );
    $(".user").css("background", "white");
    $("#" + $(this).attr("id")).css("background", "#99C2FF");
    localStorage.setItem("nguoiNhan", $(this).attr("id"));
    $("#listMessagesPerson").html("");
    Request("hotro/getchat", "POST", {
      nguoiGui: localStorage.getItem("nguoiGui"),
      nguoiNhan: localStorage.getItem("nguoiNhan"),
    }).then((response) => {
      var who = "";
      var countMe = 0;
      var countAnother = 0;
      for (var i = 0; i < response.data.data.result.length; i++) {
        var item = response.data.data.result[i];
        if (item.url == "" || item.url == null) {
          item.url = "http://103.74.122.80:5000/uploads/unnamed.png";
        }
        if (item.nguoigui == localStorage.getItem("nguoiNhan")) {
          who = "another";
          countMe = 0;
          countAnother++;
        } else {
          who = "me";
          countMe++;
          countAnother = 0;
        }
        if (who == "another" && countAnother == 1) {
          $("#listMessagesPerson").append(
            '<div style="padding-left: 12px; padding-top: 12px; padding-right: 12px; padding-bottom: 4px"><span class="ant-avatar ant-avatar-circle ant-avatar-image" style="font-size: 20px; background-color: white; margin-bottom: 4px"><img src="' +
              item.url +
              '"></span><div style="border: 1px solid #0068ff; border-radius: 8px; width: fit-content; position: relative; display: block; background: white; padding: 12px; margin-bottom: 4px">' +
              item.tinnhan +
              "</div></div>"
          );
        }
        if (who == "another" && countAnother > 1) {
          $("#listMessagesPerson").append(
            '<div style="padding-left: 12px; padding-right: 12px"><div style="border: 1px solid #0068ff; border-radius: 8px; width: fit-content; position: relative; display: block; background: white; padding: 12px; margin-bottom: 4px">' +
              item.tinnhan +
              "</div></div>"
          );
        }
        if (who == "me" && countMe == 1) {
          $("#listMessagesPerson").append(
            '<div style="padding-left: 12px; padding-top: 12px; padding-right: 12px; padding-bottom: 4px"><span class="ant-avatar ant-avatar-circle ant-avatar-image" style="font-size: 20px; background-color: white; margin-bottom: 4px"><img src="' +
              item.url +
              '"></span><div style="border: 1px solid #0068ff; border-radius: 8px; width: fit-content; position: relative; display: block; background: #dae9ff; padding: 12px; margin-bottom: 4px">' +
              item.tinnhan +
              "</div></div>"
          );
        }
        if (who == "me" && countMe > 1) {
          $("#listMessagesPerson").append(
            '<div style="padding-left: 12px; padding-right: 12px"><div style="border: 1px solid #0068ff; border-radius: 8px; width: fit-content; position: relative; display: block; background: #dae9ff; padding: 12px; margin-bottom: 4px">' +
              item.tinnhan +
              "</div></div>"
          );
        }
        var messageBody = document.querySelector("#listMessagesPerson");
        messageBody.scrollTop =
          messageBody.scrollHeight - messageBody.clientHeight;
      }
    });
  }
});
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempValue: "",
      tempValuePerson: "",
      name1: null,
      address: "",
    };
  }
  getName = (user_cookie) => {
    Request("hotro/getname", "POST", { user_cookie }).then((res) => {
      if (res) {
        if (res.data.data.name[0] === undefined) {
          this.setState({
            name1: "Chưa tạo nhân sự",
          });
        } else {
          this.setState({
            name1: res.data.data.name[0].ns_hovaten,
            address: res.data.data.name[0].ns_address,
          });
        }
      }
    });
  };
  clientSendUsername = (tempValue) => {
    socket.emit("user-send-message", tempValue);
    $("#txtMessage").val("");
    $("#txtMessage").focus();
    // document.getElementById("txtMessage").value = ''
    // document.getElementById('txtMessage').focus();
  };
  clientSendUsernamePerson = (tempValue) => {
    var day = format(new Date(), "dd/mm/yyyy");
    var hour = format(new Date(), "HH:MM");
    tempValue.ngay = day;
    tempValue.gio = hour;
    tempValue.name = localStorage.getItem("tenNguoiDung");
    tempValue.nguoiNhan = localStorage.getItem("nguoiNhan");
    tempValue.url = localStorage.getItem("urlAvatar");
    if (tempValue.text == "") {
      return;
    } else {
      Request("hotro/chat", "POST", tempValue).then((response) => {});
      socket.emit("user-send-message-person", tempValue);
      $("#txtMessagePerson").val("");
      $("#txtMessagePerson").focus();
      // document.getElementById("txtMessagePerson").value = ''
      // document.getElementById('txtMessagePerson').focus();
    }
  };
  textChat(event) {
    this.setState({
      tempValue: event.target.value,
    });
  }
  textChatPerson(event) {
    this.setState({
      tempValuePerson: event.target.value,
    });
  }
  componentDidMount() {
    var user_cookie = cookie.load("user");
    $("#txtMessage").focusin(function() {
      socket.emit("toi-dang-go-chu");
    });
    $("#txtMessage").focusout(function() {
      socket.emit("toi-stop-go-chu");
    });
    $("#txtMessagePerson").focusin(function() {
      socket.emit("toi-dang-go-chu-person", {
        tenNguoiDung: localStorage.getItem("tenNguoiDung"),
        nguoiNhan: localStorage.getItem("nguoiNhan"),
      });
    });
    $("#txtMessagePerson").focusout(function() {
      socket.emit("toi-stop-go-chu-person");
    });
    this.getName(user_cookie);
    var html = "";
    var arr = [];
    var userOnline = localStorage.getItem("listUserOnline").split(",");
    Request("nhansu/getall", "POST", null).then((response) => {
      if (response.data.success == true) {
        var data = response.data.data;
        data.map((value) => {
          arr.push(value.name);
        });
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < userOnline.length; j++) {
            if (data[i].name == userOnline[j] && userOnline[j] != user_cookie) {
              html =
                html +
                "<div id=" +
                data[i].name +
                ' class="user" style="display: -webkit-box; cursor: pointer"><span style="color: green" role="img" aria-label="message" class="anticon anticon-message"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="message" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M464 512a48 48 0 1096 0 48 48 0 10-96 0zm200 0a48 48 0 1096 0 48 48 0 10-96 0zm-400 0a48 48 0 1096 0 48 48 0 10-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 00-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 00-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 00112 714v152a46 46 0 0046 46h152.1A449.4 449.4 0 00510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 00142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"></path></svg></span><p>' +
                data[i].fullname +
                "</p></div>";
            }
          }
        }
      }
      $("#listUsersOnlineChat").html(html);
    });
  }

  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      var obj = {
        text: this.state.tempValue,
        user: ten,
      };
      this.clientSendUsername(obj);
    }
  };

  _handleKeyDownPerson = (e) => {
    if (e.key === "Enter") {
      var obj = {
        // text: this.state.tempValuePerson,
        text: $("#txtMessagePerson").val(),
        user: ten,
      };
      this.clientSendUsernamePerson(obj);
    }
  };

  render() {
    var obj = {
      text: this.state.tempValue,
      user: ten,
    };

    return (
      <div id="wrapper">
        <div id="listUserOnline">
          Đang hoạt động
          <br />
          <div
            id="listUsersOnlineChat"
            style={{
              overflowX: "hidden",
              height: "400px",
              position: "relative",
              outline: "none",
            }}
          ></div>
        </div>
        <div id="chatForm" style={{ width: "100%" }}>
          <div id="left">
            <div id="sayHi">
              {/* <Avatar src={this.state.address} style={{ fontSize: '20px', backgroundColor: 'orange' }} />&nbsp;<span id="currentUser">{this.state.name1}</span> */}
              Trò chuyện với: <span id="personChat"></span>
            </div>
            <div id="listMessagesPerson"></div>
            <div id="thongbaoPerson"></div>
            <div>
              <Input
                style={{ marginBottom: "15px" }}
                type="text"
                name="text"
                id="txtMessagePerson"
                placeholder="Type your message here..."
                onChange={(event) => this.textChatPerson(event)}
                onKeyDown={this._handleKeyDownPerson}
              />
            </div>
            <div>
              <Button
                className="hidden-action"
                onClick={() => this.clientSendUsernamePerson(obj)}
              >
                Send
              </Button>
            </div>
          </div>
          <div id="right">
            <div id="sayHi">
              {/* <Avatar src={this.state.address} style={{ fontSize: '20px', backgroundColor: 'orange' }} />&nbsp;<span id="currentUser">{this.state.name1}</span> */}
              Trò chuyện với mọi người
            </div>
            <div id="listMessages"></div>
            <div id="thongbao"></div>
            <div>
              <Input
                style={{ marginBottom: "15px" }}
                type="text"
                name="text"
                id="txtMessage"
                placeholder="Type your message here..."
                onChange={(event) => this.textChat(event)}
                onKeyDown={this._handleKeyDown}
              />
            </div>
            <div>
              <Button
                className="hidden-action"
                onClick={() => this.clientSendUsername(obj)}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;

const express = require("express");
const path = require("path");
const app = express();
var server = require("http").Server(app);
const port = 6969;
var io = require("socket.io")(server);
server.listen(port, () => console.log("Server running in port " + port));
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "dist", "./")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "./index.html"));
});
function deduplicate(arr) {
  let isExist = (arr, x) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === x) return true;
    }
    return false;
  };

  let ans = [];
  arr.forEach((element) => {
    if (!isExist(ans, element)) ans.push(element);
  });
  return ans;
}
var mangUsers = [];
io.on("connection", function (socket) {
  // console.log('co nguoi ket noi ' + socket.id);
  socket.on("disconnect", function () {
    if (socket.username) {
      io.sockets.emit("user disconnected", socket.username);
    }
  });
  socket.on("user-send-request", function (data) {
    socket.username = data;
    mangUsers.push(data);
    var userArray = deduplicate(mangUsers);
    io.sockets.emit("server-send-request", userArray);
  });
  socket.on("user-send-message", function (data) {
    io.sockets.emit("server-send-message", { un: data.user, nd: data.text });
  });
  socket.on("user-send-message-person", function (data) {
    io.sockets.emit("server-send-message-person", {
      nguoiGui: data.user,
      tenNguoiGui: data.name,
      nguoiNhan: data.nguoiNhan,
      tinNhan: data.text,
    });
  });
  socket.on("toi-dang-go-chu", function () {
    socket.broadcast.emit("ai-do-dang-go-chu", "ai đó đang nhập tin nhắn");
  });
  socket.on("toi-dang-go-chu-person", function (data) {
    socket.broadcast.emit("ai-do-dang-go-chu-person", {
      thongBao: data.tenNguoiDung + " đang nhập tin nhắn",
      nguoiNhan: data.nguoiNhan,
    });
  });
  socket.on("user-send-comment", function (data) {
    io.sockets.emit("server-send-comment", { data });
  });
  socket.on("user-send-thongbao", function (data) {
    io.sockets.emit("server-send-thongbao", { data });
  });
  socket.on("toi-stop-go-chu", function () {
    io.sockets.emit("ai-do-stop-go-chu");
  });
  socket.on("toi-stop-go-chu-person", function () {
    io.sockets.emit("ai-do-stop-go-chu-person");
  });
  socket.on("user-send-registration", function (data) {
    if (data.dangKy === "nhuan") {
      io.sockets.emit("server-send-nhuan", data);
    } else if (data.dangKy === "phe") {
      io.sockets.emit("server-send-phe", data);
    } else if (data.dangKy === "hoai") {
      io.sockets.emit("server-send-hoai", data);
    } else {
      io.sockets.emit("server-send-hoa", data);
    }
  });
});

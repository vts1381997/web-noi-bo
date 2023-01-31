var express = require("express");
var multer = require("multer");
var cors = require("cors");
const path = require("path");
const config = require("./configurations/config");
const port = 5000;
var app = express();
app.use("/uploads", express.static(path.join(__dirname, "upload", "./")));
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
const login = require("./router/login");
const checkrole = require("./router/checkrole");
const setpermission = require("./router/setpermission");
const role_action = require("./router/role_action");
var group = require("./router/group");
var setGroupPermission = require("./router/setGroupPermission");
var nhansuRoute = require("./router/nhansuRoute");
var hotroRoute = require("./router/hotroRoute");
var menuRoute = require("./router/menu_Route");
var quanly_hoadonRoute = require("./router/quanly_hoadonRoute");
var khachhangRoute = require("./router/khachhangRoute");
var router = require("./router/unitRoute");
var approved = require("./router/approved");
var half = require("./router/half");
var notification = require("./router/notification");
var cusrouter = require("./router/customerRoute");
var hopdong = require("./router/hopdong");
var userRouter = require("./router/index");
var diabanRoute = require("./router/diaban");
var duanRoute = require("./router/duan");
var memberRoute = require("./router/memberRoute");
var fileRoute = require("./router/fileRoute");
var ChangePass = require("./router/changepass");
var ViewProfile = require("./router/viewprofile");
var binhluanRoute = require("./router/binhluanRoute");
var thongbao = require("./router/thongbaoRoute");
var chamcong = require("./router/chamcong");
var authorize = require("./middleware/authorize");

app.set("Secret", config.secret);
app.use(cors());
app.use("/nhansu", nhansuRoute);
app.use("/member", memberRoute);
app.use("/changepass", ChangePass);
app.use("/viewprofile", ViewProfile);
app.use("/hotro", hotroRoute);
app.use("/binhluan", binhluanRoute);
app.use("/hopdong", hopdong);
app.use("/menu", menuRoute);
app.use("/qlhd", quanly_hoadonRoute);
app.use("/group", group);
app.use("/diaban", diabanRoute);
app.use("/duan", duanRoute);
app.use("/khachhangRoute", khachhangRoute);
app.use("/customer", cusrouter);
app.use("/thongbao", thongbao);
app.use("/chamcong", chamcong);
app.use("/filekhachhangs", fileRoute);
app.use("/Login", login);
app.use("/setGroupPermission", setGroupPermission);
app.use("/checkrole", checkrole);
app.use("/setpermission", setpermission);
app.use("/role_action", role_action);
app.use("/user", authorize, userRouter);
app.use("/unit", router);
app.use("/several", approved);
app.use("/half", half);
app.use("/notification", notification);
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
let upload = multer({ storage: storage }).single("file");
app.post("/upload", (req, res) => {
  upload(req, res, (error) => {
    if (error) {
      return res.send(`Error when trying to upload: ${error}`);
    }
    res.sendFile(path.join(`${__dirname}/upload/${req.file.originalname}`));
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// app.post("/verify");

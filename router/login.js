const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
var router = express.Router();
var userController = require("../controller/phanquyen/userController");
const config = require("../configurations/config");
const bcrypt = require("bcryptjs");
app.set("Secret", config.secret);
router.post("/", (req, res) => {
  userController.Login(req.body.username, function (data) {
    bcrypt.compare(req.body.password, data.password, function (err, match) {
      if (match) {
        const payload = {
          userName: req.body.username,
          claims: data.claims,
          fullname: data.fullname,
          mdd: data.madinhdanh,
        };
        var token = jwt.sign(payload, app.get("Secret"), {
          expiresIn: "24h", // expires in 24 hours
        });
        res.json({
          success: true,
          message: "authentication done",
          token: token,
        });
      } else {
        res.json({ message: "Sai mật khẩu" });
      }
    });
  });
});

module.exports = router;

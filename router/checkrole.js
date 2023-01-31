const express = require('express');
const app = express();
var router = express.Router();
var userController = require('../controller/phanquyen/userController')
config = require('../configurations/config');
const bcrypt = require('bcryptjs');
app.set('Secret', config.secret);

router.post('/', (req, res) => {
    userController.getClaimsByUser(req.body.sl,(data)=>{
        res.send(data);
    })
});
module.exports = router;
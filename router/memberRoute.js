var express = require('express')
var router = express.Router()
// middleware that is specific to this router
var memberController = require('../controller/phanquyen/memberController');

router.post('/get', function (req, res) {
    let body = req.body;
    let pageNumber = body.pageNumber;
    let pageSize = body.pageSize;
    let gr = body.a
    memberController.getUser(pageNumber, pageSize,gr, function (data) {
        if(data)
            res.send(data);
        else
        res.json('error');
    })
})

router.post('/listmember', function (req, res) {
    let body = req.body;
    let pageNumber = body.pageNumber;
    let pageSize = body.pageSize;
    let groupName = body.groupName
    memberController.getList(pageNumber, pageSize,groupName, function (data) {
        if(data)
            res.send(data);
        else
        res.json('error');
    })
})

router.post('/delete', function (req, res) {
    memberController.deleteUser(req.body.listmem, req.body.a, function (data) {
        res.send(data);
    })
})

router.post('/add', function (req, res) {
    memberController.addUser(req.body.mem,req.body.sl,req.body.gr, function (data) {
        res.send(data);
    })
})

module.exports = router
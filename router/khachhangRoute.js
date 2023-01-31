var express = require('express')
var router = express.Router()
var khachhangController = require('../controller/khachhang_Controller');

router.use(function timelog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.post('/getkhachhang', function (req, res) {
    khachhangController.getKhachhang( function (data) {
        res.send(data);
    })
})

router.post('/insertkhachhang', function (req, res) {
    khachhangController.insertKhachhang(req.body, function (data) {
        res.send(data);
    })
})

module.exports = router 
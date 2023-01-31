var express = require('express')
var router = express.Router()
var thongbaoController = require('../controller/thongbao_Controller')
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.post('/get', function (req, res) {
    thongbaoController.getThongbao(req.body, function (data) {
        res.send(data);
    })
})

router.post('/getdadoc', function (req, res) {
    thongbaoController.getThongbaoDadoc(req.body, function (data) {
        res.send(data);
    })
})

router.post('/insert', function (req, res) {
    thongbaoController.insertThongbao(req.body, function (data) {
        res.send(data);
    })
})

router.post('/update', function (req, res) {
    thongbaoController.updateThongbao(req.body, function (data) {
        res.send(data)
    })
})

router.post('/updatetatcadadoc', function (req, res) {
    thongbaoController.updateThongbaoTatcaDadoc( function (data) {
        res.send(data)
    })
})

router.delete('/delete', function (req, res) {
    thongbaoController.deleteThongbaochuadoc(req.body.trangthai, function (data) {
        res.send(data);
    })
})

module.exports = router
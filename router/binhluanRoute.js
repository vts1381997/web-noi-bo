var express = require('express')
var router = express.Router()
var binhluanController = require('../controller/binhluanController')

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.post('/get', function (req, res) {
    
    // let body = req.body;
    // let pageNumber = body.pageNumber;
    // let pageSize = body.pageSize;
    // let index = body.index;
    // let sortBy = body.sortBy;
    binhluanController.getBinhluan(req.body,function (data) {
        res.send(data);
    })
})

router.post('/insert', function (req, res) {
    binhluanController.insertBinhluan(req.body, function (data) {
        res.send(data);
    })
})

module.exports = router
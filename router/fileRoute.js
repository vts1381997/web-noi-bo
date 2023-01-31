var express = require('express')
var router = express.Router()
var fileController = require('../controller/file_Controller')
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.post('/get', function (req, res) {
    let body = req.body;
    let pageNumber = body.pageNumber;
    let pageSize = body.pageSize;
    let index = body.index;
    let sortBy = body.sortBy;
    fileController.getFile(pageNumber, pageSize, index, sortBy, function (data) {
        res.send(data);
    })
})

router.post('/insert', function (req, res) {
    fileController.insertFile_khachhangs(req.body, function (data) {
        res.send(data);
    })
})

router.post('/update', function (req, res) {
    fileController.updateFile_khachhangs(req.body, function (data) {
        res.send(data)
    })
})

router.delete('/delete', function (req, res) {
    fileController.deleteFile_khachhangsById(req.body.file_id, function (data) {
        res.send(data);
    })
})

module.exports = router
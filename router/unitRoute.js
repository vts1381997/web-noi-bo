var express = require('express')
var router = express.Router()
var unitController = require('../controller/unitController');

router.use(function timelog(req, res, next) {
    next()
})

router.post('/get', function (req, res) {
    let body = req.body;
    let pageNumber = body.pageNumber;
    let pageSize = body.pageSize;
    let index = req.body.index;
    let sortBy = req.body.sortBy
    unitController.getUnit(pageNumber, pageSize, index, sortBy, function (data) {
        res.send(data);
    })
})

router.post('/getCha', function (req, res) {
    unitController.getcha(function (data) { })
    res.send(data);
})

router.post('/gettinh', function (req, res) {
    unitController.getTinh(function (data) {
        res.send(data);
    })
})

router.post('/gethuyen', function (req, res) {
    unitController.getHuyen(req.body, function (data) {
        res.send(data);
    })
})

router.post('/getxa', function (req, res) {
    unitController.getXa(req.body, function (data) {
        res.send(data);
    })
})

router.post('/getkhachhang', function (req, res) {
    unitController.getKhachhang(function (data) {
        res.send(data);
    })
})

router.get('/get/:Id', function (req, res) {
    unitController.GetById(req.params.Id, function (data) {
        res.send(data);
    })
})

router.delete('/delete', function (req, res) {
    unitController.DeleteUnitbyId(req.body.dm_dv_id, function (data) {
        res.send(data);
    })
})

router.post('/insert', function (req, res) {
    unitController.insertUnit(req.body, function (data) {
        res.send(data);
    })
})

router.post('/insertkh', function (req, res) {
    unitController.insertKhachhang(req.body, function (data) {
        res.send(data);
    })
})

router.post('/update', function (req, res) {
    unitController.updateUnit(req.body, function (data) {
        res.send(data);

    })
})

router.post('/search', function (req, res) {
    let pageSize = req.body.pageSize;
    let pageNumber = req.body.pageNumber;
    let timkiem = req.body.timkiem;
    unitController.search(pageSize, pageNumber, timkiem, function (data) {
        res.send(data);
    })
})

router.get('/about', function (req, res) {
    res.send('About Unit')
})

module.exports = router 
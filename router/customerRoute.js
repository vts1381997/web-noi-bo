var express = require('express')
var router = express.Router()
var customerController = require('../controller/customerController');

router.use(function timelog(req, res, next) {
    next()
})

router.post('/get', function (req, res) {
    let body = req.body;
    let pageNumber = body.pageNumber;
    let pageSize = body.pageSize;
    let index = req.body.index;
    let sortBy = req.body.sortBy
    customerController.getCustomer(pageNumber, pageSize, index, sortBy, function (data) {
        res.send(data);
    })
})

router.get('/get/:Id', function (req, res) {
    customerController.GetById(req.params.Id, function (data) {
        res.send(data);
    })
})

router.post('/getdonvi', function (req, res) {
    customerController.getDonvi(function (data) {
        res.send(data);
    })
})

router.post('/gettinh', function (req, res) {
    customerController.getTinh(function (data) {
        res.send(data);
    })
})

router.post('/gethuyen', function (req, res) {
    customerController.getHuyen(req.body, function (data) {
        res.send(data);
    })
})

router.post('/getxa', function (req, res) {
    customerController.getXa(req.body, function (data) {
        res.send(data);
    })
})

router.delete('/delete', function (req, res) {
    customerController.DeleteCustomerbyId(req.body.kh_id, function (data) {
        res.send(data);
    })
})

router.post('/unit/insertdv', function (req, res) {
    customerController.insertDonvi(req.body, function (data) {
        res.send(data);
    })
})
router.post('/insert', function (req, res) {
    customerController.insertCustomer(req.body, function (data) {
        res.send(data);
    })
})

router.post('/update', function (req, res) {
    customerController.updateCustomer(req.body, function (data) {
        res.send(data);

    })
})

router.post('/search', function (req, res) {
    let pageSize = req.body.pageSize;
    let pageNumber = req.body.pageNumber;
    let timkiem = req.body.timkiem;
    customerController.search(pageSize, pageNumber, timkiem, function (data) {
        res.send(data);
    })
})

router.get('/about', function (req, res) {
    res.send('About Unit')
})

module.exports = router 
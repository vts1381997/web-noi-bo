var express = require('express')
var router = express.Router()
var chamcongController = require('../controller/chamcongController');
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
router.post('/get', function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  chamcongController.getHalf(pageNumber, pageSize, function (data) {
    res.send(data);
  })
})
router.post('/get1', function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  chamcongController.getHalf1(pageNumber, pageSize, function (data) {
    res.send(data);
  })
})
router.post('/get2', function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  chamcongController.getHalf2(pageNumber, pageSize, function (data) {
    res.send(data);
  })
})
router.post('/insert', function (req, res) {
  chamcongController.insertChamCong(req.body, function (data) {
    res.send(data);
  })
})
router.post('/updateApproved', function (req, res) {
  chamcongController.UpdateHalf(req.body, function (data) {
    res.send(data);
  })
})
router.post('/updateRefuse', function (req, res) {
  chamcongController.UpdateHalf1(req.body, function (data) {
    res.send(data);
  })
})
module.exports = router
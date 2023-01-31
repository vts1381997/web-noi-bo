var express = require('express')
var router = express.Router()
var hopdongController = require('../controller/hopdongController');
var duanController = require('../controller/duanController');
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
router.post('/get', function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  hopdongController.getHopdong(pageNumber, pageSize, function (data) {
    res.send(data);
  })
})
router.post('/getnkhd', function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  hopdongController.getNhatkyHopdong(pageNumber, pageSize, function (data) {
    res.send(data);
  })
})
router.delete('/delete', function (req, res) {
  hopdongController.DeleteHopdongbyId(req.body.hd_id, function (data) {
    res.send(data);
  })
})
router.post('/insert', function (req, res) {
  hopdongController.insertHopdong(req.body, function (data) {
    res.send(data);
  })
})
router.post('/duan/insert', function (req, res) {
  hopdongController.insertDuan(req.body, function (data) {
    res.send(data);
  })
})
router.post('/update', function (req, res) {
  hopdongController.UpdateHopdong(req.body, function (data) {
    res.send(data);
  })
})
router.post('/search', function (req, res) {
  let pageSize = req.body.pageSize;
  let pageNumber = req.body.pageNumber;
  let timkiem = req.body.timkiem;
  hopdongController.search(pageSize, pageNumber, timkiem, function (data) {
      res.send(data);
  })
}) 
router.post('/getcha', function (req, res) {
  hopdongController.getcha(function (data) {
    res.send(data);
  })
})
router.post('/getdonvi', function (req, res) {
  hopdongController.getdonvi(function (data) {
    res.send(data);
  })
})
router.post('/getkhachhang', function (req, res) {
  hopdongController.getkhachhang(function (data) {
    res.send(data);
  })
})
router.post('/getduan', function (req, res) {
  hopdongController.getduan(function (data) {
    res.send(data);
  })
})
router.post('/insertduan', function (req, res) {
  duanController.insertDuan(req.body, function (data) {
    res.send(data);
})
})
module.exports = router
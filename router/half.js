var express = require('express')
var router = express.Router()
var halfController = require('../controller/halfController');
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
router.post('/get', function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  halfController.getHalf(pageNumber, pageSize, function (data) {
    res.send(data);
  })
})
router.post('/get1', function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  halfController.getHalf1(pageNumber, pageSize, function (data) {
    res.send(data);
  })
})
router.post('/get2', function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  halfController.getHalf2(pageNumber, pageSize, function (data) {
    res.send(data);
  })
})
router.post('/get3', function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  halfController.getHalf3(pageNumber, pageSize, function (data) {
    res.send(data);
  })
})
router.post('/getaccept', function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  halfController.getHalfAccept(pageNumber, pageSize, function (data) {
    res.send(data);
  })
})
router.post('/getaccept1', function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  halfController.getHalfAccept1(pageNumber, pageSize, function (data) {
    res.send(data);
  })
})
router.post('/getaccept2', function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  halfController.getHalfAccept2(pageNumber, pageSize, function (data) {
    res.send(data);
  })
})
router.post('/getaccept3', function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  halfController.getHalfAccept3(pageNumber, pageSize, function (data) {
    res.send(data);
  })
})
router.post('/getrefuse', function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  halfController.getHalfRefuse(pageNumber, pageSize, function (data) {3
    res.send(data);
  })
})
router.post('/getrefuse1', function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  halfController.getHalfRefuse1(pageNumber, pageSize, function (data) {
    res.send(data);
  })
})
router.post('/getrefuse2', function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  halfController.getHalfRefuse2(pageNumber, pageSize, function (data) {
    res.send(data);
  })
})
router.post('/getrefuse3', function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  halfController.getHalfRefuse3(pageNumber, pageSize, function (data) {
    res.send(data);
  })
})
router.post('/insert', function (req, res) {
  halfController.insertHalf(req.body, function (data) {
    res.send(data);
  })
})
router.post('/insert1', function (req, res) {
  halfController.insertHalf1(req.body, function (data) {
    res.send(data);
  })
})
router.post('/insert2', function (req, res) {
  halfController.insertHalf2(req.body, function (data) {
    res.send(data);
  })
})
router.post('/insert3', function (req, res) {
  halfController.insertHalf3(req.body, function (data) {
    res.send(data);
  })
})
router.post('/update', function (req, res) {
  halfController.UpdateHalf(req.body, function (data) {
    res.send(data);
  })
})
router.post('/update1', function (req, res) {
  halfController.UpdateHalf1(req.body, function (data) {
    res.send(data);
  })
})
router.post('/update2', function (req, res) {
  halfController.UpdateHalf2(req.body, function (data) {
    res.send(data);
  })
})
router.post('/update3', function (req, res) {
  halfController.UpdateHalf3(req.body, function (data) {
    res.send(data);
  })
})
router.post('/update4', function (req, res) {
  halfController.UpdateHalf4(req.body, function (data) {
    res.send(data);
  })
})
router.post('/update5', function (req, res) {
  halfController.UpdateHalf5(req.body, function (data) {
    res.send(data);
  })
})
router.post('/update6', function (req, res) {
  halfController.UpdateHalf6(req.body, function (data) {
    res.send(data);
  })
})
router.post('/update7', function (req, res) {
  halfController.UpdateHalf7(req.body, function (data) {
    res.send(data);
  })
})
module.exports = router
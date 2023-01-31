var express = require('express')
var router = express.Router()
var notificationController = require('../controller/notificationController');
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
router.post('/get1', function (req, res) {
    let body = req.body;
    let pageNumber = body.pageNumber;
    let pageSize = body.pageSize;
    let ten = body.ten;
    notificationController.getNotification(pageNumber, pageSize, ten, function (data) {
        res.send(data);
    })
})
router.post('/get2', function (req, res) {
    let body = req.body;
    let pageNumber = body.pageNumber;
    let pageSize = body.pageSize;
    let ten = body.ten;
    notificationController.getNotifications(pageNumber, pageSize, ten, function (data) {
        res.send(data);
    })
})
router.post('/get3', function (req, res) {
    let body = req.body;
    let pageNumber = body.pageNumber;
    let pageSize = body.pageSize;
    let ten = body.ten;
    notificationController.getNotificationss(pageNumber, pageSize, ten, function (data) {
        res.send(data);
    })
})
router.post('/get4', function (req, res) {
    let body = req.body;
    let pageNumber = body.pageNumber;
    let pageSize = body.pageSize;
    let ten = body.ten;
    notificationController.getNotificationsss(pageNumber, pageSize, ten, function (data) {
        res.send(data);
    })
})
module.exports = router
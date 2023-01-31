var express = require('express')
var router = express.Router()
var menuController = require('../controller/menu_Controller')
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
    menuController.getMenu(pageNumber, pageSize, index, sortBy, function (data) {
        res.send(data);
    })
})

router.post('/insert', function (req, res) {
    menuController.insertMenu(req.body, function (data) {
        res.send(data);
    })
})

router.post('/update', function (req, res) {
    menuController.updateMenu(req.body, function (data) {
        res.send(data)
    })
})

router.delete('/delete', function (req, res) {
    menuController.deleteMenuById(req.body.dm_menu_id, function (data) {
        res.send(data);
    })
})

router.get('/about', function (req, res) {
    res.send('About Menu')
})

module.exports = router
var express = require('express')
var router = express.Router()
// middleware that is specific to this router
var groupController = require('../controller/phanquyen/groupController');

router.post('/get', function (req, res) {
    let body = req.body;
    let pageNumber = body.pageNumber;
    let pageSize = body.pageSize;
    let index = body.index;
    let sortBy = body.sortBy
    groupController.getGroup(pageNumber, pageSize,index,sortBy, function (data) {
        if(data)
            res.send(data);
        else
        res.json('error');
    })
})

router.delete('/delete', function (req, res) {
    groupController.deleteGroup(req.body.id, function (data) {
        res.send(data);
    })
})

router.post('/insert', function (req, res) {
    groupController.insertGroup(req.body, function (data) {
        res.send(data);

    })

})

router.post('/update', function (req, res) {
    groupController.updateGroup(req.body, function (data) {
        res.send(data);
    })
})
router.post('/search', function (req, res) {
    let pageSize = req.body.pageSize;
    let pageNumber = req.body.pageNumber;
    let textSearch = req.body.searchText;
    let columnSearch = req.body.columnSearch;
    let index = req.body.p1;
    let sortBy = req.body.p2

    groupController.search(pageSize, pageNumber, textSearch, columnSearch, index, sortBy, function (data) {
        res.send(data);
    })
})
router.post('/checkrolegroup', function (req, res) {
    groupController.getClaimsByGroup(req.body.sl, (data) => {
        res.send(data);
    })
})


module.exports = router
var express = require('express')
var router = express.Router()
var hotroController = require('../controller/hotro_Controller')
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('*', function (req, res) {
    res.send(JSON.stringify(req.url).trim().toLocaleLowerCase())

})

router.post('/get', function (req, res) {
    let body = req.body;
    let pageNumber = body.pageNumber;
    let pageSize = body.pageSize;
    let index = body.index;
    let sortBy = body.sortBy;
    hotroController.getHotro(pageNumber, pageSize, index, sortBy, function (data) {
        res.send(data);
    })
})

router.post('/getsearch', function (req, res) { 
    let body = req.body;
    let pageNumber = body.pageNumber;
    let pageSize = body.pageSize;
    let index = body.index;
    let sortBy = body.sortBy;
    let ns_id_ass = body.ns_id_ass;
    hotroController.getSearch(pageNumber, pageSize, index, sortBy, ns_id_ass, function (data) {
        res.send(data);
    })
})

router.post('/getalls', function (req, res) { 
    hotroController.getAlls(req.body, function (data) {
        res.send(data);
    })
})

router.post('/getidduan', function (req, res) {
    hotroController.getIdDuan(function (data) {
        res.send(data)
    })
})

router.post('/getnhansu', function (req, res) {
    hotroController.getNhanSu(function (data) {
        res.send(data)
    })
})

router.post('/getkhachhang', function (req, res) {
    hotroController.getKhachHang(function (data) {
        res.send(data)
    })
})

router.post('/getkhachhangwhere', function (req, res) {
    hotroController.getKhachHangWhere(req.body, function (data) {
        res.send(data)
    })
})

router.post('/getdonvi', function (req, res) {
    hotroController.getDonVi(function (data) {
        res.send(data)
    })
})

router.post('/gethopdong', function (req, res) {
    hotroController.getHopDong(function (data) {
        res.send(data)
    })
})

router.post('/getmyself', function (req, res) {
    hotroController.getDataMyself(req.body, function (data) {
        res.send(data)
    })
})

router.post('/getmyselfdaxong', function (req, res) {
    hotroController.getDataMyselfDaxong(req.body, req.body.pageSize, req.body.pageNumber, function (data) {
        res.send(data)
    })
})

router.post('/getmyselfgap', function (req, res) {
    let body = req.body;
    let pageNumber = body.pageNumber;
    let pageSize = body.pageSize;
    let index = body.index;
    let sortBy = body.sortBy;
    hotroController.getDataMyselfGap(req.body, pageNumber, pageSize, index, sortBy, function (data) {
        res.send(data)
    })
})

router.post('/getdatanguoitao', function (req, res) {
    hotroController.getDataNguoitao(req.body, function (data) {
        res.send(data)
    })
})

router.post('/getdatakhachhang', function (req, res) {
    hotroController.getDataKhachHang(req.body, function (data) {
        res.send(data)
    })
})

router.post('/getname', function (req, res) {
    hotroController.getName(req.body, function (data) {
        res.send(data)
    })
})

router.post('/insert', function (req, res) {
    hotroController.insertHotro(req.body, function (data) {
        res.send(data);
    })
})

router.post('/chat', function (req, res) {
    hotroController.chat(req.body, function (data) {
        res.send(data);
    })
})

router.post('/update', function (req, res) {
    hotroController.updateHotro(req.body, function (data) {
        res.send(data)
    })
})

router.delete('/delete', function (req, res) {
    hotroController.deleteHotroById(req.body.ht_id, function (data) {
        res.send(data);
    })
})

router.post('/getfollowmonth', function (req, res) {
    hotroController.getHotroFollowMonth(req.body, function (data) {
        res.send(data)
    })
})

router.post('/getchat', function (req, res) {
    hotroController.getChat(req.body, function (data) {
        res.send(data)
    })
})

router.post('/search', function (req, res) {
    let pageSize = req.body.pageSize;
    let pageNumber = req.body.pageNumber;
    let timkiem = req.body.timkiem;
    hotroController.search(pageSize, pageNumber, timkiem, function (data) {
        res.send(data);
    })
})

router.post('/gethotrobyid', function (req, res) {
    hotroController.getHotroById(req.body, function (data) {
        res.send(data)
    })
})

router.get('/about', function (req, res) {
    res.send('About Ho Tro')
})

module.exports = router
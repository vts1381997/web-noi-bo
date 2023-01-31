var express = require("express");
var router = express.Router();
var approvedController = require("../controller/approvedController");
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.post("/getchopheduyet", function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  let name = body.name;
  approvedController.getchopheduyet(
    pageNumber,
    pageSize,
    name,
    function (data) {
      res.send(data);
    }
  );
});

router.post("/getdapheduyet", function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  let name = body.name;
  approvedController.getdapheduyet(pageNumber, pageSize, name, function (data) {
    res.send(data);
  });
});

router.post("/getkhongpheduyet", function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  let name = body.name;
  approvedController.getkhongpheduyet(
    pageNumber,
    pageSize,
    name,
    function (data) {
      res.send(data);
    }
  );
});

router.post("/get", function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  approvedController.getHopdong(pageNumber, pageSize, function (data) {
    res.send(data);
  });
});

router.post("/get1", function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  approvedController.getHopdong1(pageNumber, pageSize, function (data) {
    res.send(data);
  });
});

router.post("/get2", function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  approvedController.getHopdong2(pageNumber, pageSize, function (data) {
    res.send(data);
  });
});

router.post("/get3", function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  approvedController.getHopdong3(pageNumber, pageSize, function (data) {
    res.send(data);
  });
});

router.post("/getsearch", function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  approvedController.getSearch(
    pageNumber,
    pageSize,
    body.ten,
    body.loai,
    body.tungay,
    body.denngay,
    function (data) {
      res.send(data);
    }
  );
});

router.post("/getaccept", function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  approvedController.getHopdongAccept(pageNumber, pageSize, function (data) {
    res.send(data);
  });
});

router.post("/getaccept1", function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  approvedController.getHopdongAccept1(pageNumber, pageSize, function (data) {
    res.send(data);
  });
});

router.post("/getaccept2", function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  approvedController.getHopdongAccept2(pageNumber, pageSize, function (data) {
    res.send(data);
  });
});

router.post("/getaccept3", function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  approvedController.getHopdongAccept3(pageNumber, pageSize, function (data) {
    res.send(data);
  });
});

router.post("/getrefuse", function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  approvedController.getHopdongRefuse(pageNumber, pageSize, function (data) {
    3;
    res.send(data);
  });
});

router.post("/getrefuse1", function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  approvedController.getHopdongRefuse1(pageNumber, pageSize, function (data) {
    res.send(data);
  });
});

router.post("/getrefuse2", function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  approvedController.getHopdongRefuse2(pageNumber, pageSize, function (data) {
    res.send(data);
  });
});

router.post("/getrefuse3", function (req, res) {
  let body = req.body;
  let pageNumber = body.pageNumber;
  let pageSize = body.pageSize;
  approvedController.getHopdongRefuse3(pageNumber, pageSize, function (data) {
    res.send(data);
  });
});

router.post("/insert", function (req, res) {
  approvedController.insertHopdong(req.body, function (data) {
    res.send(data);
  });
});

router.post("/insert1", function (req, res) {
  approvedController.insertHopdong1(req.body, function (data) {
    res.send(data);
  });
});

router.post("/insert2", function (req, res) {
  approvedController.insertHopdong2(req.body, function (data) {
    res.send(data);
  });
});

router.post("/insert3", function (req, res) {
  approvedController.insertHopdong3(req.body, function (data) {
    res.send(data);
  });
});

router.post("/insert4", function (req, res) {
  approvedController.insertHopdong4(req.body, function (data) {
    res.send(data);
  });
});

router.post("/update", function (req, res) {
  approvedController.UpdateHopdong(req.body, function (data) {
    res.send(data);
  });
});

router.post("/update1", function (req, res) {
  approvedController.UpdateHopdong1(req.body, function (data) {
    res.send(data);
  });
});

router.post("/update2", function (req, res) {
  approvedController.UpdateHopdong2(req.body, function (data) {
    res.send(data);
  });
});

router.post("/update3", function (req, res) {
  approvedController.UpdateHopdong3(req.body, function (data) {
    res.send(data);
  });
});

router.post("/update4", function (req, res) {
  approvedController.UpdateHopdong4(req.body, function (data) {
    res.send(data);
  });
});

router.post("/update5", function (req, res) {
  approvedController.UpdateHopdong5(req.body, function (data) {
    res.send(data);
  });
});

router.post("/update6", function (req, res) {
  approvedController.UpdateHopdong6(req.body, function (data) {
    res.send(data);
  });
});

router.post("/update7", function (req, res) {
  approvedController.UpdateHopdong7(req.body, function (data) {
    res.send(data);
  });
});

router.post("/deletechopheduyet", function (req, res) {
  approvedController.deletechopheduyet(req.body, function (data) {
    res.send(data);
  });
});

router.post("/select", function (req, res) {
  approvedController.select(req.body, function (data) {
    res.send(data);
  });
});

module.exports = router;

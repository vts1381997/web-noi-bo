var Validator = require("../validate/common");
const approvedData = require("../data/approved.data");
const constant = require("./constant");
const uuidv4 = require("uuid/v4");
var approvedController = {
  getchopheduyet: function getchopheduyet(
    pageNumber,
    pageSize,
    name,
    callback
  ) {
    let limit = pageSize;
    let offset = pageSize * (pageNumber - 1);
    approvedData.getchopheduyet(limit, offset, name, (data) => {
      callback(data);
    });
  },
  getdapheduyet: function getdapheduyet(pageNumber, pageSize, name, callback) {
    let limit = pageSize;
    let offset = pageSize * (pageNumber - 1);
    approvedData.getdapheduyet(limit, offset, name, (data) => {
      callback(data);
    });
  },
  getkhongpheduyet: function getkhongpheduyet(
    pageNumber,
    pageSize,
    name,
    callback
  ) {
    let limit = pageSize;
    let offset = pageSize * (pageNumber - 1);
    approvedData.getkhongpheduyet(limit, offset, name, (data) => {
      callback(data);
    });
  },
  getHopdong: function getHopdong(pageNumber, pageSize, callback) {
    let limit = pageSize;
    let offset = pageSize * (pageNumber - 1);
    approvedData.getHopdong(limit, offset, (data) => {
      callback(data);
    });
  },
  getHopdong1: function getHopdong1(pageNumber, pageSize, callback) {
    let limit = pageSize;
    let offset = pageSize * (pageNumber - 1);
    approvedData.getHopdong1(limit, offset, (data) => {
      callback(data);
    });
  },
  getHopdong2: function getHopdong2(pageNumber, pageSize, callback) {
    let limit = pageSize;
    let offset = pageSize * (pageNumber - 1);
    approvedData.getHopdong2(limit, offset, (data) => {
      callback(data);
    });
  },
  getHopdong3: function getHopdong3(pageNumber, pageSize, callback) {
    let limit = pageSize;
    let offset = pageSize * (pageNumber - 1);
    approvedData.getHopdong3(limit, offset, (data) => {
      callback(data);
    });
  },
  getSearch: function getSearch(
    pageNumber,
    pageSize,
    ten,
    loai,
    tungay,
    denngay,
    callback
  ) {
    let limit = pageSize;
    let offset = pageSize * (pageNumber - 1);
    approvedData.getSearch(
      limit,
      offset,
      ten,
      loai,
      tungay,
      denngay,
      (data) => {
        callback(data);
      }
    );
  },
  getHopdongAccept: function getHopdongAccept(pageNumber, pageSize, callback) {
    let limit = pageSize;
    let offset = pageSize * (pageNumber - 1);
    approvedData.getHopdongAccept(limit, offset, (data) => {
      callback(data);
    });
  },
  getHopdongAccept1: function getHopdongAccept1(
    pageNumber,
    pageSize,
    callback
  ) {
    let limit = pageSize;
    let offset = pageSize * (pageNumber - 1);
    approvedData.getHopdongAccept1(limit, offset, (data) => {
      callback(data);
    });
  },
  getHopdongAccept2: function getHopdongAccept2(
    pageNumber,
    pageSize,
    callback
  ) {
    let limit = pageSize;
    let offset = pageSize * (pageNumber - 1);
    approvedData.getHopdongAccept2(limit, offset, (data) => {
      callback(data);
    });
  },
  getHopdongAccept3: function getHopdongAccept3(
    pageNumber,
    pageSize,
    callback
  ) {
    let limit = pageSize;
    let offset = pageSize * (pageNumber - 1);
    approvedData.getHopdongAccept3(limit, offset, (data) => {
      callback(data);
    });
  },
  getHopdongRefuse: function getHopdongRefuse(pageNumber, pageSize, callback) {
    let limit = pageSize;
    let offset = pageSize * (pageNumber - 1);
    approvedData.getHopdongRefuse(limit, offset, (data) => {
      callback(data);
    });
  },
  getHopdongRefuse1: function getHopdongRefuse1(
    pageNumber,
    pageSize,
    callback
  ) {
    let limit = pageSize;
    let offset = pageSize * (pageNumber - 1);
    approvedData.getHopdongRefuse1(limit, offset, (data) => {
      callback(data);
    });
  },
  getHopdongRefuse2: function getHopdongRefuse2(
    pageNumber,
    pageSize,
    callback
  ) {
    let limit = pageSize;
    let offset = pageSize * (pageNumber - 1);
    approvedData.getHopdongRefuse2(limit, offset, (data) => {
      callback(data);
    });
  },
  getHopdongRefuse3: function getHopdongRefuse3(
    pageNumber,
    pageSize,
    callback
  ) {
    let limit = pageSize;
    let offset = pageSize * (pageNumber - 1);
    approvedData.getHopdongRefuse3(limit, offset, (data) => {
      callback(data);
    });
  },
  getNhatkyHopdong: function getNhatkyHopdong(pageNumber, pageSize, callback) {
    let limit = pageSize;
    let offset = pageSize * (pageNumber - 1);
    approvedData.getNhatkyHopdong(limit, offset, (data) => {
      callback(data);
    });
  },
  select: function select(value, callback) {
    approvedData.select(value, (data) => {
      callback(data);
    });
  },
  insertHopdong: async function insertHopdong(hopdong, callback) {
    approvedData.insertHopdong(hopdong, (response) => {
      var message = constant.successInsert;
      var status = 200;
      if (!response.success) {
        Validator.error.push(constant.errorSys);
        message = Validator.getError();
        status = 400;
      }
      callback(
        {
          message: message,
          success: response.success,
        },
        status
      );
    });
  },
  insertHopdong1: async function insertHopdong1(hopdong, callback) {
    let firtInsert;
    firtInsert = hopdong;
    firtInsert.id = uuidv4();
    firtInsert.status = "0";
    approvedData.insertHopdong1(firtInsert, (response) => {
      var message = constant.successInsert;
      var status = 200;
      if (!response.success) {
        Validator.error.push(constant.errorSys);
        message = Validator.getError();
        status = 400;
      }
      callback(
        {
          message: message,
          success: response.success,
        },
        status
      );
    });
  },
  insertHopdong2: async function insertHopdong2(hopdong, callback) {
    let firtInsert;
    firtInsert = hopdong;
    firtInsert.id = uuidv4();
    firtInsert.status = "0";
    approvedData.insertHopdong2(firtInsert, (response) => {
      var message = constant.successInsert;
      var status = 200;
      if (!response.success) {
        Validator.error.push(constant.errorSys);
        message = Validator.getError();
        status = 400;
      }
      callback(
        {
          message: message,
          success: response.success,
        },
        status
      );
    });
  },
  insertHopdong3: async function insertHopdong3(hopdong, callback) {
    let firtInsert;
    firtInsert = hopdong;
    firtInsert.id = uuidv4();
    firtInsert.status = "0";
    approvedData.insertHopdong3(firtInsert, (response) => {
      var message = constant.successInsert;
      var status = 200;
      if (!response.success) {
        Validator.error.push(constant.errorSys);
        message = Validator.getError();
        status = 400;
      }
      callback(
        {
          message: message,
          success: response.success,
        },
        status
      );
    });
  },
  insertHopdong4: async function insertHopdong4(hopdong, callback) {
    let firtInsert;
    firtInsert = hopdong;
    firtInsert.id = uuidv4();
    firtInsert.status = "0";
    approvedData.insertHopdong4(firtInsert, (response) => {
      var message = constant.successInsert;
      var status = 200;
      if (!response.success) {
        Validator.error.push(constant.errorSys);
        message = Validator.getError();
        status = 400;
      }
      callback(
        {
          message: message,
          success: response.success,
        },
        status
      );
    });
  },
  UpdateHopdong: async function updateHopdong(hopdong, callback) {
    approvedData.updateHopdong(hopdong, (res) => {
      callback({
        success: res.success,
        message:
          res.success === true
            ? [constant.successUpdate]
            : [constant.errorUpdate],
      });
    });
  },
  UpdateHopdong1: async function updateHopdong1(hopdong, callback) {
    approvedData.updateHopdong1(hopdong, (res) => {
      callback({
        success: res.success,
        message:
          res.success === true
            ? [constant.successUpdate]
            : [constant.errorUpdate],
      });
    });
  },
  UpdateHopdong2: async function updateHopdong2(hopdong, callback) {
    approvedData.updateHopdong2(hopdong, (res) => {
      callback({
        success: res.success,
        message:
          res.success === true
            ? [constant.successUpdate]
            : [constant.errorUpdate],
      });
    });
  },
  UpdateHopdong3: async function updateHopdong3(hopdong, callback) {
    approvedData.updateHopdong3(hopdong, (res) => {
      callback({
        success: res.success,
        message:
          res.success === true
            ? [constant.successUpdate]
            : [constant.errorUpdate],
      });
    });
  },
  UpdateHopdong4: async function updateHopdong4(hopdong, callback) {
    approvedData.updateHopdong4(hopdong, (res) => {
      callback({
        success: res.success,
        message:
          res.success === true
            ? [constant.successUpdate]
            : [constant.errorUpdate],
      });
    });
  },
  UpdateHopdong5: async function updateHopdong5(hopdong, callback) {
    approvedData.updateHopdong5(hopdong, (res) => {
      callback({
        success: res.success,
        message:
          res.success === true
            ? [constant.successUpdate]
            : [constant.errorUpdate],
      });
    });
  },
  UpdateHopdong6: async function updateHopdong6(hopdong, callback) {
    approvedData.updateHopdong6(hopdong, (res) => {
      callback({
        success: res.success,
        message:
          res.success === true
            ? [constant.successUpdate]
            : [constant.errorUpdate],
      });
    });
  },
  UpdateHopdong7: async function updateHopdong7(hopdong, callback) {
    approvedData.updateHopdong7(hopdong, (res) => {
      callback({
        success: res.success,
        message:
          res.success === true
            ? [constant.successUpdate]
            : [constant.errorUpdate],
      });
    });
  },
  deletechopheduyet: async function deletechopheduyet(hopdong, callback) {
    approvedData.deletechopheduyet(hopdong, (res) => {
      callback({
        success: res.success,
        message:
          res.success === true
            ? [constant.successUpdate]
            : [constant.errorUpdate],
      });
    });
  },
};
module.exports = approvedController;

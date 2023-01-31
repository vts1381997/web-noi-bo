var Validator = require('../validate/common')
const nhansuData = require('../data/nhansu_data')
const constant = require('./constant')
const uuidv1 = require('uuid/v1');

var nhansuController = {

    getNhansu: function getNhansu(pageNumber, pageSize, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        nhansuData.getNhansu(limit, offset, index, sortBy, function (data) {
            callback(data);
        })
    },

    getAllNhansu: function getAllNhansu(nhansu, callback) { 
        nhansuData.getAllNhansu(nhansu, function (data) {
            callback(data);
        })
    }, 

    insertNhansu: async function insertNhansu(nhansu, callback) {
        nhansu.ns_id = uuidv1();
        nhansu.ns_sodienthoai += "0";
        if (nhansu.ns_email === undefined || Validator.isMail(nhansu.ns_email, 'Email không đúng định dạng')
        ) {
            if (await Validator.db.unique('nhansu', 'ns_dinhdanhcanhan', nhansu.ns_dinhdanhcanhan, 'Định danh cá nhân đã tồn tại !')) {
                nhansuData.insertNhansu(nhansu, (response) => {
                    var message = constant.successInsert;
                    var status = 200;
                    if (!response.success) {
                        Validator.error.push(constant.errorSys)
                        message = Validator.getError();
                        status = 400
                    }
                    callback({
                        message: message,
                        success: response.success
                    }, status);
                });
            } else {
                callback({
                    message: Validator.getError(),
                    success: false
                }, 400);
            }
        } else {
            callback({
                message: Validator.getError(),
                success: false
            }, 400);
        }
    },

    updateNhansu: function updateNhansu(nhansu, callback) {
        if (Validator.isMail(nhansu.ns_email, 'Email không đúng định dạng') || nhansu.ns_email === "null") {
            if (1) {
                nhansuData.updateNhansu(nhansu, (res) => {
                    callback({
                        success: res.success,
                        message: res.success === true ? constant.successUpdate : constant.errorUpdate
                    })
                })
            }
        }
    },

    deleteNhansuById: async function deleteNhansuById(ns_id, callback) {
        nhansuData.deleteNhansu(ns_id, data => {
            if (data.success === true) {
                callback({
                    success: data.success,
                    message: data.success === true ? constant.successDelete : constant.errorMessage
                })
            }
            else
                callback({
                    success: data.error,
                    message: "foreign key"
                })
        })
    },

    getUser(callback) {
        nhansuData.getUser(function (data) {
            callback(data);
        })
    },
    getProfile(a, callback) {
        nhansuData.getProfile(a, function (data) {
            callback(data);
        })
    },

    getUpdate(s, callback) {
        nhansuData.getUpdate(s, function (data) {
            callback(data);
        })
    },

    getById: function getById(ns_id, callback) {
        nhansuData.getById(ns_id, data => {
            if (data == undefined) {
                callback({});
            }
            callback(data);
        });
    },

    search: function search(pageSize, pageNumber, textSearch, columnSearch, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        nhansuData.search(limit, offset, textSearch, columnSearch, index, sortBy, (data) => {
            callback(data);
        })
    },

    validateCreate: (req, res, next) => {
        next();
    },

    getJob(data, callback) {
        nhansuData.getJob(data, function (data) {
            callback(data);
        })
    },
}

module.exports = nhansuController;
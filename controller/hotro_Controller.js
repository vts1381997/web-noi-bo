var Validator = require('../validate/common')
const hotroData = require('../data/hotro_data')
const constant = require('./constant')
const uuidv1 = require('uuid/v1');

var hotroController = {

    getHotro: function getHotro(pageNumber, pageSize, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        hotroData.getHotro(limit, offset, index, sortBy, function (data) {
            callback(data);
        })
    },

    getSearch: function getSearch(pageNumber, pageSize, index, sortBy, ns_id_ass, callback) { 
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        hotroData.getSearch(limit, offset, index, sortBy, ns_id_ass, function (data) {
            callback(data);
        })
    },

    getAlls: function getAlls(data, callback) { 
        hotroData.getAlls(data, function (data) {
            callback(data);
        })
    },

    insertHotro: async function insertHotro(hotros, callback) {
        hotros.ht_id = uuidv1();
        hotroData.insertHotro(hotros, (response) => {
            var message = constant.successInsert;
            var status = 200;
            if (!response.success) {
                Validator.error.push(constant.errorSys)
                message = Validator.getError();
                status = 400
            }
            callback({
                message: message,
                success: response.success,
                ht_id:response.ht_id
            }, status);
        });
    },

    chat: async function chat(hotros, callback) {
        hotros.id = uuidv1();
        hotroData.chat(hotros, (response) => { 
        });
    },

    updateHotro: function updateHotro(hotros, callback) {
        hotroData.updateHotro(hotros, (res) => {
            callback({
                success: res.success,
                message: res.success === true ? constant.successUpdate : constant.errorUpdate
            })
        })
    }, 

    deleteHotroById: async function deleteHotroById(ht_id, callback) {
        hotroData.deleteHotro(ht_id, data => {
            if (data.success === true) {
                callback({
                    success: data.success,
                    message: data.success === true ? constant.successDelete : constant.errorMessage
                })
            }
        })
    },

    getDataMyself: function getDataMyself(myself, callback) {
        hotroData.getDataMyself(myself, (data) => {
            callback(data);
        })
    },

    getDataMyselfDaxong: function getDataMyselfDaxong(myself,limit, offset, callback) {
        hotroData.getDataMyselfDaxong(myself, limit, offset, (data) => {
            callback(data);
        })
    },

    getDataMyselfGap: function getDataMyselfGap(myself,pageNumber, pageSize, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        hotroData.getDataMyselfGap(myself, limit, offset, index, sortBy, (data) => {
            callback(data);
        })
    },

    getDataNguoitao: function getDataNguoitao(dataNguoiTao, callback) {
        hotroData.getDataNguoiTao(dataNguoiTao, (data) => {
            callback(data);
        })
    },

    getIdDuan(callback) {
        hotroData.getIdDuan(function (data) {
            callback(data);
        })
    },

    getNhanSu(callback) {
        hotroData.getNhanSu(function (data) {
            callback(data);
        })
    },

    getKhachHang(callback) {
        hotroData.getKhachHang(function (data) {
            callback(data);
        })
    },

    getKhachHangWhere(dv, callback) {
        hotroData.getKhachHangWhere(dv, function (data) {
            callback(data);
        })
    },

    getDonVi(callback) {
        hotroData.getDonVi(function (data) {
            callback(data);
        })
    },

    getHopDong(callback) {
        hotroData.getHopDong(function (data) {
            callback(data);
        })
    },

    getDataKhachHang: function getDataKhachHang(ht_id, callback) {
        hotroData.getDataKhachhang(ht_id, (data) => {
            callback(data);
        })
    },

    getChat: function getChat(data, callback) {
        hotroData.getChat(data, (data) => {
            callback(data);
        })
    },

    getName: function getName(cookie, callback) {
        hotroData.getName(cookie, (data) => {
            callback(data);
        })
    },

    getDataSearch: function getDataSearch(pageSize, pageNumber, textSearch, columnSearch, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        hotroData.getDataSearch(limit, offset, textSearch, columnSearch, index, sortBy, data => {
            callback(data);
        })
    },

    getHotroFollowMonth: function getHotroFollowMonth(monthToMonth, callback) {
        hotroData.getHotroFollowMonth(monthToMonth, data => {
            if (data == undefined) {
                callback({});
            }
            callback(data);
        });
    }, 

    search: function search(pageSize, pageNumber, textSearch, columnSearch, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        hotroData.search(limit, offset, textSearch, columnSearch, index, sortBy, (data) => {
            callback(data);
        })
    },

    getHotroById: function getHotroById(ht_id, callback) {
        hotroData.getHotroById(ht_id.ht_id, (data) => {
            callback(data);
        })
    },

    validateCreate: (req, res, next) => {
        next();
    }
}

module.exports = hotroController;
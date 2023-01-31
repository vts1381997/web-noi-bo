var Validator = require('../validate/common')
const thongbaoData = require('../data/thongbao_data')
const constant = require('./constant')
const uuidv1 = require('uuid/v1');
var thongbaoController = {

    getThongbao: function getThongbao(tb_ns_id, callback) {
        thongbaoData.getThongbao(tb_ns_id, function (data) {
            callback(data);
        })
    },

    getThongbaoDadoc: function getThongbaoDadoc(tb_ns_id, callback) {
        thongbaoData.getThongbaoDadoc(tb_ns_id, function (data) {
            callback(data);
        })
    },

    insertThongbao: function insertThongbao(thongbao, callback) {
        thongbao.tb_id = uuidv1();
        thongbaoData.insertThongbao(thongbao, (response) => {
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
    },

    updateThongbao: function updateThongbao(thongbao, callback) {
        thongbaoData.updateThongbao(thongbao, (res) => {
            callback({
                message: res.success === true ? constant.successUpdate : constant.errorUpdate
            })
        })
    },

    updateThongbaoTatcaDadoc(callback) {
        thongbaoData.updateThongbaoTatcaDadoc((res) => {
            callback({
                success: res.success,
                message: res.success === true ? constant.successUpdate : constant.errorUpdate
            })
        })
    },

    deleteThongbaochuadoc: async function deleteHotroById(trangthai, callback) {
        thongbaoData.deleteThongbaoChuadoc(trangthai, data => {
            if (data.success === true) {
                callback({
                    success: data.success,
                    message: data.success === true ? constant.successDelete : constant.errorMessage
                })
            }
        })
    },
}

module.exports = thongbaoController;
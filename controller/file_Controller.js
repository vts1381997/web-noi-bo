var Validator = require('../validate/common')
const file_data = require('../data/file_data')
const constant = require('./constant')
const uuidv1 = require('uuid/v1');

var fileController = {

    getFile: function getFile(pageNumber, pageSize, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        file_data.getFile(limit, offset, index, sortBy, function (data) {
            callback(data);
        })
    },

    insertFile_khachhangs: function insertFile_khachhangs(file_khachhangs, callback) {
        file_khachhangs.file_id = uuidv1();
        file_data.inserFile_khachhangs(file_khachhangs, (response) => {
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
                dataSheet2: response.dataSheet2,
                dataSheet1: response.dataSheet1
            }, status);
        });
    },

    updateFile_khachhangs: function updateFile_khachhangs(menus, callback) {
        file_data.updateFile_khachhangs(menus, (res) => {
            callback({
                success: res.success,
                message: res.success === true ? constant.successUpdate : constant.errorUpdate
            })
        })
    },

    deleteFile_khachhangsById: async function deleteFile_khachhangsById(file_id, callback) {
        file_data.deleteFile_khachhangs(file_id, data => {
            if (data.success === true) {
                callback({
                    success: data.success,
                    message: data.success === true ? constant.successDelete : constant.errorMessage
                })
            }
        })
    },
}

module.exports = fileController;
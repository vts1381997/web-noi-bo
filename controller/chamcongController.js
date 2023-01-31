var Validator = require('../validate/common');
const chamcongData = require('../data/chamcongData');
const constant = require('./constant');
var chamcongController = {
    /**
     * Get user paging.
     * @param {Number} pageNumber Page number
     * @param {Number} pageSize Page size
     * @param {Function} callback Function call back
     */
    /**
     * @param
     */
    getHalf: function getHalf(pageNumber, pageSize, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        chamcongData.getHalf(limit, offset, (data) => {
            callback(data);
        });
    },
    getHalf1: function getHalf1(pageNumber, pageSize, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        chamcongData.getHalf1(limit, offset, (data) => {
            callback(data);
        });
    },
    getHalf2: function getHalf2(pageNumber, pageSize, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        chamcongData.getHalf2(limit, offset, (data) => {
            callback(data);
        });
    },
    /**
     * Get user by Id.
     * @param {Number} Id The identify of user
     */
    insertChamCong: async function insertChamCong(hopdong, callback) {
        chamcongData.insertChamCong(hopdong, (response) => {
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
    UpdateHalf: async function updateHalf(hopdong, callback) {
        chamcongData.updateHalf(hopdong, (res) => {
            callback({
                success: res.success,
                message: res.success === true ? [constant.successUpdate] : [constant.errorUpdate]
            })
        })
    },
    UpdateHalf1: async function updateHalf1(hopdong, callback) {
        chamcongData.updateHalf1(hopdong, (res) => {
            callback({
                success: res.success,
                message: res.success === true ? [constant.successUpdate] : [constant.errorUpdate]
            })
        })
    },
}
module.exports = chamcongController;
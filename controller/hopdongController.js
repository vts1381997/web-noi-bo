var Validator = require('../validate/common');
const hopdongData = require('../data/hopdong.data');
const constant = require('./constant');
const uuidv4 = require('uuid/v4');
var HopdongController = {
    /**
     * Get user paging.
     * @param {Number} pageNumber Page number
     * @param {Number} pageSize Page size
     * @param {Function} callback Function call back
     */
    /**
     * @param
     */
    getHopdong: function getHopdong(pageNumber, pageSize, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        hopdongData.getHopdong(limit, offset, (data) => {
            callback(data);
        });
    },
    getNhatkyHopdong: function getNhatkyHopdong(pageNumber, pageSize, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        hopdongData.getNhatkyHopdong(limit, offset, (data) => {
            callback(data);
        });
    },
    /**
     * Get user by Id.
     * @param {Number} Id The identify of user
     */
    GetById: function GetById(Id, callback) {
        hopdongData.GetById(Id, (data) => {
            if (data == undefined) {
                callback({});
            }
            callback(data);
        });
    },
    DeleteHopdongbyId: async function deleteHopdongbyId(hd_id, callback) {
        hopdongData.deleteHopdongbyId(hd_id, (data) => {
            if (data.success === true) {
                callback({
                    success: data.success,
                    message: data.success === true ? constant.successDelete : constant.errorMessage
                })
            }
        })
    },
    insertHopdong: async function insertHopdong(hopdong, callback) {
        let firtInsert;
        firtInsert = hopdong;
        firtInsert.hd_id = uuidv4();
        hopdongData.insertHopdong(firtInsert, (response) => {
            var message = constant.successInsert;
            var status = 200;
            if (!response.success) {
                Validator.error.push(constant.errorSys)
                message = Validator.getError()
                status = 400
            }
            callback({
                message: message,
                success: response.success
            }, status);
        })
    },
    UpdateHopdong: async function updateHopdong(hopdong, callback) {
        hopdongData.updateHopdong(hopdong, (res) => {
            callback({
                success: res.success,
                message: res.success === true ? [constant.successUpdate] : [constant.errorUpdate]
            })
        })
    },
    getcha: function getcha(callback) {
        hopdongData.getcha((data) => {
            callback(data)
        })
    },
    getdonvi: function getdonvi(callback) {
        hopdongData.getdonvi((data) => {
            callback(data)
        })
    },
    getkhachhang: function getkhachhang(callback) {
        hopdongData.getkhachhang((data) => {
            callback(data)
        })
    },
    getduan: function getduan(callback) {
        hopdongData.getduan((data) => {
            callback(data)
        })
    },
    getinsertduan: function getinsertduan(callback) {
        hopdongData.getinsertduan((data) => {
            callback(data)
        })
    },
    search: function search(pageSize, pageNumber, textSearch, columnSearch, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        hopdongData.search(limit, offset, textSearch, columnSearch, index, sortBy, (data) => {
            callback(data);
        })
    },
    validateCreate: (req, res, next) => {
        next()
    },
    insertDuan: async function insertDuan(duan, callback) {
        if (1
        ) {
            if (1) {
                let firstInsert;
                firstInsert = duan;
                firstInsert.dm_duan_id = uuidv4();
                hopdongData.insertDuan(duan, (response) => {
                    var message = constant.successInsert;
                    var status = 200;
                    if (!response.success) {
                        Validator.error.push(constant.errorSys)
                        message = Validator.getError()
                    }
                    callback({
                        message: message,
                        success: response.success
                    }, status);
                })
            }
            else {
                callback({
                    message: Validator.getError(),
                    success: false
                }, status);
            }

        } else {
            callback({
                message: Validator.getError(),
                success: false
            }, 400);
        }
    },
}
module.exports = HopdongController;
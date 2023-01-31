var Validator = require('../validate/common');
const halfData = require('../data/half.data');
const constant = require('./constant');
const uuidv4 = require('uuid/v4');
var halfController = {
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
        halfData.getHalf(limit, offset, (data) => {
            callback(data);
        });
    },
    getHalf1: function getHalf1(pageNumber, pageSize, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        halfData.getHalf1(limit, offset, (data) => {
            callback(data);
        });
    },
    getHalf2: function getHalf2(pageNumber, pageSize, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        halfData.getHalf2(limit, offset, (data) => {
            callback(data);
        });
    },
    getHalf3: function getHalf3(pageNumber, pageSize, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        halfData.getHalf3(limit, offset, (data) => {
            callback(data);
        });
    },
    getHalfAccept: function getHalfAccept(pageNumber, pageSize, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        halfData.getHalfAccept(limit, offset, (data) => {
            callback(data);
        });
    },
    getHalfAccept1: function getHalfAccept1(pageNumber, pageSize, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        halfData.getHalfAccept1(limit, offset, (data) => {
            callback(data);
        });
    },
    getHalfAccept2: function getHalfAccept2(pageNumber, pageSize, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        halfData.getHalfAccept2(limit, offset, (data) => {
            callback(data);
        });
    },
    getHalfAccept3: function getHalfAccept3(pageNumber, pageSize, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        halfData.getHalfAccept3(limit, offset, (data) => {
            callback(data);
        });
    },
    getHalfRefuse: function getHalfRefuse(pageNumber, pageSize, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        halfData.getHalfRefuse(limit, offset, (data) => {
            callback(data);
        });
    },
    getHalfRefuse1: function getHalfRefuse1(pageNumber, pageSize, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        halfData.getHalfRefuse1(limit, offset, (data) => {
            callback(data);
        });
    },
    getHalfRefuse2: function getHalfRefuse2(pageNumber, pageSize, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        halfData.getHalfRefuse2(limit, offset, (data) => {
            callback(data);
        });
    },
    getHalfRefuse3: function getHalfRefuse3(pageNumber, pageSize, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        halfData.getHalfRefuse3(limit, offset, (data) => {
            callback(data);
        });
    },
    getNhatkyHalf: function getNhatkyHalf(pageNumber, pageSize, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        halfData.getNhatkyHalf(limit, offset, (data) => {
            callback(data);
        });
    },
    /**
     * Get user by Id.
     * @param {Number} Id The identify of user
     */
    insertHalf: async function insertHalf(hopdong, callback) {
        halfData.insertHalf(hopdong, (response) => {
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
    insertHalf1: async function insertHalf1(hopdong, callback) {
        let firtInsert;
        firtInsert = hopdong;
        firtInsert.id = uuidv4();
        firtInsert.status = '0'
        halfData.insertHalf1(firtInsert, (response) => {
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
    insertHalf2: async function insertHalf2(hopdong, callback) {
        let firtInsert;
        firtInsert = hopdong;
        firtInsert.id = uuidv4();
        firtInsert.day = 'sang'
        firtInsert.status = '0'
        halfData.insertHalf2(firtInsert, (response) => {
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
    insertHalf3: async function insertHalf3(hopdong, callback) {
        let firtInsert;
        firtInsert = hopdong;
        firtInsert.id = uuidv4();
        firtInsert.day = 'chieu'
        firtInsert.status = '0'
        halfData.insertHalf3(firtInsert, (response) => {
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
            halfData.updateHalf(hopdong, (res) => {
                callback({
                    success: res.success,
                    message: res.success === true ? [constant.successUpdate] : [constant.errorUpdate]
                })
            })        
    },
    UpdateHalf1: async function updateHalf1(hopdong, callback) {
            halfData.updateHalf1(hopdong, (res) => {
                callback({
                    success: res.success,
                    message: res.success === true ? [constant.successUpdate] : [constant.errorUpdate]
                })
            })        
    },
    UpdateHalf2: async function updateHalf2(hopdong, callback) {
            halfData.updateHalf2(hopdong, (res) => {
                callback({
                    success: res.success,
                    message: res.success === true ? [constant.successUpdate] : [constant.errorUpdate]
                })
            })        
    },
    UpdateHalf3: async function updateHalf3(hopdong, callback) {
            halfData.updateHalf3(hopdong, (res) => {
                callback({
                    success: res.success,
                    message: res.success === true ? [constant.successUpdate] : [constant.errorUpdate]
                })
            })        
    },
    UpdateHalf4: async function updateHalf4(hopdong, callback) {
            halfData.updateHalf4(hopdong, (res) => {
                callback({
                    success: res.success,
                    message: res.success === true ? [constant.successUpdate] : [constant.errorUpdate]
                })
            })        
    },
    UpdateHalf5: async function updateHalf5(hopdong, callback) {
            halfData.updateHalf5(hopdong, (res) => {
                callback({
                    success: res.success,
                    message: res.success === true ? [constant.successUpdate] : [constant.errorUpdate]
                })
            })        
    },
    UpdateHalf6: async function updateHalf6(hopdong, callback) {
            halfData.updateHalf6(hopdong, (res) => {
                callback({
                    success: res.success,
                    message: res.success === true ? [constant.successUpdate] : [constant.errorUpdate]
                })
            })        
    },
    UpdateHalf7: async function updateHalf7(hopdong, callback) {
            halfData.updateHalf7(hopdong, (res) => {
                callback({
                    success: res.success,
                    message: res.success === true ? [constant.successUpdate] : [constant.errorUpdate]
                })
            })        
    }, 
}
module.exports = halfController;
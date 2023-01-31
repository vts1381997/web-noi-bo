var Validator = require('../validate/common')
const customerData = require('../data/customer.data')
const constant = require('./constant')
const uuidv1 = require('uuid/v1');
var CustomerController = {
    /**
     * Get user paging.
     * @param {Number} pageNumber Page number
     * @param {Number} pageSize Page size
     * @param {Function} callback Function call back
     */
    /**
     * @para
     */
    getCustomer: function getCustomer(pageNumber, pageSize, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        var res_customer = []
        customerData.getCustomer(limit, offset, index, sortBy, async (data) => {
            await data.data.customers.map((value, index) => {
                switch (value.kh_lienlac) {
                    case 'DD':
                        value.kh_lienlac_txt = 'Đại diện'
                        break;
                    case 'DM':
                        value.kh_lienlac_txt = 'Đầu mối liên lạc'
                        break;
                    case 'TXLL':
                        value.kh_lienlac_txt = 'Thường xuyên liên lạc'
                        break;
                }
                res_customer.push(value)
            })
            data.data.customers = res_customer
            callback(data);
        });
    },
    /**
    * Get user by Id.
    * @param {Number} Id The identify of user
    */

    // getcha: function getcha(callback) {
    //     unitData.getcha((data)=>{
    //         callback(data)
    //     })
    // },


    GetById: function GetById(Id, callback) {
        customerData.GetById(Id, (data) => {
            if (data == undefined) {
                callback({});
            }
            callback(data);
        })
    },

    getTinh: function getTinh(callback) {
        customerData.getTinh((data) => {
            callback(data)
        })
    },

    getHuyen: function getHuyeb(body, callback) {
        customerData.getHuyen(body.id_db_tinh, (data) => {
            callback(data)
        })
    },

    getXa: function getXa(data, callback) {
        customerData.getXa(data.id_db_huyen, (data) => {
            callback(data)
        })
    },

    getDonvi: function getDonvi(callback) {
        customerData.getDonvi((data) => {
            callback(data)
        })
    },

    DeleteCustomerbyId: async function deleteCustomerbyId(kh_id, callback) {
        customerData.deleteCustomerbyId(kh_id, (data) => {
            if (data.success === true) {
                callback({
                    success: data.success,
                    message: data.success === true ? constant.successDelete : constant.errorMessage
                })
            }
            callback({
                success: data.eror,
                message: "Lỗi!!!"
            });
        })
    },

    insertDonvi: function insertDonvi(donvi, callback) {
        customerData.insertDonvi(donvi, (response) => {
            var message = constant.successInseart;
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
    },

    insertCustomer: async function insertCustomer(customer, callback) {
        if (customer.length > 1) {
            await customer.forEach((element, index) => {
                customer[index].kh_id = uuidv1()
            });
            customerData.insertCustomer(customer, (response) => {
                var message = constant.successInseart;
                var status = 200;
                if (!response.success) {
                    Validator.error.push(constant.errorSys)
                    message = Validator.getError()
                }
                callback({
                    message: message,
                    success: response.success,

                }, status);
            })
        }
        else {
            customer.kh_id = uuidv1();
            customer.dm_db_id_tinh = customer.dm_db_id_tinh_customer
            customer.dm_db_id_huyen = customer.dm_db_id_huyen_customer
            customer.dm_db_id_xa = customer.dm_db_id_xa_customer
            delete customer.dm_db_id_huyen_customer
            delete customer.dm_db_id_tinh_customer
            delete customer.dm_db_id_xa_customer

            if (customer.kh_sodienthoai === undefined || await (Validator.db.unique('khachhangs', 'kh_sodienthoai', customer.kh_sodienthoai, 'Số điện thoại này đã tồn tại !!'))) {
                customerData.insertCustomer(customer, (response) => {
                    var message = constant.successInseart;
                    var status = 200;
                    if (!response.success) {
                        Validator.error.push(constant.errorSys)
                        message = Validator.getError()
                    }
                    callback({
                        message: message,
                        success: response.success,
                        id_customer: customer.kh_id
                    }, status);
                })
            }
            else {
                var eror = Validator.getError()
                console.log(eror)
                callback({
                    message: eror,
                    success: false
                }, 400);
            }
        }
    },

    insertDonvi: function insertDonvi(donvi, callback) {
        customerData.insertDonvi(donvi, (response) => {
            var message = constant.successInseart;
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
    },

    updateCustomer: function updateCustomer(customer, callback) {
        // customer.dm_db_id_tinh = customer.dm_db_id_tinh_customer
        // customer.dm_db_id_huyen = customer.dm_db_id_huyen_customer
        // customer.dm_db_id_xa = customer.dm_db_id_xa_customer
        // delete customer.dm_db_id_huyen_customer
        // delete customer.dm_db_id_tinh_customer
        // delete customer.dm_db_id_xa_customer

        customer.dm_db_id_tinh = customer.idtinh
        customer.dm_db_id_huyen = customer.idhuyen
        customer.dm_db_id_xa = customer.idxa
        delete customer.dm_db_id_huyen_customer
        delete customer.dm_db_id_tinh_customer
        delete customer.dm_db_id_xa_customer
        delete customer.idtinh
        delete customer.idhuyen
        delete customer.idxa
        customerData.updateCustomer(customer, (res) => {
            callback({
                success: res.success,
                message: res.success === true ? constant.successUpdate : callback.errorUpdate
            })
        })
    },
    search: function search(pageSize, pageNumber, textSearch, columnSearch, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        customerData.search(limit, offset, textSearch, columnSearch, index, sortBy, (data) => {
            callback(data);
        })
    },

    validateCreate: (req, res, next) => {
        next()
    },
}
module.exports = CustomerController;
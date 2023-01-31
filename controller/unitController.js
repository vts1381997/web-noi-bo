var Validator = require('../validate/common')
const unitData = require('../data/unit.data')
const constant = require('./constant')
const uuidv1 = require('uuid/v1');
var knex = require('../data/common/DB')
var UnitController = {
    /**
     * Get user paging.
     * @param {Number} pageNumber Page number
     * @param {Number} pageSize Page size
     * @param {Function} callback Function call back
     */
    /**
     * @para
     */
    getUnit: function getUnit(pageNumber, pageSize, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        var res_unit = []
        unitData.getUnit(limit, offset, index, sortBy, async (data) => {
            await data.data.units.map((value, index) => {
                switch (value.dm_dv_trangthai) {
                    case 'HD':
                        value.dm_dv_trangthai_txt = 'Hoạt Động'
                        break;
                    case 'DHD':
                        value.dm_dv_trangthai_txt = 'Dừng Hoạt Động'
                        break;
                    case 'GT':
                        value.dm_dv_trangthai_txt = 'Giải Thể'
                        break;
                }

                res_unit.push(value)
            })
            data.data.units = res_unit
            callback(data);
        });
    },
    /**
    * Get user by Id.
    * @param {Number} Id The identify of user
    */

    getcha: function getcha(callback) {
        unitData.getcha((data) => {
            callback(data)
        })
    },

    getTinh: function getTinh(callback) {
        unitData.getTinh((data) => {
            callback(data)
        })
    },

    getHuyen: function getHuyeb(body, callback) {
        unitData.getHuyen(body.id_db_tinh, (data) => {
            callback(data)
        })
    },

    getXa: function getXa(data, callback) {
        unitData.getXa(data.id_db_huyen, (data) => {
            callback(data)
        })
    },

    getKhachhang: function getKhachhang(callback) {
        unitData.getKhachhang((data) => {
            callback(data)
        })
    },

    GetById: function GetById(Id, callback) {
        unitData.GetById(Id, (data) => {
            if (data == undefined) {
                callback({});
            }
            callback(data);
        })
    },

    DeleteUnitbyId: async function deleteUnitbyId(dm_dv_id, callback) {
        unitData.deleteUnitbyId(dm_dv_id, (data) => {
            if (data.success === true) {
                callback({
                    success: data.success,
                    message: data.success === true ? constant.successDelete : constant.errorMessage
                })
            }
            else
                callback({
                    success: data.eror,
                    message: "Lỗi!!!"
                });
        })
    },

    insertKhachhang: function insertKhachhang(khachhang, callback) {
        unitData.insertKhachhang(khachhang, (response) => {
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

    insertUnit: async function insertUnit(unit, callback) {
        if (unit.length > 1) {
            // await unit.forEach((element, index) => {
            //     unit[index].dm_dv_id = uuidv1()
            //     if (element.dm_dv_id_cha === undefined) {
            //         unit[index].dm_dv_id_cha = null
            //     }
            //     else
            //         knex.raw("select dm_dv_id from donvis where dm_dv_ten='" + element.dm_dv_id_cha + "'").then((res) => {

            //             unit[index].dm_dv_id_cha = res.rows[0].dm_dv_id_cha
            //         })
            //     knex.raw("select dm_db_id from diabans where dm_db_ten='" + element.dm_db_id_tinh + "' and dm_db_cap = 1").then((res) => {
            //         unit[index].dm_db_id_tinh = res.rows[0].dm_db_id
            //     })
            //     knex.raw("select dm_db_id from diabans where dm_db_ten='" + element.dm_db_id_huyen + "' and dm_db_cap = 2").then((res) => {
            //         unit[index].dm_db_id_huyen = res.rows[0].dm_db_id
            //     })
            //     knex.raw("select dm_db_id from diabans where dm_db_ten='" + element.dm_db_id_xa + "' and dm_db_cap = 3").then((res) => {
            //         unit[index].dm_db_id_xa = res.rows[0].dm_db_id
            //     })
            //     unit[index].kh_id_nguoidaidien = ''
            //     if (unit[index].dm_dv_trangthai === "Hoạt Động") {
            //         unit[index].dm_dv_trangthai = "HD"
            //     }
            //     else if (unit[index].dm_dv_trangthai === "Giải Thể") {
            //         unit[index].dm_dv_trangthai = "GT"
            //     }
            //     else
            //         unit[index].dm_dv_trangthai = "DHD"

            // });
            // unitData.insertUnit(unit, (response) => {
            //     var message = constant.successInseart;
            //     var status = 200;
            //     if (!response.success) {
            //         Validator.error.push(constant.errorSys)
            //         message = Validator.getError()
            //     }
            //     callback({
            //         message: message,
            //         success: response.success,

            //     }, status);
            // })

            
        }
        else {
            unit.dm_dv_id = uuidv1();
            if ((unit.dm_dv_masothue === undefined || await Validator.db.unique('donvis', 'dm_dv_masothue', unit.dm_dv_masothue, 'Mã số thuế này đã tồn tại !!'))
                & (unit.dm_dv_sodienthoai === undefined || await Validator.db.unique('donvis', 'dm_dv_sodienthoai', unit.dm_dv_sodienthoai, 'Số điện thoại này đã tồn tại !!'))
            ) {
                unitData.insertUnit(unit, (response) => {
                    var message = constant.successInseart;
                    var status = 200;
                    if (!response.success) {
                        Validator.error.push(constant.errorSys)
                        message = Validator.getError()
                    }
                    callback({
                        message: message,
                        success: response.success,
                        id_unit: unit.dm_dv_id
                    }, status);
                })
            }
            else {
                var eror = Validator.getError()
                callback({
                    message: eror,
                    success: false
                }, 400);
            }
        }

    },
    updateUnit: function updateUnit(unit, callback) {
        // if(await Validator.db.unique('donvis', 'dm_dv_id_cha', unit.dm_dv_id_cha, 'Error!!')){
        //     callback({success: false, message: res.success == false})
        // }else{
        // if(unit.dm_dv_id == unit.dm_dv_ten){
        //     unitData.getUnit(this, null);
        // }else{
        unitData.updateUnit(unit, (res) => {
            callback({
                success: res.success,
                message: res.success === true ? constant.successUpdate : callback.errorUpdate
            })
        })
        // }
    },
    search: function search(pageSize, pageNumber, textSearch, columnSearch, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        unitData.search(limit, offset, textSearch, columnSearch, index, sortBy, (data) => {
            callback(data);
        })
    },

    validateCreate: (req, res, next) => {
        next()
    },
}
module.exports = UnitController;
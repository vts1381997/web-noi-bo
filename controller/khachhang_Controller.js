var Validator = require('../validate/common')
const khachhangData = require('../data/khachhang_data')
const constant = require('./constant')
const uuidv1 = require('uuid/v1');

var khachhangController = {
    getKhachhang: function getKhachhang(callback) {
        var res_khachhang = []
        khachhangData.getKhachhang(limit, offset, index, sortBy, async (data) => {
            await data.data.khachhangs.map((value, index) => {
                switch (value.kh_lienlac) {
                    case 'HD':
                        value.kh_lienlac_txt = 'Đại diện'
                        break;
                    case 'DHD':
                        value.kh_lienlac_txt = 'Đầu mối liên lạc'
                        break;
                    case 'GT':
                        value.kh_lienlac_txt = 'Thường xuyên lien lạc'
                        break;
                }
                res_khachhang.push(value)
            })
            data.data.khachhangs = res_khachhang
            callback(data);
        });
    },

    insertKhachhang: async function insertKhachhang(khachhangs, callback) {
        khachhangs.kh_id = uuidv1();
        khachhangs.dm_db_id_tinh = khachhangs.dm_db_id_tinh_customer
        khachhangs.dm_db_id_huyen = khachhangs.dm_db_id_huyen_customer
        khachhangs.dm_db_id_xa = khachhangs.dm_db_id_xa_customer
        delete khachhangs.dm_db_id_huyen_customer
        delete khachhangs.dm_db_id_tinh_customer
        delete khachhangs.dm_db_id_xa_customer
        khachhangData.insertCustomer(khachhangs, (response) => {
            var message = constant.successInseart;
            var status = 200;
            if (!response.success) {
                Validator.error.push(constant.errorSys)
                message = Validator.getError()
                status = 400
            }
            callback({
                message: message,
                success: response.success,
                id_khachhang: khachhangs.kh_id
            }, status);
        })
    },
}
module.exports = khachhangController;
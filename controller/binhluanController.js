var Validator = require('../validate/common')
const binhluanData = require('../data/binhluan_data')
const constant = require('./constant')
const uuidv1 = require('uuid/v1');
var binhluanController = {

    getBinhluan: function getBinhluan(ht_id, callback) {
        // let limit = pageSize;
        // let offset = pageSize * (pageNumber - 1);
        binhluanData.getBinhluan(ht_id,function (data) {
            callback(data);
        })
    },

    insertBinhluan: function insertBinhluan(binhluan, callback) {
        // console.log("day la binh luan ", binhluan)
        binhluan.bl_id = uuidv1();
        var bl={}
        bl.bl_id=uuidv1()
        bl.bl_author=binhluan[0].author
        bl.bl_avatar=binhluan[0].avatar
        bl.bl_content=binhluan[0].content
        bl.bl_datetime=binhluan[0].datetime
        bl.bl_ht_id=binhluan[0].ht_id
        binhluanData.insertBinhluan(bl, (response) => {
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
    }
}

module.exports = binhluanController;
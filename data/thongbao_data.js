var knex = require('./common/DB')

module.exports = {
    getThongbao: (tb_ns_id, callback) => { 
        knex.raw("select * from thongbaos where tb_ns_id=(select ns.ns_id from nhansu ns where ns_dinhdanhcanhan=(select madinhdanh from users where name='" + tb_ns_id.tb_ns_id + "')) and tb_trangthai='chuadoc' order by tb_thoigiantao DESC")
            .then((res) => {
                callback({
                    success: true,
                    data: {
                        thongbao: res.rows,
                    }
                })
            }).catch((err) => {
                console.log(err),
                    callback({
                        success: false
                    })
            })
    },

    getThongbaoDadoc: (tb_ns_id, callback) => {
        var query = "select * from thongbaos where tb_ns_id=(select ns.ns_id from nhansu ns where ns_dinhdanhcanhan=(select madinhdanh from users where name='" + tb_ns_id.tb_ns_id + "')) and tb_trangthai='dadoc'";
        knex.raw(query)
            .then((res) => {
                callback({
                    success: true,
                    data: {
                        thongbaodadoc: res.rows,
                    }
                })
            }).catch((err) => {
                console.log(err),
                    callback({
                        success: false
                    })
            })
    },

    insertThongbao: function (thongbao, callback) {
        knex.from('thongbaos').insert(thongbao).then(res => {
            callback({
                success: true
            })
        }).catch(err => {
            console.log(err)
            callback({
                success: false
            })
        })
    },

    updateThongbao: function (thongbao, callback) {
        knex.from('thongbaos').where('tb_id', thongbao.key).update({ tb_trangthai: 'dadoc' }).then(res => {
            callback({
                success: true,
            })
        }).catch(err => {
            console.log(err)
            callback({
                success: false
            })
        })
    },

    updateThongbaoTatcaDadoc(callback) {
        knex.from('thongbaos').update({ tb_trangthai: 'dadoc' }).then(res => {
            callback({
                success: true,
            })
        }).catch(err => {
            console.log(err)
            callback({
                success: false
            })
        })
    },

    deleteThongbaoChuadoc: function (trangthai, callback) {
        knex.from('thongbaos').where('tb_trangthai', trangthai).del().then(res => {
            callback({
                success: true
            })
        }).catch(err => {
            console.log(err)
            callback({
                success: false
            })
        })
    }
}
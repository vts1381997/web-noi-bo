var knex = require('./common/DB')
module.exports = {
    getQuanly_hoadons: (limit, offset, index, sortBy, callback) => {
            knex.raw("select hd.*,kh.id1 as qlhd_kh_muahang, kh.ten1 as tenkhachhangmua, khs.id2 as qlhd_kh_banhang, khs.ten2 as tenkhachhangban, dv.id3 as qlhd_dv_muahang, dv.ten3 as tendonvimua,dvs.id4 as qlhd_dv_banhang, dvs.ten4 as tendonviban from quanly_hoadons hd\
            left join(select kh_id id1, kh_ten as ten1 from khachhangs khs) as kh on kh.id1 = hd.qlhd_kh_muahang\
            left join(select kh_id id2, kh_ten as ten2 from khachhangs khs) as khs on khs.id2 = hd.qlhd_kh_banhang\
            left join(select dm_dv_id id3, dm_dv_ten as ten3 from donvis dvs) as dv on dv.id3 = hd.qlhd_dv_muahang\
            left join(select dm_dv_id id4, dm_dv_ten as ten4 from donvis dvs) as dvs on dvs.id4 = hd.qlhd_dv_banhang\
         ")
            .then((res) => {
                knex('quanly_hoadons').count()
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                quanly_hoadons: res.rows,
                                count: resCount[0].count
                            }
                        })
                    }).catch((err) => {
                        console.log(err),
                            callback({
                                success: false
                            })
                    })
            }).catch((err) => {
                console.log(err),
                    callback({
                        success: false
                    })
            })
    },

    insertQuanly_hoadons: function (quanly_hoadons, callback) {
        knex.from('quanly_hoadons').insert(quanly_hoadons).then(res => {
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

    updateQuanly_hoadons: function (quanly_hoadons, callback) {
        knex.from('quanly_hoadons').where('qlhd_id', quanly_hoadons.qlhd_id).update(quanly_hoadons).then(res => {
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

    deleteQuanly_hoadons: function (qlhd_id, callback) {
        knex.from('quanly_hoadons').whereIn('qlhd_id', qlhd_id).del().then(res => {
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

}
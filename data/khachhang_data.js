var knex = require('./common/DB')

module.exports = {
    getKhachhang: (callback) => {
        knex.raw("select *, khs.iddv as dm_dv_id, khs.tendv as tendonvi, dibtinh.idtinh as dm_db_id_tinh ,dibtinh.tentinh as tentinh , dibhuyen.idhuyen as dm_db_id_huyen ,dibhuyen.tenhuyen as tenhuyen , dibxa.idxa as dm_db_id_xa ,dibxa.tenxa as tenxa from khachhangs kh left join(select dbs.dm_db_id idtinh, dbs.dm_db_ten as tentinh from diabans dbs) as dibtinh on dibtinh.idtinh = kh.dm_db_id_tinh left join(select dbs.dm_db_id idhuyen, dbs.dm_db_ten as tenhuyen from diabans dbs) as dibhuyen on dibhuyen.idhuyen = kh.dm_db_id_huyen left join(select dbs.dm_db_id idxa, dbs.dm_db_ten as tenxa from diabans dbs) as dibxa on dibxa.idxa = kh.dm_db_id_xa left join (select dvs.dm_dv_id iddv, dvs.dm_dv_ten tendv from donvis dvs) as khs on khs.iddv = kh.dm_dv_id " )
        .then((res) => {
            var khachhangs = res.rows
            knex('khachhangs').count()
            .then((resCount) => {
                callback({
                    success: true,
                    data: {
                        khachhangs: khachhangs,
                        count: resCount[0].count
                    }
                })
            })
            .catch((err) => {
                console.log(err),
                callback({
                    success: false
                })
            })
        })
        .catch((err) => {
            console.log(err),
            callback({
                success: false
            })
        })
    },

    insertKhachhang: function (khachhangs, callback) {
        
        knex.from('khachhangs').insert(khachhangs).then(res => {
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
    search: function (limit, offset, timkiem, callback) {
        let qr = ""
        if (timkiem.length > 0) {
            for (i = 0; i < timkiem.length; i++) {
                let a = timkiem[i]
                if (!a.values) {
                    a.values = ''
                }
                qr = qr + "upper(cast(khachhangs." + a.keys + " as text)) like upper('%" + a.values + "%') and "
            }
            let queryy = qr.slice(0, qr.length - 5)
            let query = "select * from khachhangs where " + queryy + ""
            knex.raw(query)
                .then(res => {
                    knex.raw("select count(*) from khachhangs where " + queryy + "")
                        .then(resCount => {
                            callback({
                                success: true,
                                data: {
                                    khachhangs: res.rows,
                                    count: resCount.rows[0].count
                                }
                            })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            this.getKhachhang(limit, offset, callback);
        }

    },
}
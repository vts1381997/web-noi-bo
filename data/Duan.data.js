var knex = require('./common/DB')

module.exports = {
    getDuan: (limit, offset, callback) => {
        knex.raw("select  da.*, nhs.ns_hovaten,nhs.ns_id from duans da left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten, ns.ns_id as ns_id from nhansu ns) as nhs on nhs.ns_id = da.ns_id_qtda" + ' offset ' + offset + ' limit ' + limit)
            .then((res) => {
                var duans = res
                knex('duans').count()
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                duans: res.rows,
                                count: resCount[0].count
                            }
                        })
                    }).catch((err) => {
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

    deleteDuanbyId: function (dm_duan_id, callback) {
        knex.from('duans').whereIn('dm_duan_id', dm_duan_id).del().then(res => {
            callback({ success: true });
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },

    insertDuan: function (duan, callback) {
        knex.from('duans').insert(duan).then(res => {
            callback({ success: true });
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },

    updateDuan: function (duan, callback) {
        knex.from('duans').where('dm_duan_id', duan.dm_duan_id)
            .update(duan).then(res => {
                callback({ success: true })
            }).catch(err => {
                console.log(err)
                callback({ success: false })
            })
    },

    selectDuan: function (duan, callback) {
        knex.from('duans').select('*').where('dm_duan_id', duan.dm_duan_id).then(res => {
            callback(res[0]);
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },

    getQTDA: function (callback) {
        knex('nhansu').select('ns_id', knex.raw("coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '')  || ' ' || coalesce (ns_ten, '') as ns_ten")).then(res => {
            callback(res);
        }).catch((err) => {
            console.log(err)
        })
    },

    getUserLogin: function (username, callback) {
        knex.from('users').select('password').where('name', '=', username).then(res => {
            callback(res[0]);
        }).catch(err => {
            console.log(err)
        })
    },

    getcha: function (callback) {
        knex('nhansu').select('ns_id', knex.raw("coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten")).then(res => {
            callback(res);
        }).catch((err) => {
            console.log(err)
        })
    },

    search: function (limit, offset, timkiem, callback) {
        var qr = ""
        if (timkiem.length > 0) {
            for (i = 0; i < timkiem.length; i++) {
                let a = timkiem[i]
                if (!a.values) {
                    a.values = ''
                }
                qr = qr + "upper(cast(da." + a.keys + " as text)) like upper('%" + a.values + "%') and "
            }
            var queryy = qr.slice(0, qr.length - 5)
            var query = "select * from (select  da.*, nhs.ns_hovaten,nhs.ns_id from duans da left join \
                (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' \
                 || coalesce (ns_ten, '') as ns_hovaten, ns.ns_id as ns_id from nhansu \
                 ns) as nhs on nhs.ns_id = da.ns_id_qtda)as da where " + queryy + " "
            knex.raw(query)
                .then(res => {
                    knex.raw("select count(*) from (select  da.*, nhs.ns_hovaten,nhs.ns_id from duans da left join \
                        (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' \
                         || coalesce (ns_ten, '') as ns_hovaten, ns.ns_id as ns_id from nhansu \
                         ns) as nhs on nhs.ns_id = da.ns_id_qtda)as da where " + queryy + "")
                        .then(resCount => {
                            callback({
                                success: true,
                                data: {
                                    duans: res.rows,
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
            this.getDuan(limit, offset, callback);
        }
    },
};


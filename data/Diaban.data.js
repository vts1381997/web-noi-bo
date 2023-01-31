var knex = require('./common/DB')

module.exports = {
    getDiaban: (limit, offset, callback) => {
        knex.raw("select diaban.dm_db_id,\
        diaban.dm_db_ten,\
        diaban.dm_db_cap,\
        case(diaban.dm_db_cap)\
            when 1 then 'Tỉnh'\
            when 2 then 'Huyện'\
            else 'Xã'\
        end as ten_dm_db_cap,\
        diaban.dm_db_id_cha,\
        diabancha.dm_db_ten tencha\
        from diabans diaban left join diabans diabancha on diaban.dm_db_id_cha = diabancha.dm_db_id limit " + limit + " offset " + offset)
            .then(res => {
                var diabans = res.rows
                knex('diabans').count()
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                diabans: diabans,
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
    deleteDiabanbyId: function (dm_db_id, callback) {
        knex.from('diabans').whereIn('dm_db_id', dm_db_id).del().then(res => {
            callback({ success: true });
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },
    insertDiaban: function (diaban, callback) {
        knex.from('diabans').insert(diaban).then(res => {
            callback({ success: true });
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },
    updateDiaban: function (diaban, callback) {
        knex.from('diabans').where('dm_db_id', diaban.dm_db_id)
            .update(diaban).then(res => {
                callback({ success: true })
            }).catch(err => {
                console.log(err)
                callback({ success: false })
            })
    },
    selectDiaban: function (diaban, callback) {
        knex.from('diabans').select('*').where('dm_db_id', diaban.dm_db_id).then(res => {
            callback(res[0]);
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },
    getcha: function (data, callback) {
        // knex('diabans').select('dm_db_id','dm_db_ten').whereIn('dm_db_cap', Number(data) - 1 ).then(res=>{
        knex('diabans').select('dm_db_id', 'dm_db_ten').whereIn('dm_db_cap', [Number(data) - 1]).then(res => {
            callback(res);
            console.log(res)
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
    search: function (limit, offset, textSearch, columnSearch, index, sortBy, callback) {
        knex('diabans').where(columnSearch, 'like', '%' + textSearch + '%').orderBy(index, sortBy).limit(limit).offset(offset)
            .then(res => {
                var diabans = res
                knex('diabans').where(columnSearch, 'like', '%' + textSearch + '%').count()
                    .then(resCount => {
                        var count = resCount[0].count
                        let dataCallback = {
                            success: true,
                            message: 'Get data success',
                            data: {
                                diabans: diabans,
                                count: count
                            }
                        }
                        callback(dataCallback)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    },
};

var knex = require('./common/DB')
const uuidv4 = require('uuid/v4');
module.exports = {
    getHalf: (limit, offset, callback) => {
        knex.raw("select * from chamcongs where status = '0' " + ' offset ' + offset + ' limit ' + limit)
            .then(res => {
                knex.raw("select count(*) from chamcongs where status = '0' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                choPheDuyet: res.rows,
                                count: resCount.rows[0].count
                            }
                        })
                    }).catch((err) => {
                        callback({
                            success: false
                        })
                    })
            })
            .catch((err) => {
                callback({
                    success: false
                })
            })
    },
    getHalf1: (limit, offset, callback) => {
        knex.raw("select * from chamcongs where status = '1' order by ngaychamcong DESC" + ' offset ' + offset + ' limit ' + limit)
            .then(res => {
                knex.raw("select count(*) from chamcongs where status = '1' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                daPheDuyet: res.rows,
                                count: resCount.rows[0].count
                            }
                        })
                    }).catch((err) => {
                        callback({
                            success: false
                        })
                    })
            })
            .catch((err) => {
                callback({
                    success: false
                })
            })
    },
    getHalf2: (limit, offset, callback) => {
        knex.raw("select * from chamcongs where status = '2' order by ngaychamcong DESC" + ' offset ' + offset + ' limit ' + limit)
            .then(res => {
                knex.raw("select count(*) from chamcongs where status = '2' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                khongPheDuyet: res.rows,
                                count: resCount.rows[0].count
                            }
                        })
                    }).catch((err) => {
                        callback({
                            success: false
                        })
                    })
            })
            .catch((err) => {
                callback({
                    success: false
                })
            })
    },
    insertChamCong: function (hopdong, callback) {
        knex.raw("insert into chamcongs(chamcongid, ngaychamcong, loaichamcong, ghichu, giochamcong, ten, status) values ( '" + uuidv4() + "' , '" + hopdong.ngaychamcong + "' , '" + hopdong.loaichamcong + "' , '" + hopdong.ghichu + "' , '" + hopdong.giochamcong + "' , '" + hopdong.ten + "' , '0')").then(res => {
            callback({ success: true });
        }).catch(err => {
            console.log(err);
            callback({ success: false })
        })
    },
    updateHalf: function (hopdong, callback) {
        knex.raw("update chamcongs set status = '1' where chamcongid='" + hopdong.chamcongid + "'").then(res => {
            callback({ success: true })
        }).catch(err => {
            callback({ success: false })
        })
    },
    updateHalf1: function (hopdong, callback) {
        knex.raw("update chamcongs set status = '2', lydo = '" + hopdong.lydo + "' where chamcongid='" + hopdong.chamcongid + "'").then(res => {
            callback({ success: true })
        }).catch(err => {
            callback({ success: false })
        })
    },
};

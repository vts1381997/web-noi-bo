var knex = require('./common/DB')
const uuidv4 = require('uuid/v4');
module.exports = {
    getHalf: (limit, offset, callback) => {
        knex.raw("select * from half where person = 'nhuan' and status = '0' " + ' offset ' + offset + ' limit ' + limit)
            .then(res => {
                knex.raw("select count(*) from half where person = 'nhuan' and status = '0' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                half: res.rows,
                                count: resCount.rows[0].count
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
    getHalf1: (limit, offset, callback) => {
        knex.raw("select * from half where person = 'phe' and status = '0' " + ' offset ' + offset + ' limit ' + limit)
            .then(res => {
                knex.raw("select count(*) from half where person = 'phe' and status = '0' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                half: res.rows,
                                count: resCount.rows[0].count
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
    getHalf2: (limit, offset, callback) => {
        knex.raw("select * from half where person = 'hoai' and status = '0' " + ' offset ' + offset + ' limit ' + limit)
            .then(res => {
                knex.raw("select count(*) from half where person = 'hoai' and status = '0' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                half: res.rows,
                                count: resCount.rows[0].count
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
    getHalf3: (limit, offset, callback) => {
        knex.raw("select * from half where person = 'hoa' and status = '0' " + ' offset ' + offset + ' limit ' + limit)
            .then(res => {
                knex.raw("select count(*) from half where person = 'nhuan' and status = '0' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                half: res.rows,
                                count: resCount.rows[0].count
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
    getHalfAccept: (limit, offset, callback) => {
        knex.raw("select * from half where person = 'nhuan' and status = '1' " + ' offset ' + offset + ' limit ' + limit)
            .then(res => {
                knex.raw("select count(*) from half where person = 'nhuan' and status = '1' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                half: res.rows,
                                count: resCount.rows[0].count
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
    getHalfAccept1: (limit, offset, callback) => {
        knex.raw("select * from half where person = 'phe' and status = '1' " + ' offset ' + offset + ' limit ' + limit)
            .then(res => {
                knex.raw("select count(*) from half where person = 'phe' and status = '1' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                half: res.rows,
                                count: resCount.rows[0].count
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
    getHalfAccept2: (limit, offset, callback) => {
        knex.raw("select * from half where person = 'hoai' and status = '1' " + ' offset ' + offset + ' limit ' + limit)
            .then(res => {
                knex.raw("select count(*) from half where person = 'hoai' and status = '1' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                half: res.rows,
                                count: resCount.rows[0].count
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
    getHalfAccept3: (limit, offset, callback) => {
        knex.raw("select * from half where person = 'hoa' and status = '1' " + ' offset ' + offset + ' limit ' + limit)
            .then(res => {
                knex.raw("select count(*) from half where person = 'hoa' and status = '1' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                half: res.rows,
                                count: resCount.rows[0].count
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
    getHalfRefuse: (limit, offset, callback) => {
        knex.raw("select * from half where person = 'nhuan' and status = '2' " + ' offset ' + offset + ' limit ' + limit)
            .then(res => {
                knex.raw("select count(*) from half where person = 'nhuan' and status = '2' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                half: res.rows,
                                count: resCount.rows[0].count
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
    getHalfRefuse1: (limit, offset, callback) => {
        knex.raw("select * from half where person = 'phe' and status = '2' " + ' offset ' + offset + ' limit ' + limit)
            .then(res => {
                knex.raw("select count(*) from half where person = 'phe' and status = '2' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                half: res.rows,
                                count: resCount.rows[0].count
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
    getHalfRefuse2: (limit, offset, callback) => {
        knex.raw("select * from half where person = 'hoai' and status = '2' " + ' offset ' + offset + ' limit ' + limit)
            .then(res => {
                knex.raw("select count(*) from half where person = 'hoai' and status = '2' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                half: res.rows,
                                count: resCount.rows[0].count
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
    getHalfRefuse3: (limit, offset, callback) => {
        knex.raw("select * from half where person = 'hoa' and status = '2' " + ' offset ' + offset + ' limit ' + limit)
            .then(res => {
                knex.raw("select count(*) from half where person = 'hoa' and status = '2' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                half: res.rows,
                                count: resCount.rows[0].count
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
    insertHalf: function (hopdong, callback) {
        knex.raw("insert into half(name, registration_time, day_start, day_end, reason, person, id, status) values ( '" + hopdong.nguoiDangKy + "' , '" + hopdong.thoiGianDangKy + "' , '" + hopdong.ngayBatDau + "' , '" + hopdong.ngayKetThuc + "' , '" + hopdong.lyDo + "' , '" + hopdong.dangKy + "' , '" + uuidv4() + "' , '0')").then(res => {
            callback({ success: true });
        }).catch(err => {
            console.log(err);
            callback({ success: false })
        })
    },
    insertHalf1: function (hopdong, callback) {
        knex.from('half').insert(hopdong).then(res => {
            callback({ success: true });
        }).catch(err => {
            console.log(err);
            callback({ success: false })
        })
    },
    insertHalf2: function (hopdong, callback) {
        knex.from('half').insert(hopdong).then(res => {
            callback({ success: true });
        }).catch(err => {
            console.log(err);
            callback({ success: false })
        })
    },
    insertHalf3: function (hopdong, callback) {
        knex.from('half').insert(hopdong).then(res => {
            callback({ success: true });
        }).catch(err => {
            console.log(err);
            callback({ success: false })
        })
    },
    updateHalf: function (hopdong, callback) {
        knex.raw("update half set status = '1' where id='" + hopdong.id + "'").then(res => {
            callback({ success: true })
        }).catch(err => {
            console.log(err);
            callback({ success: false })
        })
    },
    updateHalf1: function (hopdong, callback) {
        knex.raw("update half set status = '1' where id='" + hopdong.id + "'").then(res => {
            callback({ success: true })
        }).catch(err => {
            console.log(err);
            callback({ success: false })
        })
    },
    updateHalf2: function (hopdong, callback) {
        knex.raw("update half set status = '1' where id='" + hopdong.id + "'").then(res => {
            callback({ success: true })
        }).catch(err => {
            console.log(err);
            callback({ success: false })
        })
    },
    updateHalf3: function (hopdong, callback) {
        knex.raw("update half set status = '1' where id='" + hopdong.id + "'").then(res => {
            callback({ success: true })
        }).catch(err => {
            console.log(err);
            callback({ success: false })
        })
    },
    updateHalf4: function (hopdong, callback) {
        knex.raw("update half set status = '2' where id='" + hopdong.id + "'").then(res => {
            callback({ success: true })
        }).catch(err => {
            console.log(err);
            callback({ success: false })
        })
    },
    updateHalf5: function (hopdong, callback) {
        knex.raw("update half set status = '2' where id='" + hopdong.id + "'").then(res => {
            callback({ success: true })
        }).catch(err => {
            console.log(err);
            callback({ success: false })
        })
    },
    updateHalf6: function (hopdong, callback) {
        knex.raw("update half set status = '2' where id='" + hopdong.id + "'").then(res => {
            callback({ success: true })
        }).catch(err => {
            console.log(err);
            callback({ success: false })
        })
    },
    updateHalf7: function (hopdong, callback) {
        knex.raw("update half set status = '2' where id='" + hopdong.id + "'").then(res => {
            callback({ success: true })
        }).catch(err => {
            console.log(err);
            callback({ success: false })
        })
    },
};

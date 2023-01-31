var knex = require('./common/DB')
module.exports = {
    getNotification: (limit, offset, name, callback) => {
        knex.raw("select * from several where name = '"+name+"' and status = '1' "+ ' offset ' + offset + ' limit ' + limit)
            .then(res => {    
                knex.raw("select count(*) from several where name = '"+name+"' and status = '1' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                notification: res.rows,
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
    getNotifications: (limit, offset, name, callback) => {
        knex.raw("select * from several where name = '"+name+"' and status = '2' "+ ' offset ' + offset + ' limit ' + limit)
            .then(res => {    
                knex.raw("select count(*) from several where name = '"+name+"' and status = '2' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                notification: res.rows,
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
    getNotificationss: (limit, offset, name, callback) => {
        knex.raw("select * from half where name = '"+name+"' and status = '1' "+ ' offset ' + offset + ' limit ' + limit)
            .then(res => {    
                knex.raw("select count(*) from half where name = '"+name+"' and status = '1' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                notification: res.rows,
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
    getNotificationsss: (limit, offset, name, callback) => {
        knex.raw("select * from half where name = '"+name+"' and status = '2' "+ ' offset ' + offset + ' limit ' + limit)
            .then(res => {    
                knex.raw("select count(*) from half where name = '"+name+"' and status = '2' ")
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                notification: res.rows,
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
};

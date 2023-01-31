var knex = require('./common/DB')
module.exports = {
    getMenu: (limit, offset, index, sortBy, callback) => {
        knex.select('*').from('dm_menus').orderBy(index, sortBy).limit(limit).offset(offset)
            .then((res) => {
                knex('dm_menus').count()
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                menus: res,
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

    insertMenu: function (menus, callback) {
        knex.from('dm_menus').insert(menus).then(res => {
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

    updateMenu: function (menus, callback) {
        knex.from('dm_menus').where('dm_menu_id', menus.dm_menu_id).update(menus).then(res => {
            callback({
                success: true,
                menus: menus
            })
        }).catch(err => {
            console.log(err)
            callback({
                success: false
            })
        })
    },

    deleteMenu: function (dm_menu_id, callback) {
        knex.from('dm_menus').whereIn('dm_menu_id', dm_menu_id).del().then(res => {
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
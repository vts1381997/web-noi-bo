var knex = require('./common/DB')

module.exports = {
    getBinhluan: (ht_id, callback) => {
        knex.raw("select bl_id, bl_author as author, bl_avatar as avatar, bl_content as content, bl_datetime as datetime, bl_ht_id from binhluans where bl_ht_id='"+ht_id.ht_id+"'")
            .then((res) => {
                        callback({
                            success: true,
                            data: {
                                binhluan: res.rows,
                            }
                        })
            }).catch((err) => {
                console.log(err),
                    callback({
                        success: false
                    })
            })
    },

    insertBinhluan: function (binhluan, callback) {
        knex.from('binhluans').insert(binhluan).then(res => {
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
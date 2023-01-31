var knex = require('../common/DB')
module.exports = {
    CheckRole: function (username, callback) {
        knex('users').select('code').where('name', username).then((res) => {
            let code = res[0]
            knex('pq_role_action').select('action_code').where('code', code.code).then((res1) => {
                callback(res1[0]);

            })
        })
            .catch(err => {
                if (err) {
                    console.log(err)
                }
            })
    }
}
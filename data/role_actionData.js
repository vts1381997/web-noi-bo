var knex = require('./common/DB')
let pool = require('./connect')
const uuidv1 = require('uuid/v1');
module.exports = {
    getRole: (limit, offset, index, sortBy, callback) => {
        pool.connect().then(client => {
            client.query("select pq_role_action.id, pq_roles.name as role ,pq_actions.name as action from pq_role_action inner join pq_roles on pq_roles.id = pq_role_action.role_code inner join pq_actions on pq_actions.id = pq_role_action.action_code order by pq_role_action." + index + " " + sortBy + " limit " + limit + " offset " + offset + " ")
                .then(res => {
                    let roles = res.rows
                    client.query("select count(*) from pq_role_action").then(res1 => {
                        client.release()
                        let data = {
                            roles: roles,
                            success: true,
                            count: res1.rows[0].count
                        }

                        callback(data)
                    })
                })
            
        }).catch(err => {
            client.release()
            console.log(err),
                callback({
                    success: false
                })
        })
    },
    deleteRole: function (Id, callback) {
        pool.connect().then(client => {
            let query = "delete from pq_role_action where id='" + Id + "'"
            client.query(query).then(res => {
                client.release()
                callback({ success: true, message: 'xoa' });
            })
        }).catch(err => {
            client.release()
            console.log(err)
            callback({ success: false })
        })

    },
    insertRoleAction: function (roles, callback) {
        let id = uuidv1()
        pool.connect().then(client => {
            client.query("insert into pq_role_action values((select id from pq_roles where name='" + roles.role + "'),(select id from pq_actions where name='" + roles.action + "'),'" + id + "')").then(res => {
                client.release()
                callback({ success: true, message: 'insert thanh cong' })
            })
        }).catch(err => {
            client.release()
            console.log(err)
        })


    },
    updateRoleAction: function (user, callback) {
        pool.connect().then(client => {
            client.query("update pq_role_action set action_code =(select id from pq_actions where name = '" + user.action + "'), role_code = (select id from pq_roles where name = '" + user.role + "') where id='" + user.id + "'").then(res => {
                client.release()
                callback({ success: true, message: 'update thanh cong' })
            })

        }).then(err=>{
            client.release()
            console.log(err)
        })
    },


    search: function (limit, offset, textSearch, columnSearch, index, sortBy, callback) {
        pool.connect()
            .then(client => {
                query = "SELECT * FROM users WHERE " + columnSearch + " LIKE '%" + textSearch + "%'  ORDER BY " + index + " " + sortBy + " LIMIT " + limit + " OFFSET " + offset
                return client.query(query)
                    .then(res => {
                        let users = res.rows;
                        client.query("SELECT count(*) as count FROM users WHERE " + columnSearch + " LIKE '%" + textSearch + "%'  ").then(res2 => {
                            client.release();
                            let count = res2.rows[0].count;
                            //callback to controller:
                            let dataCallback = {
                                success: true,
                                message: 'Get data success',
                                data: {
                                    users: users,
                                    count: count
                                }
                            };
                            callback(dataCallback)
                        })
                    })
                    .catch(e => {
                        client.release()
                        console.log(e.stack)
                    })
            })
    },
    getRoleCode: function (callback) {
        pool.connect().then(client => {
            client.query("select * from pq_roles").then(res => {
                client.release()
                callback({ success: true, data: res.rows })
            })
        }).catch(err => {
            client.release()
            console.log(err)
        })
    },
    getRoleAction: function (callback) {
        pool.connect().then(client => {
            client.query("select * from pq_actions").then(res => {
                client.release()
                callback({ success: true, data: res.rows })
            })
        }).catch(err => {
            client.release()
            console.log(err)
        })
    },
    insertRole: function (name, des, callback) {
        let id = uuidv1();
        pool.connect().then(client => {
            client.query("insert into pq_roles values('" + name + "','" + des + "','" + id + "')").then(res => {
                client.release()
                callback({ success: true, message: 'insert thanh cong' })
            })
        }).catch(err => {
            client.release()
            console.log(err)
        })
    },
    insertAction: function (name, callback) {
        let id = uuidv1();
        pool.connect().then(client => {
            client.query("insert into pq_actions values('" + name + "','" + id + "')").then(res => {
                client.release()
                callback({ success: true, message: 'insert thanh cong' })
            })
        }).catch(err => {
            client.release()
            console.log(err)
        })
    },
    uniqueRole: function (roles, callback) {
        pool.connect().then(client => {
            client.query("select * from pq_role_action where role_code=(select id from pq_roles where name='" + roles.role + "') and action_code=(select id from pq_actions where name='" + roles.action + "')").then(res => {
                client.release()
                callback(res.rows)
            })
        }).catch(err => {
            client.release()
            console.log(err)
        })
    }
};

var knex = require('./common/DB')
let pool = require('./connect')
const uuidv1 = require('uuid/v1');
module.exports = {
    getUser: (limit, offset, gr, callback) => {
        pool.connect().then(client => {
            client.query("select * from users left join pq_group_user on pq_group_user.user_code = users.name where pq_group_user.group_code = '" + gr + "' limit " + limit + " offset " + offset).then(res => {
                let users = res.rows
                client.query("select count(*) from users left join pq_group_user on pq_group_user.user_code = users.name where pq_group_user.group_code = '" + gr + "' limit " + limit + " offset " + offset).then(res1 => {
                    client.release()
                    callback({
                        success: true,
                        data: {
                            users: users,
                            count: res1.rows[0].count
                        }
                    })
                }).catch(err => {
                    client.release()
                    console.log(err)
                })

            })
        }).catch(err => {
            client.release()
            console.log(err)
        })
    },
    getList: function (limit, offset, groupName, callback) {
        pool.connect().then(client => {
            client.query("select name from users where name not in (select user_code from pq_group_user where group_code='" + groupName + "') ").then(res => {
                client.release()
                callback(res.rows)
            }).catch(err => {
                client.release()
                console.log(err)
            })

        }).catch(err => {
            client.release()
            console.log(err)
        })
    },
    deleteUser: function (listmem, groupName, callback) {
        pool.connect().then(client => {
            for (i = 0; i < listmem.length; i++) {
                let memb = listmem[i]
                let query = "delete from pq_group_user where group_code = '" + groupName + "' and user_code='" + memb + "'"
                client.query(query).then(res => {
                    let querya = "delete from pq_role_user_group where group_code = '" + groupName + "' and group_user_code='" + memb + "' "
                    client.query(querya).then(res1 => {
                    })
                }).catch(err => {
                    console.log(err)
                })
            }
            client.release()
            callback({ success: true })
        }).catch(err => {
            console.log(err)
            client.release()
            callback({ success: false })
        })
    },
    addUser: function (user, groupName,gr, callback) {
        pool.connect().then(client => {
            for (i = 0; i < user.length; i++) {
                let id = uuidv1();
                let userN = user[i]
                let query = "insert into pq_group_user values('" + groupName + "','" + user[i] + "','" + id + "')"
                client.query(query).then(res => {
                    for(j=0;j<gr.length;j++){
                        let role = gr[j].split('.')[0]
                        let action = gr[j].split('.')[1]
                        client.query("select * from pq_role_action where role_code = (select id from pq_roles where name ='" + role + "' ) and action_code = (select id from pq_actions where name = '" + action + "')").then(res1=>{
                            let idra = res1.rows[0].id
                            let idgr = uuidv1();
                            let query1 = "insert into pq_role_user_group(role_action_code,id,group_code,group_user_code) values('" + idra + "','" + idgr + "','" + groupName + "','" +userN+ "')"
                            client.query(query1)
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
            client.release()
            callback({ success: true, message: 'thêm mới thành công' })
        }).catch(err => {

            callback({ success: false })
        })
    },







};

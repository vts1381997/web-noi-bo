var knex = require("./common/DB");
let pool = require("./connect");
const uuidv1 = require("uuid/v1");
module.exports = {
  getUser: (limit, offset, index, sortBy, callback) => {
    knex
      .from("users")
      .select("*")
      .whereNot("status", "0")
      .orderBy(index, sortBy)
      .limit(limit)
      .offset(offset)
      .then((res) => {
        knex("users")
          .whereNot("status", "0")
          .count()
          .then((resCount) => {
            callback({
              success: true,
              data: {
                users: res,
                count: resCount[0].count,
              },
            });
          })
          .catch((err) => {
            console.log(err),
              callback({
                success: false,
              });
          });
      })
      .catch((err) => {
        console.log(err),
          callback({
            success: false,
          });
      });
  },
  deleteUserbyId: function (Id, callback) {
    pool.connect().then((client) => {
      client
        .query(
          "delete from pq_role_user_group where group_user_code ='" + Id + "'"
        )
        .then((res) => {
          client
            .query("delete from pq_group_user where user_code = '" + Id + "'")
            .then((res1) => {
              client
                .query("delete from users where name ='" + Id + "' ")
                .then((res2) => {
                  client.release();
                  callback({ success: true });
                })
                .catch((err) => {
                  client.release();
                  callback({ success: false });
                });
            })
            .catch((err) => {
              client.release();
              callback({ success: false });
            });
        })
        .catch((err) => {
          client.release();
          callback({ success: false });
        });
    });
  },
  insertUser: function (user, callback) {
    let abc = user;
    abc.id = uuidv1();
    knex
      .from("users")
      .insert(abc)
      .then((res) => {
        callback({ success: true });
      })
      .catch((err) => {
        console.log(err);
        callback({ success: false });
      });
  },
  updateUser: function (user, callback) {
    knex
      .from("users")
      .where("id", user.id)
      .update(user)
      .then((res) => {
        callback({ success: true });
      })
      .catch((err) => {
        console.log(err);
        callback({ success: false });
      });
  },
  changePass: function (user, callback) {
    pool.connect().then((client) => {
      let query =
        "update users set password='" +
        user.password +
        "' where name='" +
        user.username +
        "'";
      client
        .query(query)
        .then((res) => {
          client.release();
          callback({ success: true });
        })
        .catch((err) => {
          client.release();
          console.log(err);
          callback({ success: false });
        });
    });
  },
  changeProfile: function (user, callback) {},
  selectUser: function (user, callback) {
    knex
      .from("users")
      .select("*")
      .where("id", user.id)
      .then((res) => {
        callback(res[0]);
      })
      .catch((err) => {
        console.log(err);
        callback({ success: false });
      });
  },
  getUserLogin: function (username, callback) {
    knex("users")
      .select("password", "fullname", "madinhdanh")
      .where("name", username)
      .then((res) => {
        callback(res[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  search: function (
    limit,
    offset,
    textSearch,
    columnSearch,
    index,
    sortBy,
    callback
  ) {
    knex("users")
      .where(columnSearch, "like", "%" + textSearch + "%")
      .whereNot("status", "0")
      .orderBy(index, sortBy)
      .limit(limit)
      .offset(offset)
      .then((res) => {
        var users = res;
        knex("users")
          .whereNot("status", "0")
          .where(columnSearch, "like", "%" + textSearch + "%")
          .count()
          .then((resCount) => {
            var count = resCount[0].count;
            let dataCallback = {
              success: true,
              message: "Get data success",
              data: {
                users: users,
                count: count,
              },
            };
            callback(dataCallback);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getClaims: function (username, callback) {
    pool
      .connect()
      .then((client) => {
        query =
          "select pq_roles.name as role,pq_actions.name as action from pq_role_user_group left join users on users.name = pq_role_user_group.group_user_code left join pq_role_action on pq_role_action.id = pq_role_user_group.role_action_code left join pq_roles on pq_roles.id = pq_role_action.role_code left join pq_actions on pq_actions.id = pq_role_action.action_code where users.name ='" +
          username +
          "'";
        return client
          .query(query)
          .then((res) => {
            let data = res.rows;
            client.release();
            callback({
              success: true,
              data: data,
            });
          })
          .catch((err) => {
            client.release();
            callback({
              success: false,
            });
          });
      })
      .catch((e) => {
        client.release();
        console.log(e.stack);
      });
  },
  updateRole: function (per, callback) {
    callback({ message: "dcm" });
    pool
      .connect()
      .then((client) => {
        client
          .query(
            "delete from pq_role_user_group where group_user_code ='" +
              per.user +
              "'"
          )
          .then((res1) => {
            per.a.map(function (value) {
              let role = value.split(".")[0];
              let action = value.split(".")[1];
              if (role && action) {
                let id_role_action = uuidv1();
                client
                  .query(
                    "select * from pq_role_action where role_code = (select id from pq_roles where name ='" +
                      role +
                      "' ) and action_code = (select id from pq_actions where name = '" +
                      action +
                      "')"
                  )
                  .then((res1) => {
                    if (res1.rows.length > 0) {
                      let idra = res1.rows[0].id;
                      let idgr = uuidv1();
                      client
                        .query(
                          "insert into pq_role_user_group values('" +
                            per.user +
                            "','" +
                            idra +
                            "','" +
                            idgr +
                            "')"
                        )
                        .then((res2) => {});
                    } else {
                      client
                        .query(
                          "insert into pq_role_action values((select id from pq_roles where name ='" +
                            role +
                            "' ),(select id from pq_actions where name = '" +
                            action +
                            "'),'" +
                            id_role_action +
                            "')"
                        )
                        .then((res) => {
                          client
                            .query(
                              "select * from pq_role_action where role_code = (select id from pq_roles where name ='" +
                                role +
                                "' ) and action_code = (select id from pq_actions where name = '" +
                                action +
                                "')"
                            )
                            .then((response) => {
                              let idra = response.rows[0].id;
                              let idgr = uuidv1();
                              client
                                .query(
                                  "insert into pq_role_user_group values('" +
                                    per.user +
                                    "','" +
                                    idra +
                                    "','" +
                                    idgr +
                                    "')"
                                )
                                .then((res2) => {});
                            });
                        });
                    }
                  });
              }
            });
            client.release();
          });
      })
      .catch((err) => {
        client.release();
        console.log(err);
      });
  },
};

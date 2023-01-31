var knex = require("./common/DB");
const uuidv4 = require("uuid/v4");
module.exports = {
  getchopheduyet: (limit, offset, name, callback) => {
    knex
      .raw(
        "select users.fullname, several.*\
        from several\
        left join users on users.name = several.name where several.status = '0' and several.name = '" +
          name +
          "' offset " +
          offset +
          " limit " +
          limit
      )
      .then((res) => {
        knex
          .raw(
            "select count(*) from several where status = '0' and name = '" +
              name +
              "'"
          )
          .then((resCount) => {
            callback({
              success: true,
              data: {
                several: res.rows,
                count: resCount.rows[0].count,
              },
            });
          })
          .catch((err) => {
            callback({
              success: false,
            });
          });
      })
      .catch((err) => {
        callback({
          success: false,
        });
      });
  },
  getdapheduyet: (limit, offset, name, callback) => {
    knex
      .raw(
        "select s.*, u.fullname, us.fullname as nguoiduyet\
        from several s\
        left join users u on u.name = s.name\
        left join users us on us.name = s.who where s.name = '" +
          name +
          "' and s.status = '1' order by day_end DESC" +
          " offset " +
          offset +
          " limit " +
          limit
      )
      .then((res) => {
        knex
          .raw(
            "select count(*) from several where status = '1' and name = '" +
              name +
              "'"
          )
          .then((resCount) => {
            callback({
              success: true,
              data: {
                several: res.rows,
                count: resCount.rows[0].count,
              },
            });
          })
          .catch((err) => {
            callback({
              success: false,
            });
          });
      })
      .catch((err) => {
        callback({
          success: false,
        });
      });
  },
  getkhongpheduyet: (limit, offset, name, callback) => {
    knex
      .raw(
        "select s.*, u.fullname, us.fullname as nguoiduyet\
        from several s\
        left join users u on u.name = s.name\
        left join users us on us.name = s.who where s.name = '" +
          name +
          "' and s.status = '2' order by day_end DESC" +
          " offset " +
          offset +
          " limit " +
          limit
      )
      .then((res) => {
        knex
          .raw(
            "select count(*) from several where status = '2' and name = '" +
              name +
              "'"
          )
          .then((resCount) => {
            callback({
              success: true,
              data: {
                several: res.rows,
                count: resCount.rows[0].count,
              },
            });
          })
          .catch((err) => {
            callback({
              success: false,
            });
          });
      })
      .catch((err) => {
        callback({
          success: false,
        });
      });
  },
  getHopdong: (limit, offset, callback) => {
    knex
      .raw(
        "select users.fullname, several.*\
        from several\
        left join users on users.name = several.name where several.status = '0' " +
          " offset " +
          offset +
          " limit " +
          limit
      )
      .then((res) => {
        knex
          .raw("select count(*) from several where status = '0' ")
          .then((resCount) => {
            callback({
              success: true,
              data: {
                several: res.rows,
                count: resCount.rows[0].count,
              },
            });
          })
          .catch((err) => {
            callback({
              success: false,
            });
          });
      })
      .catch((err) => {
        callback({
          success: false,
        });
      });
  },
  getHopdong1: (limit, offset, callback) => {
    let query =
      "select users.fullname, several.*\
        from several\
        left join users on users.name = several.name where status = '0' " +
      " offset " +
      offset +
      " limit " +
      limit;
    knex
      .raw(query)
      .then((res) => {
        knex
          .raw("select count(*) from several where status = '0' ")
          .then((resCount) => {
            callback({
              success: true,
              data: {
                several: res.rows,
                count: resCount.rows[0].count,
              },
            });
          })
          .catch((err) => {
            callback({
              success: false,
            });
          });
      })
      .catch((err) => {
        callback({
          success: false,
        });
      });
  },
  getHopdong2: (limit, offset, callback) => {
    knex
      .raw(
        "select * from several where who = 'hoai' and status = '0' " +
          " offset " +
          offset +
          " limit " +
          limit
      )
      .then((res) => {
        knex
          .raw(
            "select count(*) from several where who = 'hoai' and status = '0' "
          )
          .then((resCount) => {
            callback({
              success: true,
              data: {
                several: res.rows,
                count: resCount.rows[0].count,
              },
            });
          })
          .catch((err) => {
            callback({
              success: false,
            });
          });
      })
      .catch((err) => {
        callback({
          success: false,
        });
      });
  },
  getHopdong3: (limit, offset, callback) => {
    knex
      .raw(
        "select * from several where who = 'hoa' and status = '0' " +
          " offset " +
          offset +
          " limit " +
          limit
      )
      .then((res) => {
        knex
          .raw(
            "select count(*) from several where who = 'hoa' and status = '0' "
          )
          .then((resCount) => {
            callback({
              success: true,
              data: {
                several: res.rows,
                count: resCount.rows[0].count,
              },
            });
          })
          .catch((err) => {
            callback({
              success: false,
            });
          });
      })
      .catch((err) => {
        callback({
          success: false,
        });
      });
  },
  getSearch: (limit, offset, ten, loai, tungay, denngay, callback) => {
    var dkTen = ten == "" ? " and 1 = 1 " : " and s.name = '" + ten + "' ";
    var dkLoai = loai == "" ? " and 1 = 1 " : " and s.loaidk = '" + loai + "' ";
    var dkTuNgay =
      tungay == ""
        ? " and 1 = 1 "
        : " and to_date(day_end, 'yyyy-MM-dd') >= to_date('" +
          tungay +
          "', 'dd/MM/yyyy') ";
    var dkDenNgay =
      denngay == ""
        ? " and 1 = 1 "
        : " and to_date(day_end, 'yyyy-MM-dd') <= to_date('" +
          denngay +
          "', 'dd/MM/yyyy') ";
    knex
      .raw(
        "select s.*, u.fullname, us.fullname as nguoiduyet\
      from several s\
      left join users u on u.name = s.name\
      left join users us on us.name = s.who where s.status = '1' " +
          dkTen +
          dkLoai +
          dkTuNgay +
          dkDenNgay +
          " order by day_end DESC" +
          " offset " +
          offset +
          " limit " +
          limit
      )
      .then((res) => {
        knex
          .raw(
            "select count(*) from several s where s.status = '1' " +
              dkTen +
              dkLoai +
              dkTuNgay +
              dkDenNgay
          )
          .then((resCount) => {
            callback({
              success: true,
              data: {
                several: res.rows,
                count: resCount.rows[0].count,
              },
            });
          })
          .catch((err) => {
            callback({
              success: false,
            });
          });
      })
      .catch((err) => {
        callback({
          success: false,
        });
      });
  },
  getHopdongAccept: (limit, offset, callback) => {
    knex
      .raw(
        "select s.*, u.fullname, us.fullname as nguoiduyet\
        from several s\
        left join users u on u.name = s.name\
        left join users us on us.name = s.who where s.status = '1' order by day_end DESC" +
          " offset " +
          offset +
          " limit " +
          limit
      )
      .then((res) => {
        knex
          .raw("select count(*) from several where status = '1' ")
          .then((resCount) => {
            callback({
              success: true,
              data: {
                several: res.rows,
                count: resCount.rows[0].count,
              },
            });
          })
          .catch((err) => {
            callback({
              success: false,
            });
          });
      })
      .catch((err) => {
        callback({
          success: false,
        });
      });
  },
  getHopdongAccept1: (limit, offset, callback) => {
    knex
      .raw(
        "select * from several where who = 'phe' and status = '1' " +
          " offset " +
          offset +
          " limit " +
          limit
      )
      .then((res) => {
        knex
          .raw(
            "select count(*) from several where who = 'phe' and status = '1' "
          )
          .then((resCount) => {
            callback({
              success: true,
              data: {
                several: res.rows,
                count: resCount.rows[0].count,
              },
            });
          })
          .catch((err) => {
            callback({
              success: false,
            });
          });
      })
      .catch((err) => {
        callback({
          success: false,
        });
      });
  },
  getHopdongAccept2: (limit, offset, callback) => {
    knex
      .raw(
        "select * from several where who = 'hoai' and status = '1' " +
          " offset " +
          offset +
          " limit " +
          limit
      )
      .then((res) => {
        knex
          .raw(
            "select count(*) from several where who = 'hoai' and status = '1' "
          )
          .then((resCount) => {
            callback({
              success: true,
              data: {
                several: res.rows,
                count: resCount.rows[0].count,
              },
            });
          })
          .catch((err) => {
            callback({
              success: false,
            });
          });
      })
      .catch((err) => {
        callback({
          success: false,
        });
      });
  },
  getHopdongAccept3: (limit, offset, callback) => {
    knex
      .raw(
        "select * from several where who = 'hoa' and status = '1' " +
          " offset " +
          offset +
          " limit " +
          limit
      )
      .then((res) => {
        knex
          .raw(
            "select count(*) from several where who = 'hoa' and status = '1' "
          )
          .then((resCount) => {
            callback({
              success: true,
              data: {
                several: res.rows,
                count: resCount.rows[0].count,
              },
            });
          })
          .catch((err) => {
            callback({
              success: false,
            });
          });
      })
      .catch((err) => {
        callback({
          success: false,
        });
      });
  },
  getHopdongRefuse: (limit, offset, callback) => {
    knex
      .raw(
        "select s.*, u.fullname, us.fullname as nguoiduyet\
        from several s\
        left join users u on u.name = s.name\
        left join users us on us.name = s.who where s.status = '2' order by day_end DESC" +
          " offset " +
          offset +
          " limit " +
          limit
      )
      .then((res) => {
        knex
          .raw("select count(*) from several where status = '2' ")
          .then((resCount) => {
            callback({
              success: true,
              data: {
                several: res.rows,
                count: resCount.rows[0].count,
              },
            });
          })
          .catch((err) => {
            callback({
              success: false,
            });
          });
      })
      .catch((err) => {
        callback({
          success: false,
        });
      });
  },
  getHopdongRefuse1: (limit, offset, callback) => {
    knex
      .raw(
        "select * from several where who = 'phe' and status = '2' " +
          " offset " +
          offset +
          " limit " +
          limit
      )
      .then((res) => {
        knex
          .raw(
            "select count(*) from several where who = 'phe' and status = '2' "
          )
          .then((resCount) => {
            callback({
              success: true,
              data: {
                several: res.rows,
                count: resCount.rows[0].count,
              },
            });
          })
          .catch((err) => {
            callback({
              success: false,
            });
          });
      })
      .catch((err) => {
        callback({
          success: false,
        });
      });
  },
  getHopdongRefuse2: (limit, offset, callback) => {
    knex
      .raw(
        "select * from several where who = 'hoai' and status = '2' " +
          " offset " +
          offset +
          " limit " +
          limit
      )
      .then((res) => {
        knex
          .raw(
            "select count(*) from several where who = 'hoai' and status = '2' "
          )
          .then((resCount) => {
            callback({
              success: true,
              data: {
                several: res.rows,
                count: resCount.rows[0].count,
              },
            });
          })
          .catch((err) => {
            callback({
              success: false,
            });
          });
      })
      .catch((err) => {
        callback({
          success: false,
        });
      });
  },
  getHopdongRefuse3: (limit, offset, callback) => {
    knex
      .raw(
        "select * from several where who = 'hoa' and status = '2' " +
          " offset " +
          offset +
          " limit " +
          limit
      )
      .then((res) => {
        knex
          .raw(
            "select count(*) from several where who = 'hoa' and status = '2' "
          )
          .then((resCount) => {
            callback({
              success: true,
              data: {
                several: res.rows,
                count: resCount.rows[0].count,
              },
            });
          })
          .catch((err) => {
            callback({
              success: false,
            });
          });
      })
      .catch((err) => {
        callback({
          success: false,
        });
      });
  },
  select: (sql, callback) => {
    knex
      .raw(sql.strSql)
      .then((res) => {
        knex
          .raw("select count(*) from (" + sql.strSql + ") a")
          .then((resCount) => {
            callback({
              success: true,
              data: {
                several: res.rows,
                count: resCount.rows[0].count,
              },
            });
          })
          .catch((err) => {
            callback({
              success: false,
            });
          });
      })
      .catch((err) => {
        console.log(err, "err");

        callback({
          success: false,
        });
      });
  },
  insertHopdong: function (hopdong, callback) {
    knex
      .raw(
        "insert into several(name, registration_time, day_start, day_end, reason, who, id, status) values ( '" +
          hopdong.nguoiDangKy +
          "' , '" +
          hopdong.thoiGianDangKy +
          "' , '" +
          hopdong.ngayBatDau +
          "' , '" +
          hopdong.ngayKetThuc +
          "' , '" +
          hopdong.lyDo +
          "' , '" +
          hopdong.dangKy +
          "' , '" +
          uuidv4() +
          "' , '0')"
      )
      .then((res) => {
        callback({ success: true });
      })
      .catch((err) => {
        callback({ success: false });
      });
  },
  insertHopdong1: function (hopdong, callback) {
    knex
      .from("half")
      .insert(hopdong)
      .then((res) => {
        callback({ success: true });
      })
      .catch((err) => {
        callback({ success: false });
      });
  },
  insertHopdong2: function (hopdong, callback) {
    knex
      .from("several")
      .insert(hopdong)
      .then((res) => {
        callback({ success: true });
      })
      .catch((err) => {
        callback({ success: false });
      });
  },
  insertHopdong3: function (hopdong, callback) {
    knex
      .from("several")
      .insert(hopdong)
      .then((res) => {
        callback({ success: true });
      })
      .catch((err) => {
        callback({ success: false });
      });
  },
  insertHopdong4: function (hopdong, callback) {
    knex
      .from("several")
      .insert(hopdong)
      .then((res) => {
        callback({ success: true });
      })
      .catch((err) => {
        callback({ success: false });
      });
  },
  updateHopdong: function (hopdong, callback) {
    let query =
      "update several set status = '1', who='" +
      hopdong.username +
      "' where id='" +
      hopdong.value.id +
      "'";
    knex
      .raw(query)
      .then((res) => {
        callback({ success: true });
      })
      .catch((err) => {
        callback({ success: false });
      });
  },
  updateHopdong1: function (hopdong, callback) {
    knex
      .raw("update several set status = '1' where id = '" + hopdong.id + "'")
      .then((res) => {
        callback({ success: true });
      })
      .catch((err) => {
        callback({ success: false });
      });
  },
  updateHopdong2: function (hopdong, callback) {
    knex
      .raw("update several set status = '1' where id = '" + hopdong.id + "'")
      .then((res) => {
        callback({ success: true });
      })
      .catch((err) => {
        callback({ success: false });
      });
  },
  updateHopdong3: function (hopdong, callback) {
    knex
      .raw("update several set status = '1' where id = '" + hopdong.id + "'")
      .then((res) => {
        callback({ success: true });
      })
      .catch((err) => {
        callback({ success: false });
      });
  },
  updateHopdong4: function (hopdong, callback) {
    knex
      .raw(
        "update several set status = '2', who = '" +
          hopdong.username +
          "', lydo = '" +
          hopdong.inp +
          "' where id = '" +
          hopdong.id +
          "'"
      )
      .then((res) => {
        callback({ success: true });
      })
      .catch((err) => {
        callback({ success: false });
      });
  },
  updateHopdong5: function (hopdong, callback) {
    knex
      .raw("update several set status = '2' where id = '" + hopdong.id + "'")
      .then((res) => {
        callback({ success: true });
      })
      .catch((err) => {
        callback({ success: false });
      });
  },
  updateHopdong6: function (hopdong, callback) {
    knex
      .raw("update several set status = '2' where id = '" + hopdong.id + "'")
      .then((res) => {
        callback({ success: true });
      })
      .catch((err) => {
        callback({ success: false });
      });
  },
  updateHopdong7: function (hopdong, callback) {
    knex
      .raw("update several set status = '2' where id = '" + hopdong.id + "'")
      .then((res) => {
        callback({ success: true });
      })
      .catch((err) => {
        callback({ success: false });
      });
  },
  deletechopheduyet: function (hopdong, callback) {
    knex
      .raw("delete from several where id = '" + hopdong.id + "'")
      .then((res) => {
        callback({ success: true });
      })
      .catch((err) => {
        callback({ success: false });
      });
  },
};

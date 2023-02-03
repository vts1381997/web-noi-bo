var knex = require("./common/DB");
var formatDate = require("dateformat");
var format = require("dateformat");

module.exports = {
  getHotro: (limit, offset, index, sortBy, callback) => {
    knex
      .raw(
        "select  hotro.* , nhansu.ns_hovaten, dm_da.dm_duan_ten, khh.kh_ten,khh.kh_sodienthoai, khh.kh_email, nhs.ns_hoten, dvs.dm_dv_ten from hotros hotro left join (select da.dm_duan_ten dm_duan_ten, da.dm_duan_id dm_duan_id from duans da) as dm_da on dm_da.dm_duan_id = hotro.dm_duan_id left join (select kh_ten, kh_sodienthoai, kh_email,kh.kh_id kh_id from khachhangs kh) as khh on khh.kh_id = hotro.kh_id left join (select us.madinhdanh,us.name from users us) as users on users.name = hotro.ns_id_nguoitao left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hoten, ns_dinhdanhcanhan from nhansu ns) as nhs on nhs.ns_dinhdanhcanhan=users.madinhdanh left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten, ns_id from nhansu ns) as nhansu on nhansu.ns_id=hotro.ns_id_ass left join (select dv.dm_dv_ten, dv.dm_dv_id from donvis dv) dvs on dvs.dm_dv_id=hotro.dm_dv_id order by ht_thoigiantiepnhan DESC, ht_uutien ASC, ht_thoigian_hoanthanh DESC " +
          " offset " +
          offset +
          " limit " +
          limit
      )
      .then((res) => {
        knex("hotros")
          .count()
          .then((resCount) => {
            callback({
              success: true,
              data: {
                hotros: res.rows,
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

  getSearch: (limit, offset, index, sortBy, ns_id_ass, callback) => {
    var query =
      "select da.dm_duan_ten tenduan, (select fullname from users where name = ht.ns_id_nguoitao) nguoitao, \
        ns.ns_ho || ' ' || ns.ns_tenlot || ' ' || ns.ns_ten nguoiduocgiao, \
        case(ht.ht_uutien) when 'GAP' then 'Gấp' when 'CAO' then 'Cao' \
        when 'TB' then 'Trung bình' when 'THAP' then 'Thấp' when 'RT' \
        then 'Rất thấp' end uutien, to_char(ht.ht_thoigiantiepnhan, \
        'dd/mm/yyyy') thoigiantiepnhan, to_char(ht.ht_thoigian_dukien_hoanthanh, \
        'dd/mm/yyyy') thoigiandukien, to_char(ht.ht_thoigian_hoanthanh, \
        'dd/mm/yyyy') thoigianhoanthanh, ht.ht_noidungyeucau noidung, \
        ht.ht_ghichu ghichu, dv.dm_dv_ten donvi, kh.kh_ten khachhang, \
		case(ht.ht_trangthai) when 'tiepnhan' then 'Tiếp nhận' \
		when 'dangxuly' then 'Đang xử lý' when 'dangxem' then \
        'Đang xem' when 'daxong' then 'Đã xong' end trangthai, \
        case(ht.ht_phanloai) when 'bug' then 'Sửa lỗi phần mềm' \
        when 'new' then 'Công việc mới' when 'nc' then 'Công việc nghiên cứu' \
        when 'khac' then 'Khác' end phanloai, ht.ht_id nkhd_tutang  \
        from hotros ht left join khachhangs kh on kh.kh_id = \
		ht.kh_id left join donvis dv on dv.dm_dv_id = \
		ht.dm_dv_id left join nhansu ns on \
        ns.ns_id = ht.ns_id_ass left join duans da on da.dm_duan_id = \
        ht.dm_duan_id left join users us on us.name = '" +
      ns_id_ass +
      "' \
        where  ht.ns_id_ass = (select ns_id from nhansu ns left join users us on ns.ns_dinhdanhcanhan = us.madinhdanh where us.name \
        = '" +
      ns_id_ass +
      "') order by ht.ht_thoigiantiepnhan DESC " +
      " offset " +
      offset +
      " limit " +
      limit;
    knex
      .raw(query)
      .then((res) => {
        knex
          .raw(
            "select da.dm_duan_ten tenduan, (select fullname from users where name = ht.ns_id_nguoitao) nguoitao, \
                ns.ns_ho || ' ' || ns.ns_tenlot || ' ' || ns.ns_ten nguoiduocgiao, \
                case(ht.ht_uutien) when 'GAP' then 'Gấp' when 'CAO' then 'Cao' \
                when 'TB' then 'Trung bình' when 'THAP' then 'Thấp' when 'RT' \
                then 'Rất thấp' end uutien, to_char(ht.ht_thoigiantiepnhan, \
                'dd/mm/yyyy') thoigiantiepnhan, to_char(ht.ht_thoigian_dukien_hoanthanh, \
                'dd/mm/yyyy') thoigiandukien, to_char(ht.ht_thoigian_hoanthanh, \
                'dd/mm/yyyy') thoigianhoanthanh, ht.ht_noidungyeucau noidung, \
                ht.ht_ghichu ghichu, dv.dm_dv_ten donvi, kh.kh_ten khachhang, \
                case(ht.ht_trangthai) when 'tiepnhan' then 'Tiếp nhận' \
                when 'dangxuly' then 'Đang xử lý' when 'dangxem' then \
                'Đang xem' when 'daxong' then 'Đã xong' end trangthai, \
                case(ht.ht_phanloai) when 'bug' then 'Sửa lỗi phần mềm' \
                when 'new' then 'Công việc mới' when 'nc' then 'Công việc nghiên cứu' \
                when 'khac' then 'Khác' end phanloai, ht.ht_id nkhd_tutang  \
                from hotros ht left join khachhangs kh on kh.kh_id = \
                ht.kh_id left join donvis dv on dv.dm_dv_id = \
                ht.dm_dv_id left join nhansu ns on \
                ns.ns_id = ht.ns_id_ass left join duans da on da.dm_duan_id = \
                ht.dm_duan_id left join users us on us.name = '" +
              ns_id_ass +
              "' \
                where  ht.ns_id_ass = (select ns_id from nhansu ns left join users us on ns.ns_dinhdanhcanhan = us.madinhdanh where us.name \
                = '" +
              ns_id_ass +
              "') order by ht.ht_thoigiantiepnhan DESC"
          )
          .then((resCount) => {
            console.log(resCount.rowCount, "aaa");
            callback({
              success: true,
              data: {
                hopdongs: res.rows,
                count: resCount.rowCount,
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

  getIdDuan(callback) {
    knex
      .select("dm_duan_id", "dm_duan_ten")
      .from("duans")
      .then((res) => {
        callback({
          data: {
            duans: res,
          },
        });
      });
  },

  getAlls(data, callback) {
    knex
      .raw("select fullname from users where name='" + data.username + "'")
      .then((res) => {
        callback({
          data: res.rows,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getNhanSu(callback) {
    knex
      .select(
        "ns_id",
        knex.raw(
          "coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten"
        )
      )
      .from("nhansu")
      .then((res) => {
        callback({
          data: {
            nhansu: res,
          },
        });
      });
  },

  getKhachHang(callback) {
    knex
      .select("kh_id", "kh_ten")
      .from("khachhangs")
      .then((res) => {
        callback({
          data: {
            khachhangs: res,
          },
        });
      });
  },

  getKhachHangWhere(dv, callback) {
    if (dv.dv === "") {
      knex
        .select("kh_id", "kh_ten")
        .from("khachhangs")
        .then((res) => {
          callback({
            data: {
              khachhangs: res,
            },
          });
        });
    } else {
      knex
        .select("kh_id", "kh_ten")
        .from("khachhangs")
        .where("dm_dv_id", dv.dv)
        .then((res) => {
          callback({
            data: {
              khachhangs: res,
            },
          });
        })
        .catch((err) => {
          callback({ success: false });
        });
    }
  },

  getDonVi(callback) {
    knex
      .select("dm_dv_id", "dm_dv_ten")
      .from("donvis")
      .then((res) => {
        callback({
          data: {
            donvis: res,
          },
        });
      });
  },

  getHopDong(callback) {
    knex
      .select("hd_id")
      .from("hopdongs")
      .then((res) => {
        callback({
          data: {
            hopdongs: res,
          },
        });
      });
  },

  getDataMyself: function(ht_id_nguoitao, callback) {
    if (ht_id_nguoitao.user_cookie !== undefined) {
      knex
        .raw(
          "select myself.* from (select  hotro.* , nhansu.ns_hovaten, nhs.ns_dinhdanhcanhan, dm_da.dm_duan_ten, khh.kh_ten, nhs.ns_hoten from hotros hotro left join (select da.dm_duan_ten dm_duan_ten, da.dm_duan_id dm_duan_id from duans da) as dm_da on dm_da.dm_duan_id = hotro.dm_duan_id left join (select kh_ten, kh.kh_id kh_id from khachhangs kh) as khh on khh.kh_id = hotro.kh_id left join (select us.madinhdanh,us.name from users us) as users on users.name = hotro.ns_id_nguoitao left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hoten, ns_dinhdanhcanhan from nhansu ns) as nhs on nhs.ns_dinhdanhcanhan=users.madinhdanh left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten, ns_id,ns_dinhdanhcanhan from nhansu ns) as nhansu on nhansu.ns_id=hotro.ns_id_ass) as myself where myself.ns_id_ass=(select ns_id from nhansu where ns_dinhdanhcanhan=(select madinhdanh from users where name='" +
            ht_id_nguoitao.user_cookie +
            "'))"
        )
        .then((res) => {
          callback({
            data: {
              myself: res.rows,
            },
          });
        });
    } else {
      knex
        .raw(
          "select myself.* from (select  hotro.* , nhansu.ns_hovaten, nhs.ns_dinhdanhcanhan, dm_da.dm_duan_ten, khh.kh_ten, nhs.ns_hoten from hotros hotro left join (select da.dm_duan_ten dm_duan_ten, da.dm_duan_id dm_duan_id from duans da) as dm_da on dm_da.dm_duan_id = hotro.dm_duan_id left join (select kh_ten, kh.kh_id kh_id from khachhangs kh) as khh on khh.kh_id = hotro.kh_id left join (select us.madinhdanh,us.name from users us) as users on users.name = hotro.ns_id_nguoitao left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hoten, ns_dinhdanhcanhan from nhansu ns) as nhs on nhs.ns_dinhdanhcanhan=users.madinhdanh left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten, ns_id,ns_dinhdanhcanhan from nhansu ns) as nhansu on nhansu.ns_id=hotro.ns_id_ass) as myself where myself.ns_id_nguoitao='" +
            ht_id_nguoitao.userDatao +
            "'"
        )
        .then((res) => {
          callback({
            data: {
              myself: res.rows,
            },
          });
        });
    }
  },

  getDataMyselfDaxong: function(ht_id_nguoitao, limit, offset, callback) {
    if (ht_id_nguoitao.user_cookie !== undefined) {
      if (ht_id_nguoitao.user_cookie === null) {
        knex
          .raw(
            "select myself.* from (select  hotro.* , nhansu.ns_hovaten, nhs.ns_dinhdanhcanhan, dm_da.dm_duan_ten, khh.kh_ten, nhs.ns_hoten from hotros hotro left join (select da.dm_duan_ten dm_duan_ten, da.dm_duan_id dm_duan_id from duans da) as dm_da on dm_da.dm_duan_id = hotro.dm_duan_id left join (select kh_ten, kh.kh_id kh_id from khachhangs kh) as khh on khh.kh_id = hotro.kh_id left join (select us.madinhdanh,us.name from users us) as users on users.name = hotro.ns_id_nguoitao left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hoten, ns_dinhdanhcanhan from nhansu ns) as nhs on nhs.ns_dinhdanhcanhan=users.madinhdanh left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten, ns_id,ns_dinhdanhcanhan from nhansu ns) as nhansu on nhansu.ns_id=hotro.ns_id_ass) as myself where ht_trangthai='daxong' offset " +
              offset +
              " limit " +
              limit
          )
          .then((res) => {
            knex
              .raw(
                "select count(*) from (select  hotro.* , nhansu.ns_hovaten, nhs.ns_dinhdanhcanhan, dm_da.dm_duan_ten, khh.kh_ten, nhs.ns_hoten from hotros hotro left join (select da.dm_duan_ten dm_duan_ten, da.dm_duan_id dm_duan_id from duans da) as dm_da on dm_da.dm_duan_id = hotro.dm_duan_id left join (select kh_ten, kh.kh_id kh_id from khachhangs kh) as khh on khh.kh_id = hotro.kh_id left join (select us.madinhdanh,us.name from users us) as users on users.name = hotro.ns_id_nguoitao left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hoten, ns_dinhdanhcanhan from nhansu ns) as nhs on nhs.ns_dinhdanhcanhan=users.madinhdanh left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten, ns_id,ns_dinhdanhcanhan from nhansu ns) as nhansu on nhansu.ns_id=hotro.ns_id_ass) as myself where ht_trangthai='daxong'"
              )
              .then((resCount) => {
                callback({
                  data: {
                    myself: res.rows,
                    count: resCount.rows[0].count,
                  },
                });
              });
          });
      } else {
        if (new Date().getDate)
          knex
            .raw(
              "select myself.* from (select  hotro.* , nhansu.ns_hovaten, nhs.ns_dinhdanhcanhan, dm_da.dm_duan_ten, khh.kh_ten, nhs.ns_hoten from hotros hotro left join (select da.dm_duan_ten dm_duan_ten, da.dm_duan_id dm_duan_id from duans da) as dm_da on dm_da.dm_duan_id = hotro.dm_duan_id left join (select kh_ten, kh.kh_id kh_id from khachhangs kh) as khh on khh.kh_id = hotro.kh_id left join (select us.madinhdanh,us.name from users us) as users on users.name = hotro.ns_id_nguoitao left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hoten, ns_dinhdanhcanhan from nhansu ns) as nhs on nhs.ns_dinhdanhcanhan=users.madinhdanh left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten, ns_id,ns_dinhdanhcanhan from nhansu ns) as nhansu on nhansu.ns_id=hotro.ns_id_ass) as myself where myself.ns_id_ass=(select ns_id from nhansu where ns_dinhdanhcanhan=(select madinhdanh from users where name='" +
                ht_id_nguoitao.user_cookie +
                "') and ht_trangthai='daxong')"
            )
            .then((res) => {
              callback({
                data: {
                  myself: res.rows,
                },
              });
            });
      }
    } else {
      if (ht_id_nguoitao === null) {
        if (new Date().getDate)
          knex
            .raw(
              "select myself.* from (select  hotro.* , nhansu.ns_hovaten, nhs.ns_dinhdanhcanhan, dm_da.dm_duan_ten, khh.kh_ten, nhs.ns_hoten from hotros hotro left join (select da.dm_duan_ten dm_duan_ten, da.dm_duan_id dm_duan_id from duans da) as dm_da on dm_da.dm_duan_id = hotro.dm_duan_id left join (select kh_ten, kh.kh_id kh_id from khachhangs kh) as khh on khh.kh_id = hotro.kh_id left join (select us.madinhdanh,us.name from users us) as users on users.name = hotro.ns_id_nguoitao left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hoten, ns_dinhdanhcanhan from nhansu ns) as nhs on nhs.ns_dinhdanhcanhan=users.madinhdanh left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten, ns_id,ns_dinhdanhcanhan from nhansu ns) as nhansu on nhansu.ns_id=hotro.ns_id_ass) as myself where ht_trangthai='daxong' offset " +
                offset +
                " limit " +
                limit
            )
            .then((res) => {
              knex
                .raw(
                  "select count(*) from (select  hotro.* , nhansu.ns_hovaten, nhs.ns_dinhdanhcanhan, dm_da.dm_duan_ten, khh.kh_ten, nhs.ns_hoten from hotros hotro left join (select da.dm_duan_ten dm_duan_ten, da.dm_duan_id dm_duan_id from duans da) as dm_da on dm_da.dm_duan_id = hotro.dm_duan_id left join (select kh_ten, kh.kh_id kh_id from khachhangs kh) as khh on khh.kh_id = hotro.kh_id left join (select us.madinhdanh,us.name from users us) as users on users.name = hotro.ns_id_nguoitao left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hoten, ns_dinhdanhcanhan from nhansu ns) as nhs on nhs.ns_dinhdanhcanhan=users.madinhdanh left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten, ns_id,ns_dinhdanhcanhan from nhansu ns) as nhansu on nhansu.ns_id=hotro.ns_id_ass) as myself where ht_trangthai='daxong'"
                )
                .then((resCount) => {
                  callback({
                    data: {
                      myself: res.rows,
                      count: resCount.rows[0].count,
                    },
                  });
                });
            });
      } else {
        if (new Date().getDate)
          knex
            .raw(
              "select myself.* from (select  hotro.* , nhansu.ns_hovaten, nhs.ns_dinhdanhcanhan, dm_da.dm_duan_ten, khh.kh_ten, nhs.ns_hoten from hotros hotro left join (select da.dm_duan_ten dm_duan_ten, da.dm_duan_id dm_duan_id from duans da) as dm_da on dm_da.dm_duan_id = hotro.dm_duan_id left join (select kh_ten, kh.kh_id kh_id from khachhangs kh) as khh on khh.kh_id = hotro.kh_id left join (select us.madinhdanh,us.name from users us) as users on users.name = hotro.ns_id_nguoitao left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hoten, ns_dinhdanhcanhan from nhansu ns) as nhs on nhs.ns_dinhdanhcanhan=users.madinhdanh left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten, ns_id,ns_dinhdanhcanhan from nhansu ns) as nhansu on nhansu.ns_id=hotro.ns_id_ass) as myself where myself.ns_id_nguoitao='" +
                ht_id_nguoitao.userDaTao +
                "' and ht_trangthai='daxong'"
            )
            .then((res) => {
              callback({
                data: {
                  myself: res.rows,
                },
              });
            });
      }
    }
  },

  getDataMyselfGap: function(
    ht_id_nguoitao,
    limit,
    offset,
    index,
    sortBy,
    callback
  ) {
    if (ht_id_nguoitao.user_cookie !== undefined) {
      if (new Date().getDate() === 30) {
        var date = format(
          new Date(),
          "yyyy-" + (new Date().getMonth() + 1) + "-" + 1
        );
      } else {
        var date = format(new Date(), "yyyy-mm-" + (new Date().getDate() + 1));
      }
      if (ht_id_nguoitao.user_cookie === null) {
        knex
          .raw(
            "select myself.* from (select hotro.* , nhansu.ns_hovaten, dm_da.dm_duan_ten, khh.kh_ten,khh.kh_sodienthoai, khh.kh_email, nhs.ns_hoten, dvs.dm_dv_ten from hotros hotro left join (select da.dm_duan_ten dm_duan_ten, da.dm_duan_id dm_duan_id from duans da) as dm_da on dm_da.dm_duan_id = hotro.dm_duan_id left join (select kh_ten, kh_sodienthoai, kh_email,kh.kh_id kh_id from khachhangs kh) as khh on khh.kh_id = hotro.kh_id left join (select us.madinhdanh,us.name from users us) as users on users.name = hotro.ns_id_nguoitao left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hoten, ns_dinhdanhcanhan from nhansu ns) as nhs on nhs.ns_dinhdanhcanhan=users.madinhdanh left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten, ns_id from nhansu ns) as nhansu on nhansu.ns_id=hotro.ns_id_ass left join (select dv.dm_dv_ten, dv.dm_dv_id from donvis dv) dvs on dvs.dm_dv_id=hotro.dm_dv_id) as myself where myself.ht_thoigian_dukien_hoanthanh < '" +
              date +
              "' and myself.ht_trangthai not in ('daxong') order by " +
              index +
              " " +
              sortBy +
              " offset " +
              offset +
              " limit " +
              limit
          )
          .then((res) => {
            callback({
              data: {
                myselfGap: res.rows,
              },
            });
          });
      } else {
        knex
          .raw(
            "select myself.* from (select  hotro.* , nhansu.ns_hovaten, nhs.ns_dinhdanhcanhan, dm_da.dm_duan_ten, khh.kh_ten, nhs.ns_hoten from hotros hotro left join (select da.dm_duan_ten dm_duan_ten, da.dm_duan_id dm_duan_id from duans da) as dm_da on dm_da.dm_duan_id = hotro.dm_duan_id left join (select kh_ten, kh.kh_id kh_id from khachhangs kh) as khh on khh.kh_id = hotro.kh_id left join (select us.madinhdanh,us.name from users us) as users on users.name = hotro.ns_id_nguoitao left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hoten, ns_dinhdanhcanhan from nhansu ns) as nhs on nhs.ns_dinhdanhcanhan=users.madinhdanh left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten, ns_id,ns_dinhdanhcanhan from nhansu ns) as nhansu on nhansu.ns_id=hotro.ns_id_ass) as myself where myself.ns_id_ass=(select ns_id from nhansu where ns_dinhdanhcanhan=(select madinhdanh from users where name='" +
              ht_id_nguoitao.user_cookie +
              "') and myself.ht_thoigian_dukien_hoanthanh < '" +
              date +
              "' and myself.ht_trangthai not in ('daxong'))"
          )
          .then((res) => {
            callback({
              data: {
                myselfGap: res.rows,
              },
            });
          });
      }
    } else {
      if (new Date().getDate() === 30) {
        var date = format(
          new Date(),
          "yyyy-" + (new Date().getMonth() + 1) + "-" + 1
        );
      } else {
        var date = format(new Date(), "yyyy-mm-" + (new Date().getDate() + 1));
      }
      if (ht_id_nguoitao.userDatao === null) {
        knex
          .raw(
            "select myself.* from (select hotro.* , nhansu.ns_hovaten, dm_da.dm_duan_ten, khh.kh_ten,khh.kh_sodienthoai, khh.kh_email, nhs.ns_hoten, dvs.dm_dv_ten from hotros hotro left join (select da.dm_duan_ten dm_duan_ten, da.dm_duan_id dm_duan_id from duans da) as dm_da on dm_da.dm_duan_id = hotro.dm_duan_id left join (select kh_ten, kh_sodienthoai, kh_email,kh.kh_id kh_id from khachhangs kh) as khh on khh.kh_id = hotro.kh_id left join (select us.madinhdanh,us.name from users us) as users on users.name = hotro.ns_id_nguoitao left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hoten, ns_dinhdanhcanhan from nhansu ns) as nhs on nhs.ns_dinhdanhcanhan=users.madinhdanh left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten, ns_id from nhansu ns) as nhansu on nhansu.ns_id=hotro.ns_id_ass left join (select dv.dm_dv_ten, dv.dm_dv_id from donvis dv) dvs on dvs.dm_dv_id=hotro.dm_dv_id) as myself where myself.ht_thoigian_dukien_hoanthanh < '" +
              date +
              "' and myself.ht_trangthai not in ('daxong') order by " +
              index +
              " " +
              sortBy +
              " offset " +
              offset +
              " limit " +
              limit
          )
          .then((res) => {
            callback({
              data: {
                myselfGap: res.rows,
              },
            });
          });
      } else {
        knex
          .raw(
            "select myself.* from (select  hotro.* , nhansu.ns_hovaten, nhs.ns_dinhdanhcanhan, dm_da.dm_duan_ten, khh.kh_ten, nhs.ns_hoten from hotros hotro left join (select da.dm_duan_ten dm_duan_ten, da.dm_duan_id dm_duan_id from duans da) as dm_da on dm_da.dm_duan_id = hotro.dm_duan_id left join (select kh_ten, kh.kh_id kh_id from khachhangs kh) as khh on khh.kh_id = hotro.kh_id left join (select us.madinhdanh,us.name from users us) as users on users.name = hotro.ns_id_nguoitao left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hoten, ns_dinhdanhcanhan from nhansu ns) as nhs on nhs.ns_dinhdanhcanhan=users.madinhdanh left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten, ns_id,ns_dinhdanhcanhan from nhansu ns) as nhansu on nhansu.ns_id=hotro.ns_id_ass) as myself where myself.ns_id_nguoitao='" +
              ht_id_nguoitao.userDatao +
              "' and myself.ht_thoigian_dukien_hoanthanh < '" +
              date +
              "' and myself.ht_trangthai not in ('daxong')"
          )
          .then((res) => {
            callback({
              data: {
                myselfGap: res.rows,
              },
            });
          });
      }
    }
  },

  getDataNguoiTao: function(ns_id_nguoitao, callback) {
    knex
      .raw(
        "select myself.* from (select  hotro.* , nhansu.ns_hovaten, nhs.ns_dinhdanhcanhan, dm_da.dm_duan_ten, khh.kh_ten, nhs.ns_hoten from hotros hotro left join (select da.dm_duan_ten dm_duan_ten, da.dm_duan_id dm_duan_id from duans da) as dm_da on dm_da.dm_duan_id = hotro.dm_duan_id left join (select kh_ten, kh.kh_id kh_id from khachhangs kh) as khh on khh.kh_id = hotro.kh_id left join (select us.madinhdanh,us.name from users us) as users on users.name = hotro.ns_id_nguoitao left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hoten, ns_dinhdanhcanhan from nhansu ns) as nhs on nhs.ns_dinhdanhcanhan=users.madinhdanh left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten, ns_id,ns_dinhdanhcanhan from nhansu ns) as nhansu on nhansu.ns_id=hotro.ns_id_ass) as myself where myself.ns_id_nguoitao='" +
          ns_id_nguoitao.user_cookie +
          "'"
      )
      .then((res) => {
        callback({
          data: {
            dataNguoiTao: res.rows,
          },
        });
      });
  },

  insertHotro: function(hotros, callback) {
    knex
      .from("hotros")
      .insert(hotros)
      .then((response) => {
        callback({
          success: true,
          ht_id: hotros.ht_id,
        });
      })
      .catch((err) => {
        console.log(err);
        callback({
          success: false,
        });
      });
  },

  chat: function(hotros, callback) {
    knex
      .raw(
        "insert into chat(id, nguoigui, tennguoigui, nguoinhan, tennguoinhan, tinnhan, ngay, gio, url) values ('" +
          hotros.id +
          "', '" +
          hotros.user +
          "', '" +
          hotros.name +
          "', '" +
          hotros.nguoiNhan +
          "', (select fullname from users where name='" +
          hotros.nguoiNhan +
          "'), '" +
          hotros.text +
          "', '" +
          hotros.ngay +
          "', '" +
          hotros.gio +
          "', '" +
          hotros.url +
          "')"
      )
      .then((response) => {});
  },

  updateHotro: async function(hotros, callback) {
    var nhatky_hotros = {};
    nhatky_hotros.dm_duan_id = hotros.dm_duan_id;
    nhatky_hotros.nkht_thoigiantiepnhan = hotros.ht_thoigiantiepnhan;
    nhatky_hotros.nkht_thoigian_hoanthanh = hotros.ht_thoigian_hoanthanh;
    nhatky_hotros.ns_id_ass = hotros.ns_id_ass;
    nhatky_hotros.ns_id_nguoitao = hotros.ns_id_nguoitao;
    nhatky_hotros.nkht_noidungyeucau = hotros.ht_noidungyeucau;
    nhatky_hotros.kh_id = hotros.kh_id;
    nhatky_hotros.nkht_trangthai = hotros.ht_trangthai;
    nhatky_hotros.ht_phanloai = hotros.ht_phanloai;
    nhatky_hotros.nkht_uutien = hotros.ht_uutien;
    nhatky_hotros.nkht_ghichu = hotros.ht_ghichu;
    nhatky_hotros.nkht_thoigiancapnhat = hotros.nkht_thoigiancapnhat;
    nhatky_hotros.nkht_id = hotros.ht_id;
    nhatky_hotros.nkht_thoigian_dukien_hoanthanh =
      hotros.ht_thoigian_dukien_hoanthanh;
    nhatky_hotros.ns_id_capnhat = hotros.ns_id_capnhat;
    nhatky_hotros.dm_dv_id = hotros.dm_dv_id;
    delete hotros.ns_id_capnhat;
    delete hotros.nkht_thoigiancapnhat;
    delete hotros.dm_dv_ten;
    if (hotros.ns_hovaten !== undefined) {
      delete hotros.ns_hovaten;
      delete hotros.dm_duan_ten;
      delete hotros.kh_ten;
      delete hotros.ns_hoten;
      delete hotros.ns_dinhdanhcanhan;
    }
    await knex
      .from("nhatky_hotros")
      .insert(nhatky_hotros)
      .then((response) => {
        knex
          .from("hotros")
          .where("ht_id", hotros.ht_id)
          .update(hotros)
          .then((res) => {
            callback({
              success: true,
            });
          })
          .catch((err) => {
            console.log(err);
            callback({
              success: false,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        callback({
          success: false,
        });
      });
  },

  deleteHotro: function(ht_id, callback) {
    knex
      .from("hotros")
      .whereIn("ht_id", ht_id)
      .del()
      .then((res) => {
        callback({
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        callback({
          success: false,
        });
      });
  },

  getHotroFollowMonth: function(monthToMonth, callback) {
    var query =
      "select ht.ns_hovaten, count(ht.ns_hovaten) from ( select  hotro.* , dm_da.dm_duan_ten, khh.kh_ten, nhs.ns_hovaten from hotros hotro left join (select da.dm_duan_ten dm_duan_ten, da.dm_duan_id dm_duan_id from duans da) as dm_da on dm_da.dm_duan_id = hotro.dm_duan_id left join (select kh.kh_ten, kh.kh_id kh_id from khachhangs kh) as khh on khh.kh_id = hotro.kh_id inner join (select coalesce (ns.ns_ho, '') || ' ' || coalesce (ns.ns_tenlot, '') || ' ' || coalesce (ns.ns_ten, '') as ns_hovaten, ns.ns_id ns_id from nhansu ns) as nhs on nhs.ns_id = hotro.ns_id_ass where hotro.ht_thoigian_hoanthanh between '" +
      monthToMonth.monthStart +
      "' and '" +
      monthToMonth.monthEnd +
      "' GROUP BY hotro.dm_duan_id , hotro.ht_thoigiantiepnhan , hotro.ht_thoigian_hoanthanh, hotro.ns_id_ass,hotro.ns_id_nguoitao,hotro.ht_noidungyeucau,hotro.kh_id,hotro.ht_trangthai, hotro.ht_phanloai,hotro.ht_uutien,hotro.ht_ghichu,hotro.ht_id,dm_da.dm_duan_ten,khh.kh_ten,nhs.ns_hovaten) ht group by ht.ns_hovaten";
    knex
      .raw(query)
      .then((res) => {
        callback(res);
      })
      .catch((err) => {
        console.log(err);
        callback({ success: false });
      });
  },

  getDataKhachhang: function(kh_id, callback) {
    knex
      .raw(
        "select *, khs.iddv as dm_dv_id, khs.tendv as tendonvi, dibtinh.idtinh as dm_db_id_tinh ,dibtinh.tentinh as tentinh , dibhuyen.idhuyen as dm_db_id_huyen ,dibhuyen.tenhuyen as tenhuyen , dibxa.idxa as dm_db_id_xa ,dibxa.tenxa as tenxa from khachhangs kh left join(select dbs.dm_db_id idtinh, dbs.dm_db_ten as tentinh from diabans dbs) as dibtinh on dibtinh.idtinh = kh.dm_db_id_tinh left join(select dbs.dm_db_id idhuyen, dbs.dm_db_ten as tenhuyen from diabans dbs) as dibhuyen on dibhuyen.idhuyen = kh.dm_db_id_huyen left join(select dbs.dm_db_id idxa, dbs.dm_db_ten as tenxa from diabans dbs) as dibxa on dibxa.idxa = kh.dm_db_id_xa left join (select dvs.dm_dv_id iddv, dvs.dm_dv_ten tendv from donvis dvs) as khs on khs.iddv = kh.dm_dv_id where kh_id='" +
          kh_id.kh_id +
          "'"
      )
      .then((res) => {
        callback({
          data: {
            khachhangs: res.rows,
          },
        });
      });
  },

  getChat: function(data, callback) {
    knex
      .raw(
        "select * from chat where nguoigui in ('" +
          data.nguoiGui +
          "', '" +
          data.nguoiNhan +
          "') and nguoinhan in ('" +
          data.nguoiGui +
          "', '" +
          data.nguoiNhan +
          "') order by to_date(ngay, 'DD/MM/YYYY') ASC, to_date(gio, 'HH24:MI') ASC"
      )
      .then((res) => {
        callback({
          data: {
            result: res.rows,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getName: function(cookie, callback) {
    knex
      .raw(
        "select ns_ho, ns_tenlot, ns_ten, coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten, ns_id, ns_address from nhansu where ns_dinhdanhcanhan=(select madinhdanh from users where name='" +
          cookie.user_cookie +
          "')"
      )
      .then((res) => {
        callback({
          data: {
            name: res.rows,
          },
        });
      });
  },

  search: function(limit, offset, timkiem, callback) {
    var qr = "";
    if (timkiem.length > 0) {
      for (i = 0; i < timkiem.length; i++) {
        let a = timkiem[i];
        if (!a.values) {
          a.values = "";
        }
        qr =
          qr +
          "upper(cast(hotros." +
          a.keys +
          " as text)) like upper('%" +
          a.values +
          "%') and ";
      }
      var queryy = qr.slice(0, qr.length - 5);
      var query =
        "select * from (select  hotro.* , nhansu.ns_hovaten, dm_da.dm_duan_ten, khh.kh_ten,khh.kh_sodienthoai, khh.kh_email, nhs.ns_hoten, dvs.dm_dv_ten from hotros hotro left join (select da.dm_duan_ten dm_duan_ten, da.dm_duan_id dm_duan_id from duans da) as dm_da on dm_da.dm_duan_id = hotro.dm_duan_id left join (select kh_ten, kh_sodienthoai, kh_email,kh.kh_id kh_id from khachhangs kh) as khh on khh.kh_id = hotro.kh_id left join (select us.madinhdanh,us.name from users us) as users on users.name = hotro.ns_id_nguoitao left join (select trim(regexp_replace(coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, ''), 's+', ' ', 'g')) as ns_hoten, ns_dinhdanhcanhan from nhansu ns) as nhs on nhs.ns_dinhdanhcanhan=users.madinhdanh left join (select trim(regexp_replace(coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, ''), 's+', ' ', 'g')) as ns_hovaten, ns_id from nhansu ns) as nhansu on nhansu.ns_id=hotro.ns_id_ass left join (select dv.dm_dv_ten, dv.dm_dv_id from donvis dv) dvs on dvs.dm_dv_id=hotro.dm_dv_id)as hotros where " +
        queryy +
        " order by hotros.ht_thoigian_hoanthanh DESC, hotros.ht_thoigiantiepnhan DESC, hotros.ht_uutien ASC ";
      knex
        .raw(query)
        .then((res) => {
          knex
            .raw(
              "select count(*) from (select  hotro.* , nhansu.ns_hovaten, dm_da.dm_duan_ten, khh.kh_ten,khh.kh_sodienthoai, khh.kh_email, nhs.ns_hoten, dvs.dm_dv_ten from hotros hotro left join (select da.dm_duan_ten dm_duan_ten, da.dm_duan_id dm_duan_id from duans da) as dm_da on dm_da.dm_duan_id = hotro.dm_duan_id left join (select kh_ten, kh_sodienthoai, kh_email,kh.kh_id kh_id from khachhangs kh) as khh on khh.kh_id = hotro.kh_id left join (select us.madinhdanh,us.name from users us) as users on users.name = hotro.ns_id_nguoitao left join (select trim(regexp_replace(coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, ''), 's+', ' ', 'g')) as ns_hoten, ns_dinhdanhcanhan from nhansu ns) as nhs on nhs.ns_dinhdanhcanhan=users.madinhdanh left join (select trim(regexp_replace(coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, ''), 's+', ' ', 'g')) as ns_hovaten, ns_id from nhansu ns) as nhansu on nhansu.ns_id=hotro.ns_id_ass left join (select dv.dm_dv_ten, dv.dm_dv_id from donvis dv) dvs on dvs.dm_dv_id=hotro.dm_dv_id)as hotros where " +
                queryy +
                " "
            )
            .then((resCount) => {
              callback({
                success: true,
                data: {
                  hotros: res.rows,
                  count: resCount.rows[0].count,
                },
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.getHotro(limit, offset, callback);
    }
  },

  getHotroById: (ht_id, callback) => {
    knex
      .raw(
        "select * from (select  hotro.* , nhansu.ns_hovaten, dm_da.dm_duan_ten, khh.kh_ten,khh.kh_sodienthoai, khh.kh_email, nhs.ns_hoten, dvs.dm_dv_ten from hotros hotro left join (select da.dm_duan_ten dm_duan_ten, da.dm_duan_id dm_duan_id from duans da) as dm_da on dm_da.dm_duan_id = hotro.dm_duan_id left join (select kh_ten, kh_sodienthoai, kh_email,kh.kh_id kh_id from khachhangs kh) as khh on khh.kh_id = hotro.kh_id left join (select us.madinhdanh,us.name from users us) as users on users.name = hotro.ns_id_nguoitao left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hoten, ns_dinhdanhcanhan from nhansu ns) as nhs on nhs.ns_dinhdanhcanhan=users.madinhdanh left join (select coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten, ns_id from nhansu ns) as nhansu on nhansu.ns_id=hotro.ns_id_ass left join (select dv.dm_dv_ten, dv.dm_dv_id from donvis dv) dvs on dvs.dm_dv_id=hotro.dm_dv_id) as hotrobyid where hotrobyid.ht_id ='" +
          ht_id +
          "' "
      )
      .then((res) => {
        callback({
          data: {
            hotrobyid: res.rows,
          },
        });
      });
  },
};

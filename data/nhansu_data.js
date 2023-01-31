var knex = require('./common/DB')
var dateFormat = require('dateformat');

module.exports = {
    getNhansu: (limit, offset, index, sortBy, callback) => {
        knex.select('ns_id', 'ns_ho', 'ns_tenlot', 'ns_ten', 'ns_ngaysinh', 'ns_gioitinh', 'ns_dinhdanhcanhan', 'ns_sodienthoai', 'ns_email', 'ns_diachihiennay', 'ns_nguyenquan', 'ns_nguoilienhe', 'ns_bangcap', 'ns_ngayhocviec', 'ns_ngaythuviec', 'ns_ngaylamchinhthuc', 'ns_ngaydongbaohiem', 'ns_cacgiaytodanop', 'ns_taikhoannganhang', 'ns_trangthai', knex.raw("coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten"))
            .from('nhansu').orderBy(index, sortBy).limit(limit).offset(offset)
            .then((res) => {
                knex('nhansu').count()
                    .then((resCount) => {
                        knex.select('ns_gioitinh').from('nhansu').then((resGioitinh) => {
                            callback({
                                success: true,
                                data: {
                                    nhansu: res,
                                    count: resCount[0].count,
                                    resGioitinh: resGioitinh
                                }
                            })
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

    getAllNhansu: function (data, callback) {
        var query = "select name, fullname, status from users where name not in ('admin', 'test')";
        knex.raw(query).then(res => {
            callback({
                data: res.rows,
                success: true
            })
        }).catch(err => {
            console.log(err)
            callback({
                success: false
            })
        })
    },

    insertNhansu: function (nhansu, callback) {
        nhansu.ns_ngaysinh = dateFormat(nhansu.ns_ngaysinh, "yyyy/mm/dd")
        nhansu.ns_ngayhocviec = dateFormat(nhansu.ns_ngayhocviec, "yyyy/mm/dd")
        nhansu.ns_ngaythuviec = dateFormat(nhansu.ns_ngaythuviec, "yyyy/mm/dd")
        nhansu.ns_ngaylamchinhthuc = dateFormat(nhansu.ns_ngaylamchinhthuc, "yyyy/mm/dd")
        nhansu.ns_ngaydongbaohiem = dateFormat(nhansu.ns_ngaydongbaohiem, "yyyy/mm/dd")
        knex.from('nhansu').insert(nhansu).then(res => {
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

    updateNhansu: function (nhansu, callback) {
        nhansu.ns_ngaysinh = dateFormat(nhansu.ns_ngaysinh, "yyyy/mm/dd")
        nhansu.ns_ngayhocviec = dateFormat(nhansu.ns_ngayhocviec, "yyyy/mm/dd")
        nhansu.ns_ngaythuviec = dateFormat(nhansu.ns_ngaythuviec, "yyyy/mm/dd")
        nhansu.ns_ngaylamchinhthuc = dateFormat(nhansu.ns_ngaylamchinhthuc, "yyyy/mm/dd")
        nhansu.ns_ngaydongbaohiem = dateFormat(nhansu.ns_ngaydongbaohiem, "yyyy/mm/dd")
        knex.from('nhansu').where('ns_id', nhansu.ns_id).update(nhansu).then(res => {
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

    deleteNhansu: function (ns_id, callback) {
        knex.from('nhansu').whereIn('ns_id', ns_id).del().then(res => {
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

    selectNhansu: function (nhansu, callback) {
        nhansu.ns_ngaysinh = dateFormat(nhansu.ns_ngaysinh, "yyyy/mm/dd")
        nhansu.ns_ngayhocviec = dateFormat(nhansu.ns_ngayhocviec, "yyyy/mm/dd")
        nhansu.ns_ngaythuviec = dateFormat(nhansu.ns_ngaythuviec, "yyyy/mm/dd")
        nhansu.ns_ngaylamchinhthuc = dateFormat(nhansu.ns_ngaylamchinhthuc, "yyyy/mm/dd")
        nhansu.ns_ngaydongbaohiem = dateFormat(nhansu.ns_ngaydongbaohiem, "yyyy/mm/dd")
        knex.from('nhansu').select('*').where('ns_id', nhansu.ns_id).then(res => {
            callback(res[0])
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },

    search: function (limit, offset, timkiem, callback) {
        let qr = ""
        if (timkiem.length > 0) {
            for (i = 0; i < timkiem.length; i++) {
                let a = timkiem[i]
                if (!a.values) {
                    a.values = ''
                }
                qr = qr + "upper(cast(ns." + a.keys + " as text)) like upper('%" + a.values + "%') and "

            }
            let queryy = qr.slice(0, qr.length - 5)
            let query = "select * from (select *, coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten from nhansu)as ns where " + queryy + ""
            knex.raw(query)
                .then(res => {
                    knex.raw("select count(*) from (select *, coalesce (ns_ho, '') || ' ' || coalesce (ns_tenlot, '') || ' ' || coalesce (ns_ten, '') as ns_hovaten from nhansu)as ns where " + queryy + "")
                        .then(resCount => {
                            callback({
                                success: true,
                                data: {
                                    nhansu: res.rows,
                                    count: resCount.rows[0].count
                                }
                            })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            this.getNhansu(limit, offset, callback);
        }
    },

    getUser(callback) {
        knex.select('name', 'madinhdanh').from('users').then((res) => {
            callback({
                data: {
                    users: res
                }
            })
        })
    },

    getProfile(a, callback) {
        knex.raw("select * from nhansu where ns_dinhdanhcanhan ='" + a + "'").then((res) => {
            callback({
                data: {
                    nhansu: res.rows
                }
            })
        })
    },

    getUpdate: function (nhansu, callback) {
        nhansu.ns_ngaysinh = dateFormat(nhansu.ns_ngaysinh, "yyyy/mm/dd")
        nhansu.ns_ngayhocviec = dateFormat(nhansu.ns_ngayhocviec, "yyyy/mm/dd")
        nhansu.ns_ngaythuviec = dateFormat(nhansu.ns_ngaythuviec, "yyyy/mm/dd")
        nhansu.ns_ngaylamchinhthuc = dateFormat(nhansu.ns_ngaylamchinhthuc, "yyyy/mm/dd")
        nhansu.ns_ngaydongbaohiem = dateFormat(nhansu.ns_ngaydongbaohiem, "yyyy/mm/dd")
        knex.from('nhansu').where('ns_dinhdanhcanhan', nhansu.ns_dinhdanhcanhan).update(nhansu).then(res => {
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

    getJob: function (data, callback) {
        var query = "select da.dm_duan_ten as tenduan, case(ht.ht_uutien) when 'GAP' then 'Gấp' when 'CAO' then 'Cao' when 'TB' then 'Trung bình' when 'THAP' then 'Thấp' when 'RT' then 'Rất thấp' end uutien, case(ht.ht_trangthai) when 'tiepnhan' then 'Tiếp nhận' when 'dangxuly' then 'Đang xử lý' when 'dangxem' then 'Đang xem' when 'daxong' then 'Đã xong' end trangthai, case(ht.ht_phanloai) when 'bug' then 'Sửa lỗi phần mềm' when 'new' then 'Công việc mới' when 'nc' then 'Công việc nghiên cứu' when 'khac' then 'Khác' end phanloai,  TO_CHAR(ht.ht_thoigiantiepnhan, 'dd/mm/yyyy') as thoigiantiepnhan, TO_CHAR(ht.ht_thoigian_hoanthanh, 'dd/mm/yyyy') as thoigianhoanthanh from hotros ht left join nhansu ns on ht.ns_id_ass = ns.ns_id left join duans da on ht.dm_duan_id = da.dm_duan_id where ns.ns_id='" + data.value + "'"
        knex.raw(query).then(res => {
            callback({
                success: true,
                data: res.rows
            })
        }).catch(err => {
            callback({
                success: false
            })
        })
    },
}
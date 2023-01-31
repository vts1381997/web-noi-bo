var knex = require('./common/DB')
module.exports = {
    getHopdong: (limit, offset, callback) => { 
        knex.raw("select hd.hd_id, \
        case (hd.hd_loai) \
            when 'DV' then 'Đơn Vị'\
            when 'CN' then 'Cá Nhân'\
        end ten_hd_loai,\
        hd.hd_loai,\
        hd.hd_doituong,\
        case (hd.hd_loai)\
            when 'DV' then (select dv.dm_dv_ten || ' - ' || \
            dv.dm_dv_diachi from donvis dv where dv.dm_dv_id = hd.hd_doituong)\
            when 'CN' then (select kh.kh_ten from khachhangs kh where kh.kh_id = hd.hd_doituong)\
        end ten_hd_doituong,\
        hd.dm_duan_id,\
        da.dm_duan_ten,\
        hd.hd_so,\
        hd.hd_thoigianthuchien,\
        hd.hd_thoigianthuchien || ' ngày' as hd_thoigianthuchienngay,\
        TO_CHAR(hd.hd_ngayketthuc, 'dd/mm/yyyy') as hd_ngayketthuc,\
        hd.hd_diachi,\
        TO_CHAR(hd.hd_ngayky, 'dd/mm/yyyy') as hd_ngayky,\
        TO_CHAR(hd.hd_ngaythanhly, 'dd/mm/yyyy') as hd_ngaythanhly,\
        TO_CHAR(hd.hd_ngayxuathoadon, 'dd/mm/yyyy') as hd_ngayxuathoadon,\
        TO_CHAR(hd.hd_ngaythanhtoan, 'dd/mm/yyyy') as hd_ngaythanhtoan,\
        hd.hd_congty,\
        hd.hd_trangthai,\
        hd.hd_loaimuaban,\
        case(hd.hd_loaimuaban)\
            when 'MV' then 'Mua vào'\
            when 'BR' then 'Bán ra'\
        end ten_hd_loaimuaban,\
        case (hd.hd_trangthai)\
             when 'DTH' then 'Đang thực hiện'\
             when 'TL'  then 'Thanh lý'\
             when 'XHD' then 'Xuất hóa đơn'\
             when 'DTT' then 'Đã thanh toán'\
             when 'DONG' then 'Đóng'\
        end ten_hd_trangthai,\
        hd.hd_files,\
        hd.hd_ghichu\
        from hopdongs hd,\
        duans da \
        where hd.dm_duan_id = da.dm_duan_id "+ ' offset ' + offset + ' limit ' + limit)
            .then(res => {
                knex('hopdongs').count()
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                hopdongs: res.rows,
                                count: resCount[0].count
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
    getNhatkyHopdong: (limit, offset, callback) => {
        knex.raw("select hd.nkhd_id, \
        case (hd.nkhd_loai) \
            when 'DV' then 'Đơn Vị'\
            when 'CN' then 'Cá Nhân'\
        end ten_nkhd_loai,\
        hd.nkhd_loai,\
        hd.nkhd_doituong,\
        case (hd.nkhd_loai)\
            when 'DV' then (select dv.dm_dv_ten from donvis dv where dv.dm_dv_id = hd.nkhd_doituong)\
            when 'CN' then (select kh.kh_ten from khachhangs kh where kh.kh_id = hd.nkhd_doituong)\
        end ten_nkhd_doituong,\
        hd.dm_duan_id,\
        da.dm_duan_ten,\
        hd.nkhd_so,\
        hd.nkhd_thoigianthuchien,\
        hd.nkhd_ngayketthuc,\
        hd.nkhd_diachi,\
        hd.nkhd_ngayky,\
        hd.nkhd_ngaythanhly,\
        hd.nkhd_ngayxuathoadon,\
        hd.nkhd_ngaythanhtoan,\
        hd.nkhd_congty,\
        hd.nkhd_trangthai,\
        case (hd.nkhd_trangthai)\
             when 'DTH' then 'Đang thực hiện'\
             when 'TL'  then 'Thanh lý'\
             when 'XHD' then 'Xuất hóa đơn'\
             when 'DTT' then 'Đã thanh toán'\
             when 'DONG' then 'Đóng'\
        end ten_nkhd_trangthai,\
        hd.nkhd_files,\
        hd.nkhd_ghichu,\
        hd.nkhd_action,\
        case (hd.nkhd_action) \
                            when 'INSERT' then 'Thêm mới' \
                            when 'UPDATE' then 'Sửa' \
                            when 'DELETE' then 'Xóa' \
                        end ten_nkhd_action, \
        hd.nkhd_tutang,\
        hd.nkhd_thoigiancapnhat\
        from nhatky_hopdongs hd,\
        duans da \
        where hd.dm_duan_id = da.dm_duan_id "+ ' offset ' + offset + ' limit ' + limit)
            .then(res => {
                knex('nhatky_hopdongs').count()
                    .then((resCount) => {
                        callback({
                            success: true,
                            data: {
                                hopdongs: res.rows,
                                count: resCount[0].count
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
    deleteHopdongbyId: function (hd_id, callback) {
        knex.from('hopdongs').whereIn('hd_id', hd_id).del().then(res => {
            callback({ success: true });
        }).catch(err => {
            console.log(err);
            callback({ success: false })
        })
    },
    insertHopdong: function (hopdong, callback) {
        knex.from('hopdongs').insert(hopdong).then(res => {
            callback({ success: true });
        }).catch(err => {
            console.log(err);
            callback({ success: false })
        })
    },
    updateHopdong: function (hopdong, callback) {
        if (hopdong.hd_files == ' ') {
            delete hopdong.hd_files;
            knex.from('hopdongs').update(hopdong).where('hd_id', hopdong.hd_id).then(res => {
                callback({ success: true })
            }).catch(err => {
                callback({ success: false })
            })
        }
        else {
            knex.from('hopdongs').update(hopdong).where('hd_id', hopdong.hd_id).then(res => {
                callback({ success: true })
            }).catch(err => {
                callback({ success: false })
            })
        }
    },
    selectHopdong: function (hopdong, callback) {
        knex.from('hopdongs').select('*').where('hd_id', hopdong.hd_id).then(res => {
            callback(res[0]);
        }).catch(err => {
            callback({ success: false })
        })
    },
    getcha: function (callback) {
        let strSqlDV = "select dm_dv_id as id, dm_dv_ten ten from donvis";
        knex.raw(strSqlDV).then(res => {
            callback(res.rows);
        }).catch((err) => {
        })
    },
    getdonvi: function (callback) {
        let strSqlDV = "select dm_dv_id as id, dm_dv_ten || ' (' || dm_dv_diachi || ')' ten from donvis";
        knex.raw(strSqlDV).then(res => {
            callback(res.rows);
        }).catch((err) => {
        })
    },
    getkhachhang: function (callback) {
        let strSqlKH = "select kh_id as id, kh_ten || ' (' || coalesce(kh_email, 'Không có email') || ')' ten from khachhangs";
        knex.raw(strSqlKH).then(res => {
            callback(res.rows);
        }).catch((err) => {
        })
    },
    getduan: function (callback) {
        let strSqlDA = "select dm_duan_id, dm_duan_ten from duans";
        knex.raw(strSqlDA).then(res => {
            callback(res.rows);
        }).catch((err) => {
        })
    },
    getinsertduan: function (duan, callback) {
        knex.from('duans').insert(duan).then(res => {
            callback({ success: true });
        }).catch(err => {
            callback({ success: false })
        })
    },
    search: function (limit, offset, timkiem, callback) {
        var qr = ""
        if (timkiem.length > 0) {
            for (i = 0; i < timkiem.length; i++) {
                let a = timkiem[i]
                if (!a.values) {
                    a.values = ''
                }
                qr = qr + "upper(cast(hopdongs." + a.keys + " as text)) like upper('%" + a.values + "%') and "
            }
            var queryy = qr.slice(0, qr.length - 5)
            var query = "select * from (select hd.hd_id, \
                case (hd.hd_loai) \
                    when 'DV' then 'Đơn Vị'\
                    when 'CN' then 'Cá Nhân'\
                end ten_hd_loai,\
                hd.hd_loai,\
                hd.hd_doituong,\
                case (hd.hd_loai)\
                    when 'DV' then (select dv.dm_dv_ten || ' - ' || \
                    dv.dm_dv_diachi from donvis dv where dv.dm_dv_id = hd.hd_doituong)\
                    when 'CN' then (select kh.kh_ten from khachhangs kh where kh.kh_id = hd.hd_doituong)\
                end ten_hd_doituong,\
                hd.dm_duan_id,\
                da.dm_duan_ten,\
                hd.hd_so,\
                hd.hd_thoigianthuchien || ' ngày' as hd_thoigianthuchien,\
                TO_CHAR(hd.hd_ngayketthuc, 'dd/mm/yyyy') as hd_ngayketthuc,\
                hd.hd_diachi,\
                TO_CHAR(hd.hd_ngayky, 'dd/mm/yyyy') as hd_ngayky,\
                TO_CHAR(hd.hd_ngaythanhly, 'dd/mm/yyyy') as hd_ngaythanhly,\
                TO_CHAR(hd.hd_ngayxuathoadon, 'dd/mm/yyyy') as hd_ngayxuathoadon,\
                TO_CHAR(hd.hd_ngaythanhtoan, 'dd/mm/yyyy') as hd_ngaythanhtoan,\
                hd.hd_congty,\
                hd.hd_trangthai,\
                hd.hd_loaimuaban,\
                case(hd.hd_loaimuaban)\
                    when 'MV' then 'Mua vào'\
                    when 'BR' then 'Bán ra'\
                end ten_hd_loaimuaban,\
                case (hd.hd_trangthai)\
                     when 'DTH' then 'Đang thực hiện'\
                     when 'TL'  then 'Thanh lý'\
                     when 'XHD' then 'Xuất hóa đơn'\
                     when 'DTT' then 'Đã thanh toán'\
                     when 'DONG' then 'Đóng'\
                end ten_hd_trangthai,\
                hd.hd_files,\
                hd.hd_ghichu\
                from hopdongs hd,\
                duans da \
                where hd.dm_duan_id = da.dm_duan_id) as hopdongs where " + queryy + " "

            knex.raw(query)
                .then(res => {
                    knex.raw("select count(*) from (select hd.hd_id, \
                        case (hd.hd_loai) \
                            when 'DV' then 'Đơn Vị'\
                            when 'CN' then 'Cá Nhân'\
                        end ten_hd_loai,\
                        hd.hd_loai,\
                        hd.hd_doituong,\
                        case (hd.hd_loai)\
                            when 'DV' then (select dv.dm_dv_ten || ' - ' || \
                            dv.dm_dv_diachi from donvis dv where dv.dm_dv_id = hd.hd_doituong)\
                            when 'CN' then (select kh.kh_ten from khachhangs kh where kh.kh_id = hd.hd_doituong)\
                        end ten_hd_doituong,\
                        hd.dm_duan_id,\
                        da.dm_duan_ten,\
                        hd.hd_so,\
                        hd.hd_thoigianthuchien || ' ngày' as hd_thoigianthuchien,\
                        TO_CHAR(hd.hd_ngayketthuc, 'dd/mm/yyyy') as hd_ngayketthuc,\
                        hd.hd_diachi,\
                        TO_CHAR(hd.hd_ngayky, 'dd/mm/yyyy') as hd_ngayky,\
                        TO_CHAR(hd.hd_ngaythanhly, 'dd/mm/yyyy') as hd_ngaythanhly,\
                        TO_CHAR(hd.hd_ngayxuathoadon, 'dd/mm/yyyy') as hd_ngayxuathoadon,\
                        TO_CHAR(hd.hd_ngaythanhtoan, 'dd/mm/yyyy') as hd_ngaythanhtoan,\
                        hd.hd_congty,\
                        hd.hd_trangthai,\
                        hd.hd_loaimuaban,\
                        case(hd.hd_loaimuaban)\
                            when 'MV' then 'Mua vào'\
                            when 'BR' then 'Bán ra'\
                        end ten_hd_loaimuaban,\
                        case (hd.hd_trangthai)\
                             when 'DTH' then 'Đang thực hiện'\
                             when 'TL'  then 'Thanh lý'\
                             when 'XHD' then 'Xuất hóa đơn'\
                             when 'DTT' then 'Đã thanh toán'\
                             when 'DONG' then 'Đóng'\
                        end ten_hd_trangthai,\
                        hd.hd_files,\
                        hd.hd_ghichu\
                        from hopdongs hd,\
                        duans da \
                        where hd.dm_duan_id = da.dm_duan_id) as hopdongs where " + queryy + "")
                        .then(resCount => {
                            callback({
                                success: true,
                                data: {
                                    hopdongs: res.rows,
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
            this.getNhatkyHopdong(limit, offset, callback);
        }
    },
    insertDuan: function (duan, callback) {
        knex.from('duans').insert(duan).then(res => {
            callback({ success: true });
        }).catch(err => {
            console.log(err)
            callback({ success: false })
        })
    },
};

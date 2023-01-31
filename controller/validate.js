

export function validator(conditions, request) {
    if (typeof conditions == 'undefinded' & conditions == null & Array(conditions).length) {
        return 'Chưa có điều kiện !'
    }
    if (typeof request == 'undefined' & request == null & Array(conditions).length) {
        return 'Chưa có dữ liệu kiểm tra'
    }

    if (typeof conditions === 'object' & typeof request === 'object') {

    }
}

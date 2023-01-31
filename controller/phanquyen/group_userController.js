

var Validator = require('../validate/common')
const userData = require('../data/userData')
const constant = require('./constant')
var UserController = {
    /**
     * Get user paging.
     * @param {Number} pageNumber Page number
     * @param {Number} pageSize Page size
     * @param {Function} callback Function call back
     */
    /**
     * @para
     */

    getUser: function getUser(pageNumber, pageSize,index,sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        userData.getUser(limit, offset,index,sortBy,  (data) => {
            callback(data);
        }
        );
    },
    /**
     * Get user by Id.
     * @param {Number} Id The identify of user
     */
    GetById: function GetById(Id, callback) {
        userData.GetById(Id, (data) => {
            if (data == undefined) {
                callback({});
            }
            callback(data);
        });
    },

    DeleteUserbyId: async function deleteUserbyId(Id, callback) {
        userData.deleteUserbyId(Id, (data) => {

            if (data.success === true) {
                callback({
                    success: data.success,
                    message: data.success === true ? constant.successDelete : constant.errorMessage
                })
            }
            callback(data, 400);
        })
    },

    insertUser: async function insertUser(user, callback) {

        if (Validator.isMail(user.email, 'Email không đúng định dạng')
            & Validator.isNumAlpha(user.name, 'Tên đăng nhập không đúng định dạng')
            & Validator.isPass(user.password, 'Mật khẩu không đúng định dạng')
        ) {

            if (await Validator.db.unique('users', 'name', user.name, 'Tên đăng nhập đã tồn tại !')
                & await Validator.db.unique('users', 'email', user.email, 'Email đã tồn tại !')
                & await Validator.db.unique('users', 'phone', user.phone, 'Số điện thoại đã tồn tại !')
                & await Validator.db.unique('users', 'code', user.code, 'Mã đã tồn tại !')) {
                userData.insertUser(user, (response) => {
                    var message = constant.successInsert;
                    var status = 200;
                    if (!response.success) {
                        Validator.error.push(constant.errorSys)
                        message = Validator.getError()
                        status = 400
                    }
                    callback({
                        message: message,
                        success: response.success
                    }, status);
                })
            } else {
                callback({
                    message: Validator.getError(),
                    success: false
                }, 400);
            }

        } else {
            callback({
                message: Validator.getError(),
                success: false
            }, 400);
        }
    },
    updateUser: function updateUser(user, callback) {
        if (Validator.isMail(user.email, 'Email không đúng định dạng')
            & Validator.isNumAlpha(user.name, 'Tên đăng nhập không đúng định dạng')
            & Validator.isPass(user.password, 'Mật khẩu không đúng định dạng')
        ) {
           
                userData.updateUser(user, (res) => {
                    callback({
                        success: res.success,
                        message: res.success === true ? constant.successUpdate : constant.errorUpdate
                    })
                })
            
        }
    }
    ,
    Login: function getUserLogin(userName, callback) {
        userData.getUserLogin(userName, (data) => {

            callback(data);
        })
    },
    search: function search( pageSize,pageNumber,textSearch, columnSearch,index,sortBy,callback){
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        userData.search(limit,offset,textSearch,columnSearch, index, sortBy ,(data)=>{
            callback(data);
        })
    },

    validateCreate: (req, res, next) => {
        next()
    },

}
module.exports = UserController;
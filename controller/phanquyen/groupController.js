var Validator = require('../../validate/common')
const groupData = require('../../data/groupData')
const constant = require('../constant')
const bcrypt = require('bcryptjs');
const pool = require('../../data/connect')

var groupController = {

    /**
     * Get user paging.
     * @param {Number} pageNumber Page number
     * @param {Number} pageSize Page size
     * @param {Function} callback Function call back
     */
    /**
     * @para
     */

    getGroup: function getGroup(pageNumber, pageSize, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        groupData.getGroup(limit, offset, index, sortBy, (data) => {
            callback(data);
        }
        );
    },

    deleteGroup: async function deleteGroup(Id, callback) {
        groupData.deleteGroup(Id, (data) => {
            if (data.success === true) {
                callback({
                    success: data.success,
                    message: data.success === true ? constant.successDelete : constant.errorMessage
                })
            }
            else {
                callback(data, 400);
            }
        })
    },

    insertGroup: function insertGroup(user, callback) {
        groupData.insertGroup(user, (response) => {
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
    },

    updateGroup: function updateGroup(user, callback) {
        if (Validator.isMail(user.email, 'Email không đúng định dạng')
            & Validator.isNumAlpha(user.name, 'Tên đăng nhập không đúng định dạng')
            & Validator.isPass(user.password, 'Mật khẩu không đúng định dạng')
        ) {
            bcrypt.hash(user.password, 10, function (err, hash) {
                user.password = hash;
                groupData.updateGroup(user, (res) => {
                    callback({
                        success: res.success,
                        message: res.success === true ? constant.successUpdate : constant.errorUpdate
                    })
                })
            });
        }
    },

    Login: function getUserLogin(userName, callback) {
        groupData.getUserLogin(userName, (data) => {
            if (data) {
                this.getClaimsByUser(userName, (cls) => {
                    data.claims = cls;
                    callback(data);
                })
            }
            else {
                callback(data)

            }
        })

    },
    getClaimsByGroup: (userName, callback) => {
        groupData.getClaims(userName, (data) => {
            if (data.data.length > 0) {
                var data = data.data.map(function (value) {
                    return value.role + '.' + value.action
                });
                callback(data)
            }
            else {
                callback(data.data)
            }
        })
    },

    getClaimsByGroupUser: (groupUserName, callback) => {
        let data = [
            "USER.READ",
            "USER.EDIT",
            "USER.DELETE"
        ]
        if (groupUserName == 'dev') {
            callback(data)
        } else {
            data = [
                "USER.READ"
            ];
            callback(data);
        }
    },

    search: function search(pageSize, pageNumber, textSearch, columnSearch, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        groupData.search(limit, offset, textSearch, columnSearch, index, sortBy, (data) => {
            callback(data);
        })
    },

    setGroupPermission: function (permiss, callback) {
        groupData.updateRole(permiss, (data) => {
            callback(data)
        })
        //    let per =  permiss.map(function (value) {
        //         return value = { role: value.split('.')[0], action: value.split('.')[1] }
        //     })
        //     callback(per)
    },

    validateCreate: (req, res, next) => {
        next()
    },
}
module.exports = groupController;

var Validator = require('../../validate/common')
const memberData = require('../../data/memberData')
const constant = require('../constant')
const bcrypt = require('bcryptjs');
const pool = require('../../data/connect')

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

    getUser: function getUser(pageNumber, pageSize, gr, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        memberData.getUser(limit, offset, gr, (data) => {
            callback(data);
        }
        );
    },
    getList: function getList(pageNumber, pageSize, groupName, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        memberData.getList(limit, offset, groupName, (data) => {
            callback(data);
        }
        );
    },

    deleteUser: async function deleteUser(listmem, groupName, callback) {
        memberData.deleteUser(listmem, groupName, (data) => {
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

    addUser: function addUser(user,groupName,gr, callback) {
       memberData.addUser(user,groupName,gr,(data)=>{
           callback(data)
       })
    },

}
module.exports = UserController;
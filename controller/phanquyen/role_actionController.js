
const role_actionData = require('../../data/role_actionData')
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

    getRole: function getRole(pageNumber, pageSize, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        role_actionData.getRole(limit, offset, index, sortBy, (data) => {
            callback(data);
        }
        );
    },


    deleteRole: async function deleteRole(Id, callback) {
        role_actionData.deleteRole(Id, (data) => {
            callback(data)
        })
    },

    insertRoleAction: async function insertRoleAction(roles, callback) {
        role_actionData.uniqueRole(roles, (data) => {
            if (data.length > 0) {
                callback({ success: false, message: 'da ton tai ' })
            } else {
                role_actionData.insertRoleAction(roles, (data) => {
                    callback(data)
                })
            }
        })
    },
    updateRoleAction: function updateRoleAction(user, callback) {
        role_actionData.uniqueRole(user, (data) => {
            if(data[0].id == user.id){
            }
            if (data.length === 0 || data[0].id === user.id) {
                role_actionData.updateRoleAction(user, (data) => {
                    callback(data)
                })
            } else {
                callback({ success: false, message: 'da ton tai ' })
            }
        })
    },

    search: function search(pageSize, pageNumber, textSearch, columnSearch, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        role_actionData.search(limit, offset, textSearch, columnSearch, index, sortBy, (data) => {
            callback(data);
        })
    },
    getRoleCode: function getRoleCode(callback) {
        role_actionData.getRoleCode((data) => {
            callback(data)
        })
    },
    getRoleAction: function getRoleAction(callback) {
        role_actionData.getRoleAction((data) => {
            callback(data)
        })
    },
    insertRole: function insertRole(name, des, callback) {
        role_actionData.insertRole(name, des, (data) => {
            callback(data);
        })
    },
    insertAction: function insertAction(name, callback) {
        role_actionData.insertAction(name, (data) => {
            callback(data);
        })
    }




}
module.exports = UserController;
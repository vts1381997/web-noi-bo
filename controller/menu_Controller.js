var Validator = require('../validate/common')
const menuData = require('../data/menu_data')
const constant = require('./constant')

var menuController = {

    getMenu: function getMenu(pageNumber, pageSize, index, sortBy, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        menuData.getMenu(limit, offset, index, sortBy, function (data) {
            callback(data);
        })
    },

    insertMenu: function insertMenu(menus, callback) {
        menuData.insertMenu(menus, (response) => {
            var message = constant.successInsert;
            var status = 200;
            if (!response.success) {
                Validator.error.push(constant.errorSys)
                message = Validator.getError();
                status = 400
            }
            callback({
                message: message,
                success: response.success
            }, status);
        });
    },

    updateMenu: function updateMenu(menus, callback) {
        menuData.updateMenu(menus, (res) => {
            callback({
                success: res.success,
                message: res.success === true ? constant.successUpdate : constant.errorUpdate
            })
        })
    },

    deleteMenuById: async function deleteMenuById(dm_menu_id, callback) {
        menuData.deleteMenu(dm_menu_id, data => {
            if (data.success === true) {
                callback({
                    success: data.success,
                    message: data.success === true ? constant.successDelete : constant.errorMessage
                })
            }
        })
    },
}

module.exports = menuController;
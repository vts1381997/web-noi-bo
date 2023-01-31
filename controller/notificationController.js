const notificationData = require('../data/notification.data');
const constant = require('./constant');
const uuidv4 = require('uuid/v4');
var notificationController = {
    /**
     * Get user paging.
     * @param {Number} pageNumber Page number
     * @param {Number} pageSize Page size
     * @param {Function} callback Function call back
     */
    /**
     * @param
     */
    getNotification: function getNotification(pageNumber, pageSize, ten, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        let name = ten;
        notificationData.getNotification(limit, offset, name, (data) => {
            callback(data);
        });
    },
    getNotifications: function getNotifications(pageNumber, pageSize, ten, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        let name = ten;
        notificationData.getNotifications(limit, offset, name, (data) => {
            callback(data);
        });
    },
    getNotificationss: function getNotificationss(pageNumber, pageSize, ten, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        let name = ten;
        notificationData.getNotificationss(limit, offset, name, (data) => {
            callback(data);
        });
    },
    getNotificationsss: function getNotificationsss(pageNumber, pageSize, ten, callback) {
        let limit = pageSize;
        let offset = pageSize * (pageNumber - 1);
        let name = ten;
        notificationData.getNotificationsss(limit, offset, name, (data) => {
            callback(data);
        });
    },
    
    /**
     * Get user by Id.
     * @param {Number} Id The identify of user
     */
     
}
module.exports = notificationController;
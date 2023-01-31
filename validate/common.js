var regExpConfig = require('./regex')
var defaultMessage = 'Không đúng định dạng !'
var defaultMessageConnect = 'Có sự cố xảy ra!'
var defaultMessageUnique = 'Đã tồn tại!'
var knex = require('../data/common/DB')

constructor = (value, errMessage) => {
    if (typeof value === undefined) {
        return false;
    }
    if (typeof errMessage === undefined | errMessage === null | errMessage.length === 0) {

    }
    else {
        defaultMessage = errMessage
    }

    if ((typeof value) + '' === 'string' & value.length > 0) {


        return true
    }

    return false
}

asyncQuery = async (table, column, value) => {
    await knex(table).where(column, value)
        .then((res) => {
            return res
        }).catch((err) => {
            Validator.error.push(defaultMessageConnect)
        })
}


var Validator = {
    // validate data
    isMail: (value, errMessage) => {
        if (constructor(value, errMessage)) {
            if (regExpConfig.isMail.test(value)) {
                return true
            }
            else {
                Validator.error.push(defaultMessage)
                return false
            }
        }
        else {
            return false
        }
    },
    isAlpha: (value, errMessage) => {
        if (constructor(value, errMessage)) {
            if (regExpConfig.isAlpha.test(value)) {
                return true
            }
            Validator.error.push(defaultMessage)
            return false
        }
    },
    isNumAlpha: (value, errMessage) => {
        if (constructor(value, errMessage)) {

            if (regExpConfig.isNumAlpha.test(value)) {
                return true
            }
            Validator.error.push(defaultMessage)
            return false
        }
    },
    isDate: (value, errMessage) => {
        if (constructor(value, errMessage)) {

            if (regExpConfig.isDate.test(value)) {
                return true
            }
            Validator.error.push(defaultMessage)
            return false
        }
    },
    isPass: (value, errMessage) => {
        if (constructor(value, errMessage)) {
            if (regExpConfig.password.test(value))
                return true
            else {
                Validator.error.push(defaultMessage)
                return false
            }
        }
        return false
    },
    isInt: (value, errMessage) => {
        if (constructor(value, errMessage)) {
            if (regExpConfig.isInt.test(value))
                return true
        }
        else {
            Validator.error.push(defaultMessage)
            return false
        }

    },
    Name: (value, errMessage) => {
        if (constructor(value, errMessage)) {
            if (regExpConfig.Name.test(value))
                return true
        }
        else {
            Validator.error.push(defaultMessage)
            return false
        }
    },
    isNum: (value, errMessage) => {
        if (constructor(value, errMessage)) {
            if (regExpConfig.isNum.test(value))
                return true
            else {
                Validator.error.push(defaultMessage)
                return false
            }
        }
        return false
    },
    // validate database 
    db: {
        unique: async (table, column, value, errMessage) => {
            defaultMessageUnique = errMessage
            var is_valid = await knex(table).where(column, value)
                .then((res) => {
                    if (res.length > 0) {
                        Validator.error.push(defaultMessageUnique)
                        return false
                    } else {
                        return true
                    }
                }).catch((err) => {
                    Validator.error.push(err)
                })
            return is_valid
        },
        uniqueIgrone: async (table, column, value, errMessage) => {
            defaultMessageUnique = errMessage
            var is_valid = await knex(table).where(column, value).andWhereNot(column, value)
                .then((res) => {
                    if (res.length > 0) {
                        return false
                    } else {
                        return true
                    }
                }).catch((err) => {
                    Validator.error.push(err)
                })

            return is_valid
        }
    },
    error: [],
    getError: () => {
        var listError = [];
        listError = Validator.error;
        Validator.error = []
        defaultMessage = 'Không đúng định dạng !'
        defaultMessageUnique = 'Đã tồn tại!'
        return listError
    }
}

module.exports = Validator
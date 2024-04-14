const dao = require("../../database/register/register_dao");
const bcrypt = require("bcrypt");

const check = {
    id_check: async (userId) => {
        let result;
        data = await dao.check.id_check(userId);
        if (data === undefined) {
            result = 1;
        }else{
            result = 0;
        }
        return result;
    },
    nickname_check: async (userNickname) => {
        let result;
        data = await dao.check.nickname_check(userNickname);
        //console.log(data);
        if (data == undefined) {
            result = 1;
        }else{
            result = 0;
        }
        return result;
    },
    email_check: async (userEmail) => {
        let result;
        data = await dao.check.email_check(userEmail);
        if (data == undefined){
            result = 1;
        }else{
            result = 0;
        }
        return result;
    }
}

module.exports = { check };
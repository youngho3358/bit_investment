const dao = require("../../database/wallet/wallet_dao");
const bcrypt = require("bcrypt");

const get = {
    have_KRW : async(member_id) => {
        let result = await dao.get.have_KRW(member_id);
        return result.rows[0];
    }
}

module.exports = {get}
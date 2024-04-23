const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const get = {
    have_KRW : async (member_id) => {
        const con = await oracledb.getConnection(dbConfig);
        let result = await con.execute(`select money from member where member_id='${member_id}'`);
        return result;
    }
}

module.exports = {get}
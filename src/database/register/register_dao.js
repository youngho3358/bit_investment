const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const check = {
    id_check : async (userId) => {
        const con = await oracledb.getConnection(dbConfig);
        let result = await con.execute(`select * from member where id='${userId}'`);
        return result.rows[0];
    }
}
module.exports = {check}
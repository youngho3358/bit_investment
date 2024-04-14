const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const check = {
    id_check : async (userId) => {
        const con = await oracledb.getConnection(dbConfig);
        let result = await con.execute(`select * from member where id='${userId}'`);
        console.log(result.rows[0]);
        return result.rows[0];
    },
    nickname_check : async (userNickname) => {
        const con = await oracledb.getConnection(dbConfig);
        let result = await con.execute(`select * from member where nickname='${userNickname}'`);
        return result.rows[0];
    },
    email_check : async (userEmail) => {
        const con = await oracledb.getConnection(dbConfig);
        let result = await con.execute(`select * from member where email='${userEmail}'`);
        //console.log(result.rows[0]);
        return result.rows[0];
    }
}
module.exports = {check}
const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const memberCheck = {
    loginCheck : async (id) => {
        const con = await oracledb.getConnection(dbConfig);
        let result = await con.execute(`select * from member where id='${id}'`);
        return result.rows[0];
    }
}

const duplicationCheck = {
    nicknameCheck : async (nickname) => {
        const con = await oracledb.getConnection(dbConfig);
        let result = await con.execute(`select * from member where nickname='${nickname}'`);
        return result.rows[0];
    },
    emailCheck : async (email) => {
        const con = await oracledb.getConnection(dbConfig);
        let result = await con.execute(`select * from member where email='${email}'`);
        return result.rows[0];
    }
}

const register = {
    kakaoRegister : async (email, nickname) => {
        const con = await oracledb.getConnection(dbConfig);
        let result = await con.execute(`insert into member(email, nickname, grade, login_type) values ('${email}', '${nickname}', 1, 1)`);
        return result;
    }
}

module.exports = {memberCheck, duplicationCheck, register}
const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;
const bcrypt = require("bcrypt");

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
        return result.rows[0];
    },
    register_check: async (userInfo) => {
        const con = await oracledb.getConnection(dbConfig);
        userInfo.pwd = bcrypt.hashSync(userInfo.pwd, 10);
        let result = await con.execute(`insert into member(email, name, age, phone, nickname, grade, login_type, id, password) values('${userInfo.email}', '${userInfo.name}', ${userInfo.age}, '${userInfo.phone}', '${userInfo.nickname}', ${userInfo.grade}, ${userInfo.loginType}, '${userInfo.id}', '${userInfo.pwd}')`);
        return result.rowsAffected;
    },
    test: async (code) => {
        console.log("받아온 값 : ", code);
    }
}
module.exports = {check}
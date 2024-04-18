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
    },
    changeNickname : async (changeNickname, originNickname) => {
        const con = await oracledb.getConnection(dbConfig);
        let result = await con.execute(`update member set nickname='${changeNickname}' where nickname='${originNickname}'`);
        // 성공 시 1 반환, 실패 시 promise 반환
        return result.rowsAffected;
    },
    changePhone : async (changePhone, memberId) => {
        const con = await oracledb.getConnection(dbConfig);
        let result = await con.execute(`update member set phone='${changePhone}' where member_id='${memberId}'`);
        // 성공 시 1 반환, 실패 시 promise 반환
        return result.rowsAffected;
    },
    changeEmail : async (changeEmail, memberId) => {
        const con = await oracledb.getConnection(dbConfig);
        let result = await con.execute(`update member set email='${changeEmail}' where member_id='${memberId}'`);
        // 성공 시 1 반환, 실패 시 promise 반환
        return result.rowsAffected;
    }
}

const deleteMember = {
    deleteMember : async (member_id) => {
        const con = await oracledb.getConnection(dbConfig);
        let result = await con.execute(`delete from member where member_id='${member_id}'`);
        // 성공 시 1 반환, 실패 시 promise 반환
        return result.rowsAffected;
    }
}

module.exports = {memberCheck, duplicationCheck, register, deleteMember}
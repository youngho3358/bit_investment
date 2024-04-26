const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

let pool;

async function initialize() {
    try {
        pool = await oracledb.createPool(dbConfig);
        console.log("Connection pool 생성됨");
    } catch (error) {
        console.error("Connection pool 생성 중 오류:", error);
    }
}

initialize();

const memberCheck = {
    loginCheck : async (id) => {
        let connection;
        try{
            connection = await pool.getConnection();
            let result = await connection.execute(`select * from member where id='${id}'`);
            await connection.close();
            return result.rows[0];
        }catch(err){
            console.log(err)
        }
    }
}

const duplicationCheck = {
    nicknameCheck : async (nickname) => {
        let connection;
        try{
            connection = await pool.getConnection();
            let result = await connection.execute(`select * from member where nickname='${nickname}'`);
            await connection.close();
            return result.rows[0];
        }catch(err){
            console.log(err);
        }
    },
    emailCheck : async (email) => {
        let connection;
        try{
            connection = await pool.getConnection();
            let result = await connection.execute(`select * from member where email='${email}'`);
            await connection.close();
            return result.rows[0];
        }catch(err){
            console.log(err)
        }
    }
}

const register = {
    kakaoRegister : async (email, nickname) => {
        let connection;
        try{
            connection = await pool.getConnection();
            let result = await connection.execute(`insert into member(email, nickname, grade, login_type) values ('${email}', '${nickname}', 1, 1)`);
            let member = await connection.execute(`select * from member where email='${email}'`);
            let member_id = member.rows[0].MEMBER_ID;
            // member_account 생성
            let member_account = await connection.execute(`insert into member_account(member_id) values ('${member_id}')`);
            await connection.close();
            return result;
        }catch(err){
            console.log(err);
        }
    },
    changeNickname : async (changeNickname, originNickname) => {
        let connection;
        try{
            connection = await pool.getConnection();
            let result = await connection.execute(`update member set nickname='${changeNickname}' where nickname='${originNickname}'`);
            await connection.close();
            // 성공 시 1 반환, 실패 시 promise 반환
            return result.rowsAffected;
        }catch(err){
            console.log(err);
        }
    },
    changePhone : async (changePhone, memberId) => {
        let connection;
        try{
            connection = await pool.getConnection();
            let result = await connection.execute(`update member set phone='${changePhone}' where member_id='${memberId}'`);
            await connection.close();
            // 성공 시 1 반환, 실패 시 promise 반환
            return result.rowsAffected;
        }catch(err){
            console.log(err)
        }
    },
    changeEmail : async (changeEmail, memberId) => {
        let connection;
        try{
            connection = await pool.getConnection();
            let result = await connection.execute(`update member set email='${changeEmail}' where member_id='${memberId}'`);
            await connection.close();
            // 성공 시 1 반환, 실패 시 promise 반환
            return result.rowsAffected;
        }catch(err){
            console.log(err)
        }
    },
    changePwd : async (id, email, bcryptPwd) => {
        let connection;
        try{
            connection = await pool.getConnection();
            let result = await connection.execute(`update member set password='${bcryptPwd}' where id='${id}' and email='${email}'`);
            await connection.close();
            return result.rowsAffected;
        }catch(err){
            console.log(err);
        }
    },
    changePassword : async (member_id, bcrypt_changePwd) => {
        let connection;
        try{
            connection = await pool.getConnection();
            let result = await connection.execute(`update member set password='${bcrypt_changePwd}' where member_id='${member_id}'`);
            await connection.close();
            return result.rowsAffected;
        }catch(err){
            console.log(err);
        }
    }
}

const deleteMember = {
    deleteMember : async (member_id) => {
        let connection;
        try{
            connection = await pool.getConnection();
            let result = await connection.execute(`delete from member where member_id='${member_id}'`);
            await connection.close();
            // 성공 시 1 반환, 실패 시 promise 반환
            return result.rowsAffected;
        }catch(err){
            console.log(err);
        }
    }
}

const find = {
    id : async (email) => {
        let connection;
        try{
            connection = await pool.getConnection();
            let result = await connection.execute(`select id from member where email='${email}'`);
            await connection.close();
            return result.rows[0];
        }catch(err){
            console.log(err);
        }
    },
    pwd : async (id, email) => {
        let connection;
        try{
            connection = await pool.getConnection();
            let result = await connection.execute(`select password from member where email='${email}' and id='${id}'`);
            await connection.close();
            return result.rows[0];
        }catch(err){
            console.log(err);
        }
    },
    member_id : async (id, email) => {
        let connection;
        try{
            connection = await pool.getConnection();
            let result = await connection.execute(`select member_id from member where email='${email}' and id='${id}'`);
            await connection.close();
            return result.rows[0];
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = {memberCheck, duplicationCheck, register, deleteMember, find}
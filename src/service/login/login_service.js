const dao = require("../../database/login/login_dao");
const bcrypt = require("bcrypt");

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
}

const memberCheck = {
    loginCheck : async (body) => {
        // id가 일치하는 정보가 db에 있다면 data에 해당 행이 담김
        let data;
        data = await dao.memberCheck.loginCheck(body.userId);

        // DB에서 넘어온 비밀번호 값이 암호화 되어있기 때문에, 해당 값이랑 비교 후
        // 비밀번호가 일치하면 result가 true로 반환, 일치하지 않으면 result가 false로 반환
        let result;
        if(data !== undefined){
            result = bcrypt.compareSync(body.userPwd, data.PASSWORD);
        }

        if(result){
            // 로그인 성공 시 db의 행을 return
            return data;
        }
        // 로그인 실패 시 undefined를 return
        return undefined;
    }
}

const duplicationCheck = {
    nicknameCheck : async (nickname) => {
        let result = await dao.duplicationCheck.nicknameCheck(nickname);
        if(result){
            // 동일한 닉네임이 있다면 1 반환
            result = 1;
            return result;
        }
        // 동일한 닉네임이 없다면 0 반환
        result = 0;
        return result;
    },
    emailCheck : async (email) => {
        let result = await dao.duplicationCheck.emailCheck(email);
        if(result === undefined){
            result = 0;
        }
        return result;
    },
}

const register = {
    kakaoRegister : async (email, nickname) => {
        let result = await dao.register.kakaoRegister(email, nickname);
        return result;
    },
    changeNickname : async (changeNickname, originNickname) => {
        let result = await dao.register.changeNickname(changeNickname, originNickname);
        // 성공 시 1 반환, 실패 시 promise 반환
        return result;
    },
    changePhone : async (changePhone, memberId) => {
        let result = await dao.register.changePhone(changePhone, memberId);
        // 성공 시 1 반환, 실패 시 promise 반환
        return result;
    },
    changeEmail : async (changeEmail, memberId) => {
        let result = await dao.register.changeEmail(changeEmail, memberId);
        // 성공 시 1 반환, 실패 시 promise 반환
        return result;
    },
    changePassword : async (member_id, changePwd) => {
        let bcrypt_changePwd = bcrypt.hashSync(changePwd, 10);
        let result = await dao.register.changePassword(member_id, bcrypt_changePwd);
        // 성공 시 1 반환, 실패 시 promise 반환
        return result;
    }
}

const deleteMember = {
    deleteMember : async (member_id) => {
        let result = await dao.deleteMember.deleteMember(member_id);
        // 성공 시 1 반환, 실패 시 promise 반환
        return result;
    }
}

const find = {
    id : async (email) => {
        let result = await dao.find.id(email);
        if(result === undefined){
            // 아이디 없으면 0 반환
            return 0;
        }else if(result.ID === null){
            return 1;
        }else{
            return result.ID;
        }
    },
    pwd : async (id, email) => {
        let result = await dao.find.pwd(id, email);
        if(result === undefined){
            return 0;
        }else{
            let randomPwd = generateRandomString(10);
            let bcryptPwd = bcrypt.hashSync(randomPwd, 10);

            let result = await dao.register.changePwd(id, email, bcryptPwd);
            if(result === 1){
                return randomPwd;
            }else{
                return 1;
            }
        }
    }
}

module.exports = {memberCheck, duplicationCheck, register, deleteMember, find}
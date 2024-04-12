const dao = require("../../database/login/login_dao");
const bcrypt = require("bcrypt");

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
    }
}

const register = {
    kakaoRegister : async (email, nickname) => {
        let result = await dao.register.kakaoRegister(email, nickname);
        return result;
    }
}

module.exports = {memberCheck, duplicationCheck, register}
const dao = require("../../database/board_write/bw_dao");

const sessionCheck = (session) => {
    if( !session || !session.id ){
        msg = "로그인이 필요합니다";
        url = "/login";
        return getMessage(msg);
    }
    return 0;
}

module.exports = {sessionCheck}
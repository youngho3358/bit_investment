const service = require("../../service/wallet/wallet_service")
const fs = require("fs");
const path = require("path");


// 흰 로고
const whitelogoPath = "../../../img/logo/banner_logo.png";
const whitelogoBase64 = fs.readFileSync(path.join(__dirname, whitelogoPath), 'base64');
const whitelogo = `data:image/jpeg;base64,${whitelogoBase64}`;

// 로고 이미지 사용
const blacklogoPath = "../../../img/logo/logo.png";
const blacklogoBase64 = fs.readFileSync(path.join(__dirname, blacklogoPath), 'base64');
const blacklogo = `data:image/jpeg;base64,${blacklogoBase64}`;

const views = {
    wallet_main : async (req, res) => {
        // if(req.session.member){
            let member = req.session.member;
            let have_coin_num = await service.get.have_coin_num(member.member_id);
            let each_coin_had_cost = await service.get.each_coin_had_cost(member.member_id);
        //     res.render("./wallet/wallet_main", {member, whitelogo, blacklogo});
        // }else{
        //     res.send(`<script>
        //                 alert("로그인 정보가 없습니다.");
        //                 location.href = "/";
        //                 </script>`);
        //     return;
        // }

        res.render("./wallet/wallet_main", {member, whitelogo, blacklogo, have_coin_num, each_coin_had_cost});
    },
    income : (req, res) => {
        // if(req.session.member){
        //     let member = req.session.member;
        //     res.render("./wallet/wallet_main", {member, whitelogo, blacklogo});
        // }else{
        //     res.send(`<script>
        //                 alert("로그인 정보가 없습니다.");
        //                 location.href = "/";
        //                 </script>`);
        //     return;
        // }

        res.render("./wallet/income", {whitelogo, blacklogo});
    },
    wait_order : (req, res) => {
        // if(req.session.member){
        //     let member = req.session.member;
        //     res.render("./wallet/wallet_main", {member, whitelogo, blacklogo});
        // }else{
        //     res.send(`<script>
        //                 alert("로그인 정보가 없습니다.");
        //                 location.href = "/";
        //                 </script>`);
        //     return;
        // }

        res.render("./wallet/wait_order", {whitelogo, blacklogo});
    },
    trade_list : (req, res) => {
        // if(req.session.member){
        //     let member = req.session.member;
        //     res.render("./wallet/wallet_main", {member, whitelogo, blacklogo});
        // }else{
        //     res.send(`<script>
        //                 alert("로그인 정보가 없습니다.");
        //                 location.href = "/";
        //                 </script>`);
        //     return;
        // }

        res.render("./wallet/trade_list", {whitelogo, blacklogo});
    }
}

const process = {
    // 보유 KRW 구하기
    have_KRW : async (req, res) => {
        let member_id = req.session.member.member_id;
        let result = await service.get.have_KRW(member_id);
        res.json(result);
    },

    // 총 매수 금액 구하기
    total_buy_coin_cost : async (req, res) => {
        let member_id = req.session.member.member_id;
        let result = await service.get.total_buy_coin_cost(member_id);
        res.json(result);
    },
    
    // 총 평가 금액 구하기
    total_buy_coin_result_cost : async (req, res) => {
        try{
            let member_id = req.session.member.member_id;
            let result = await service.get.total_buy_coin_result_cost(member_id);
            res.json(result);
        }catch(err){
            console.log(err);
            res.json(0);
        }
    },

    // 요청온 코인의 현재 가격 구하기
    now_coin_cost : async (req, res) => {
        let result = await service.get.each_now_coin_cost(req.body.coin);
        res.json(result);
    }
}

module.exports = {views, process};
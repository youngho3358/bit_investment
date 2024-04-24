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
    wallet_main : (req, res) => {
        // if(req.session.member){
            let member = req.session.member;
        //     res.render("./wallet/wallet_main", {member, whitelogo, blacklogo});
        // }else{
        //     res.send(`<script>
        //                 alert("로그인 정보가 없습니다.");
        //                 location.href = "/";
        //                 </script>`);
        //     return;
        // }

        res.render("./wallet/wallet_main", {member, whitelogo, blacklogo});
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
    }
}

module.exports = {views, process};
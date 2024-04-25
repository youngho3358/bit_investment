module.exports = (app) => {
    const router = require("express").Router();
    const walletCtrl = require("../../controller/wallet/wallet_controller");

    // 내 코인 클릭
    router.get("/", walletCtrl.views.wallet_main);
    router.get("/income", walletCtrl.views.income);
    router.get("/wait_order", walletCtrl.views.wait_order);
    router.get("/trade_list", walletCtrl.views.trade_list);

    // 현재 보유 KRW 확인
    router.post("/have_KRW", walletCtrl.process.have_KRW);

    // 총 매수 금액 확인
    router.post("/total_buy_coin_cost", walletCtrl.process.total_buy_coin_cost);

    // 총 평가 금액 확인
    router.post("/total_buy_coin_result_cost", walletCtrl.process.total_buy_coin_result_cost);

    // 요청 코인 당 현재 가격 반환
    router.post("/now_coin_cost", walletCtrl.process.now_coin_cost)

    return router;
}
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

    return router;
}
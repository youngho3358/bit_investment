module.exports = (app) => {
    const router = require("express").Router();
    const marketCtrl = require("../../controller/market/market_controller");

    router.get("/", marketCtrl.views.market_form);
    router.post("/coin_list", marketCtrl.views.market_coin_list);
    router.get("/:coin_name", marketCtrl.views.market_form);

    return router;
}
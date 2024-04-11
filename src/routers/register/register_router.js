module.exports = (app) => {
    const router = require("express").Router();
    const registerCtrl = require("../../controller/register/register_controller");

    router.get("/", registerCtrl.views.register_input);

    return router;
}
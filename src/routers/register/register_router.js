module.exports = (app) => {
    const router = require("express").Router();
    const registerCtrl = require("../../controller/register/register_controller");

    router.get("/", registerCtrl.views.register_input);
    router.post("/registerCheck", registerCtrl.process.register_check)
    router.post("/idCheck", registerCtrl.process.id_check);

    return router;
}
const router = require("express").Router();
const bmCtrl = require("../../controller/board_main/bm_controller");

router.get("/", bmCtrl.bm_input)
router.get("/board", bmCtrl.bm_input);

module.exports = router;
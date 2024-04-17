const router = require("express").Router();
const bmCtrl = require("../../controller/board_main/bm_controller");


router.get("/", bmCtrl.bm_input);
router.get("/free", bmCtrl.board_views.bm_free);
router.get("/news", bmCtrl.board_views.bm_news);
router.get("/notice", bmCtrl.board_views.bm_notice);
router.get("/data/:num", bmCtrl.board_views.data);
module.exports = router;
const router = require("express").Router();
const bmCtrl = require("../../controller/board_main/bm_controller");


router.get("/", bmCtrl.bm_input);
router.get("/free", bmCtrl.board_views.bm_free);
router.get("/news", bmCtrl.board_views.bm_news);
router.get("/notice", bmCtrl.board_views.bm_notice);
router.get("/data/:num", bmCtrl.board_views.data);
router.get("/replyData/:groupNum",bmCtrl.board_views.rep_views);
// router.post("/rep_register", bmCtrl.board_views.rep_register);
module.exports = router;
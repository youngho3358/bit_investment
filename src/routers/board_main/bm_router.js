const router = require("express").Router();
const bmCtrl = require("../../controller/board_main/bm_controller");
const { boardDelete } = require("../../service/board_write/bw_service");


router.get("/", bmCtrl.bm_input);
// router.get("/free", bmCtrl.board_views.bm_free);
// router.get("/news", bmCtrl.board_views.news);
router.get("/notice", bmCtrl.board_views.bm_notice);
router.get("/data/:num", bmCtrl.board_views.data);
 router.get("/data/:BOARD_ID", bmCtrl.board_views.getPost);
router.get("/:category_id", bmCtrl.board_views.category_id); 
// router.get("/replyData/:groupNum",bmCtrl.rep_views.replyData);
router.get("/search", bmCtrl.board_views.search);
// router.post("/rep_register", bmCtrl.board_views.rep_register);
module.exports = router;
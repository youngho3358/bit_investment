const router = require("express").Router();
const boardCtrl = require("../../controller/board/board_controller");
const bwCtrl = require("../../controller/board_write/bw_controller")

router.get("/list", boardCtrl.board_views.list);
router.get("/write_form", bwCtrl.board_views.writeForm)

module.exports = router;
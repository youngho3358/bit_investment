const router = require("express").Router();
const boardCtrl = require("../../controller/board/board_controller");
const bwCtrl = require("../../controller/board_write/bw_controller")

router.get("/list", boardCtrl.board_views.list);
router.get("/write_form", bwCtrl.board_views.writeForm)

const upload = require("../../../config/file/file_config")
router.post("/write" , upload.single("img")
    , bwCtrl.board_Insert.write);


module.exports = router;
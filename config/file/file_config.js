const multer = require("multer");

const stg = multer.diskStorage({
    destination : ( req , file, cb ) => {
        cb(null,  "upload_file")
    },
    filename : ( req, file, cb) => {
        cb(null, Date.now()+"-"+file.originalname );
    },
    limits : { fileSize : 5 * 1024 * 1024 }, 
})



const f_filter = (req, file, cb)=>{
    const type = file.mimetype.split("/");
    if( type[0] == "image" ){
        cb(null, true);
    }else{
        req.fileValidation = "이미지 확장자만 가능합니다";
        cb(null, false);
    }
}
const upload = multer({storage : stg, fileFilter : f_filter })
module.exports = upload;
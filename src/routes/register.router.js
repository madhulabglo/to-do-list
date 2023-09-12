const express = require('express')
const router = express.Router()
const multer = require('multer');
const path = require('path');


const registerController = require("../controllers/register.controllers")

router.use(express.static("public"))
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../public/images'),(error,success)=>{
        if (error) throw error
      });
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-'+file.originalname;
      cb(null, uniqueSuffix ,(error1,success1)=>{
        if(error1) throw error1
      });
    },
  });
  
  const upload = multer({ storage: storage });

router.post('/register', upload.single('image'), registerController.Register);
router.post(`/login`,registerController.login)

module.exports = router

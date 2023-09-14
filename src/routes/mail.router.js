const express = require('express')
const router = express.Router()

const mailController = require("../controllers/sendemail.controllers")

router.post(`/sendmail`,mailController.EmailSender)

module.exports = router
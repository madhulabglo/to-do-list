const express = require("express");
const router = express.Router();
const todolistController = require("../controllers/todolist.controllers");

const {authenticateToken} = require("../middleware/tokenverify")


router.post(`/create`,authenticateToken, todolistController.createTask);

router.get(`/alllist`,authenticateToken, todolistController.getAllTasks);

router.get(`/alllist/:id/`,authenticateToken, todolistController.getIntidualTask);

router.put(`/alllist/:id/`,authenticateToken,todolistController.updateTask);

router.delete(`/alllist/:id/`,authenticateToken,todolistController.deleteTask);

module.exports = router;

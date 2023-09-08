const express = require("express");
const router = express.Router();
const todolistController = require("../controllers/todolist.controllers");

router.post(`/create`, todolistController.createTask);

router.get(`/alllist`, todolistController.getAllTasks);

router.get(`/alllist/:id/`, todolistController.getIntidualTask);

router.put(`/alllist/:id/`, todolistController.updateTask);

router.delete(`/alllist/:id/`, todolistController.deleteTask);

module.exports = router;

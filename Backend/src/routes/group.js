const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");

router.get("/", groupController.getAllGroups);
router.post("/", groupController.createGroup);
router.delete("/:groupName", groupController.deleteGroup);

module.exports = router;
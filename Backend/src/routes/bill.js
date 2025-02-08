const express = require("express");
const router = express.Router();
const billController = require("../controllers/billController");

router.get("/", billController.getAllBills);
router.post("/", billController.createBill);
router.delete("/:billType", billController.deleteBill);

module.exports = router;
const express = require("express");
const router = express.Router();
const calcController = require("../controllers/calcController");
const { verifyToken } = require("../middleware/auth");
router.post("/calculate", verifyToken, calcController.calculate);

module.exports = router;

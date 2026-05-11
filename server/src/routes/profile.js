const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const { verifyToken } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/avatars/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "avatar-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
router.use(verifyToken);
router.get("/", profileController.getProfile);
router.put("/stats", profileController.updateStats);
router.delete("/", profileController.deleteAccount);
router.post("/avatar", upload.single("avatar"), profileController.uploadAvatar);

module.exports = router;

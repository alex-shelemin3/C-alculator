const User = require("../models/User");
function getProfile(req, res) {
  try {
    const user = User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "Користувач не знайдений" });
    }
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      birth: user.birth,
      regDate: user.regDate,
      clickCount: user.clickCount,
      maxNumber: user.maxNumber,
      avatarUrl: user.avatarUrl,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Помилка під час отримання профілю" });
  }
}
function updateStats(req, res) {
  try {
    const { clickCount, maxNumber } = req.body;
    const updatedUser = User.updateStats(req.user.id, clickCount, maxNumber);
    if (!updatedUser) {
      return res.status(404).json({ error: "Користувач не знайдений" });
    }
    res.json({
      message: "Статистика оновлена",
      user: {
        id: updatedUser.id,
        clickCount: updatedUser.clickCount,
        maxNumber: updatedUser.maxNumber,
      },
    });
  } catch (error) {
    console.error("Update stats error:", error);
    res.status(500).json({ error: "Помилка при оновленні статистики" });
  }
}
function deleteAccount(req, res) {
  try {
    const userId = req.user.id;

    User.deleteUser(userId);

    res.json({
      message: "Акаунт видалено",
    });
  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({ error: "Помилка при видаленні акаунту" });
  }
}

function uploadAvatar(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Файл не обрано" });
    }
    const avatarUrl = `http://localhost:3000/uploads/avatars/${req.file.filename}`;
    const updatedUser = User.updateAvatar(req.user.id, avatarUrl);
    if (!updatedUser) {
      return res.status(404).json({ error: "Користувач не знайдений" });
    }
    res.json({
      message: "Фото профілю оновлено",
      avatarUrl: updatedUser.avatarUrl,
    });
  } catch (error) {
    console.error("Upload avatar error:", error);
    res.status(500).json({ error: "Помилка при завантаженні фото" });
  }
}

module.exports = {
  getProfile,
  updateStats,
  deleteAccount,
  uploadAvatar,
};

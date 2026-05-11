// ============================================================
// 📍 ROUTES - Маршрути історії
// ============================================================
// GET /api/history - отримати історію обчислень користувача
// ============================================================

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

// ОТРИМАННЯ ІСТОРІЇ: GET /api/history
router.get('/', verifyToken, (req, res) => {
  // На цей момент історія зберігається в профілі користувача
  // В майбутньому можна зберігати у окремій БД (history.json)
  res.json({
    message: 'Історія обчислень поки не реалізована',
    userId: req.user.id
  });
});

module.exports = router;

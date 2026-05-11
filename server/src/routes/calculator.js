// ============================================================
// 📍 ROUTES - Маршрути калькулятора
// ============================================================
// POST /api/calc/calculate - обчислити вираз
// ============================================================

const express = require('express');
const router = express.Router();
const calcController = require('../controllers/calcController');
const { verifyToken } = require('../middleware/auth');

// ОБЧИСЛЕННЯ: POST /api/calc/calculate
// Потребує авторизації
router.post('/calculate', verifyToken, calcController.calculate);

module.exports = router;

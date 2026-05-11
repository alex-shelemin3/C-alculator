const User = require("../models/User");
const { generateToken } = require("../middleware/auth");
const { validateRegistration, validateLogin } = require("../utils/validator");
const bcrypt = require("bcryptjs");
async function register(req, res) {
  try {
    const { name, email, gender, birth, password, confirm } = req.body;
    const validation = validateRegistration({
      name,
      email,
      gender,
      birth,
      password,
      confirm,
    });
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }
    if (User.findByEmail(email)) {
      return res
        .status(409)
        .json({ error: "Користувач з цим email вже існує" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      gender,
      birth,
      password: hashedPassword,
      clickCount: 0,
      maxNumber: 0,
      regDate: new Date().toLocaleDateString("uk-UA"),
    };
    const savedUser = User.saveUser(newUser);
    const token = generateToken(savedUser);
    res.status(201).json({
      message: "Реєстрація успішна",
      token,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
        gender: savedUser.gender,
        birth: savedUser.birth,
        regDate: savedUser.regDate,
        clickCount: savedUser.clickCount,
        maxNumber: savedUser.maxNumber,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Помилка під час реєстрації" });
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const validation = validateLogin({ email, password });
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }
    const user = User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Невірний email або пароль" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Невірний email або пароль" });
    }
    const token = generateToken(user);
    res.json({
      message: "Вхід успішний",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        birth: user.birth,
        regDate: user.regDate,
        clickCount: user.clickCount,
        maxNumber: user.maxNumber,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Помилка під час входу" });
  }
}

function verifyTokenEndpoint(req, res) {
  res.json({
    message: "Токен дійсний",
    user: req.user,
  });
}

module.exports = {
  register,
  login,
  verifyTokenEndpoint,
};

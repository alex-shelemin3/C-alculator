function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}
function isValidPassword(password) {
  return password && password.length >= 6;
}
function isValidName(name) {
  return name && name.trim().length >= 2;
}
function isValidBirth(birth) {
  if (!birth) return false;
  const date = new Date(birth);
  return date instanceof Date && !isNaN(date);
}
function isValidGender(gender) {
  return gender === "Чоловіча" || gender === "Жіноча";
}
function validateRegistration(data) {
  const { name, email, gender, birth, password, confirm } = data;

  if (!name || !isValidName(name)) {
    return { valid: false, error: "Ім'я повинно містити щонайменше 2 символи" };
  }

  if (!email || !isValidEmail(email)) {
    return { valid: false, error: "Введіть коректний email" };
  }

  if (!gender || !isValidGender(gender)) {
    return { valid: false, error: "Оберіть стать" };
  }

  if (!birth || !isValidBirth(birth)) {
    return { valid: false, error: "Введіть коректну дату народження" };
  }

  if (!password || !isValidPassword(password)) {
    return { valid: false, error: "Пароль повинен мати щонайменше 6 символів" };
  }

  if (password !== confirm) {
    return { valid: false, error: "Паролі не збігаються" };
  }

  return { valid: true };
}
function validateLogin(data) {
  const { email, password } = data;

  if (!email || !isValidEmail(email)) {
    return { valid: false, error: "Введіть коректний email" };
  }

  if (!password) {
    return { valid: false, error: "Введіть пароль" };
  }

  return { valid: true };
}

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidBirth,
  isValidGender,
  validateRegistration,
  validateLogin,
};

const fs = require("fs");
const path = require("path");
const USERS_FILE = path.join(__dirname, "../../data/users.json");
class User {
  static getAllUsers() {
    try {
      const data = fs.readFileSync(USERS_FILE, "utf-8");
      return JSON.parse(data) || [];
    } catch {
      return [];
    }
  }
  static saveUser(user) {
    const users = User.getAllUsers();
    if (!user.id) {
      user.id = Date.now().toString();
    }
    if (!user.regDate) {
      user.regDate = new Date().toLocaleDateString("uk-UA");
    }
    if (user.clickCount === undefined) {
      user.clickCount = 0;
    }
    if (user.maxNumber === undefined) {
      user.maxNumber = 0;
    }
    users.push(user);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return user;
  }
  static findByEmail(email) {
    const users = User.getAllUsers();
    return users.find((u) => u.email === email) || null;
  }
  static findById(id) {
    const users = User.getAllUsers();
    return users.find((u) => u.id === id) || null;
  }
  static updateUser(id, updates) {
    const users = User.getAllUsers();
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return null;
    }

    users[index] = { ...users[index], ...updates };
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return users[index];
  }
  static deleteUser(id) {
    const users = User.getAllUsers();
    const filtered = users.filter((u) => u.id !== id);
    fs.writeFileSync(USERS_FILE, JSON.stringify(filtered, null, 2));
    return true;
  }
  static updateAvatar(id, avatarUrl) {
    return User.updateUser(id, { avatarUrl });
  }
  static updateStats(id, clickCount, maxNumber) {
    return User.updateUser(id, { clickCount, maxNumber });
  }
}
module.exports = User;

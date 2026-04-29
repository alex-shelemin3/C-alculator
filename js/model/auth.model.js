class AuthModel {
  constructor() {
    this.STORAGE_KEY = "cpp_user";
  }
  saveUser(user) {
    const userWithMeta = {
      ...user,
      regDate: new Date().toLocaleDateString("uk-UA"),
      clickCount: 0,
      maxNumber: 0,
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userWithMeta));
  }
  getUser() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY));
    } catch {
      return null;
    }
  }
  validateCredentials(email, password) {
    const user = this.getUser();
    if (!user) return false;
    return user.email === email && user.password === password;
  }
  updateStats(clickCount, maxNumber) {
    const user = this.getUser();
    if (!user) return;
    user.clickCount = clickCount;
    user.maxNumber = maxNumber;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }
  deleteUser() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

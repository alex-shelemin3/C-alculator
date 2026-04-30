class AuthModel {
  constructor() {
    this.STORAGE_KEY = "cpp_user";
    this.SESSION_KEY = "cpp_session";
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
  getSavedUser() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY));
    } catch {
      return null;
    }
  }
  validateCredentials(email, password) {
    const user = this.getSavedUser();
    if (!user) return false;
    return user.email === email && user.password === password;
  }
  closeSession() {
    localStorage.removeItem(this.SESSION_KEY);
  }
  openSession() {
    localStorage.setItem(this.SESSION_KEY, "true");
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
    localStorage.removeItem(this.SESSION_KEY);
  }
}

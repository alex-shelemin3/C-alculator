class AuthController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  register() {
    const data = this.view.getRegisterFormData();
    if (!data.name) {
      this.view.showError("Введіть ваше ім'я");
      return;
    }
    if (!data.email || !data.email.includes("@")) {
      this.view.showError("Введіть коректний email");
      return;
    }
    if (!data.gender || data.gender === "") {
      this.view.showError("Оберіть стать");
      return;
    }
    if (!data.birth) {
      this.view.showError("Введіть дату народження");
      return;
    }
    if (data.password.length < 6) {
      this.view.showError("Пароль має бути не менше 6 символів");
      return;
    }
    if (data.password !== data.confirm) {
      this.view.showError("Паролі не збігаються");
      return;
    }
    if (!data.agreed) {
      this.view.showError("Погодьтесь з умовами використання");
      return;
    }
    this.model.saveUser({
      name: data.name,
      email: data.email,
      gender: data.gender,
      birth: data.birth,
      password: data.password,
    });
    this.view.showSuccess("Реєстрацію успішно завершено!");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  }
  login() {
    const data = this.view.getLoginFormData();
    if (!data.email || !data.password) {
      this.view.showError("Заповніть всі поля");
      return;
    }

    if (this.model.validateCredentials(data.email, data.password)) {
      this.view.showSuccess("Вхід успішний!");
      setTimeout(() => {
        window.location.href = "profile.html";
      }, 1000);
    } else {
      this.view.showError("Невірний email або пароль");
    }
  }
}
const authModel = new AuthModel();
const authView = new AuthView();
const authController = new AuthController(authModel, authView);
window.registerUser = () => authController.register();
window.loginUser = () => authController.login();

class LoadProfileController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  loadProfile() {
    const isLoggedIn = localStorage.getItem("cpp_session") === "true";
    const user = JSON.parse(localStorage.getItem("cpp_user"));

    if (!isLoggedIn || !user) {
      alert("Спочатку увійдіть у систему!");
      window.location.href = "login.html";
      return;
    }

    this.view.render(user);
  }
  deleteAccount() {
    if (confirm("Ви впевнені, що хочете видалити акаунт?")) {
      this.model.deleteUser();
      window.location.href = "../index.html";
    }
  }
}

const _profileAuthModel = new AuthModel();
const _profileView = new ProfileView();
const profileController = new LoadProfileController(
  _profileAuthModel,
  _profileView,
);
window.loadProfile = () => profileController.loadProfile();
window.deleteAccount = () => profileController.deleteAccount();

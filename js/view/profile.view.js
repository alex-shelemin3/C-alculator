class ProfileView {
  render(user) {
    this._setText("profile-name", user.name ?? "—");
    this._setText("profile-email", user.email ?? "—");
    this._setText("profile-gender", user.gender ?? "—");
    this._setText("profile-birth", user.birth ?? "—");
    this._setText("profile-regdate", user.regDate ?? "—");
    this._setText("profile-clicks", user.clickCount ?? 0);
    this._setText("profile-maxnum", user.maxNumber ?? 0);
    this._setText("name", user.name ?? "—");
    this._setText("email", user.email ?? "—");
    this._setText("gender", user.gender ?? "—");
    this._setText("birth", user.birth ?? "—");
    this._setText("regDate", user.regDate ?? "—");
  }
  _setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }
}

class AuthView {
  showError(message) {
    this._showToast(message, "danger");
  }
  showSuccess(message) {
    this._showToast(message, "success");
  }
  getRegisterFormData() {
    return {
      name: document.getElementById("reg-name")?.value.trim() ?? "",
      email: document.getElementById("reg-email")?.value.trim() ?? "",
      gender: document.getElementById("reg-gender")?.value ?? "",
      birth: document.getElementById("reg-birth")?.value ?? "",
      password: document.getElementById("reg-password")?.value ?? "",
      confirm: document.getElementById("reg-confirm")?.value ?? "",
      agreed: document.getElementById("reg-agree")?.checked ?? false,
    };
  }
  getLoginFormData() {
    return {
      email: document.getElementById("email")?.value.trim() ?? "",
      password: document.getElementById("password")?.value ?? "",
    };
  }
  _showToast(message, type = "info") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.style.cssText =
        "position:fixed;top:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:8px;";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `alert alert-${type} mb-0 shadow`;
    toast.style.cssText = "min-width:260px;animation:fadeInRight 0.3s ease;";
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.4s";
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }
}

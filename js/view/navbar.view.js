(function initNavbar() {
  const isRoot = !window.location.pathname.includes("/pages/");
  const prefix = isRoot ? "pages/" : "";
  document.addEventListener("DOMContentLoaded", () => {
    const user = _getUser();
    _renderAuthNav(user, prefix);
  });
  function _getUser() {
    try {
      return JSON.parse(localStorage.getItem("cpp_user")) || null;
    } catch {
      return null;
    }
  }

  function _renderAuthNav(user, prefix) {
    const navbars = document.querySelectorAll(".navbar-nav.ms-auto");
    if (!navbars.length) return;

    const nav = navbars[0];

    if (user) {
      nav.innerHTML = `
        <li class="nav-item">
          <a class="nav-link" href="${prefix}about.html">Про сайт</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="${prefix}profile.html">
            👤 ${_escapeHtml(user.name)}
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-danger" href="#" onclick="logoutUser(); return false;">
            Вихід
          </a>
        </li>
      `;
    } else {
      nav.innerHTML = `
        <li class="nav-item">
          <a class="nav-link" href="${prefix}about.html">Про сайт</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="${prefix}profile.html">Профіль</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="${prefix}register.html">Реєстрація</a>
        </li>
      `;
    }
    _markActiveLink();
  }
  function _markActiveLink() {
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll(".navbar-nav a.nav-link").forEach((link) => {
      const href = link.getAttribute("href").split("/").pop();
      if (href === currentPage) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
  function _escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
function logoutUser() {
  localStorage.removeItem("cpp_user");
  const isRoot = !window.location.pathname.includes("/pages/");
  window.location.href = isRoot ? "index.html" : "../index.html";
}
function _getUser() {
  const currentEmail = localStorage.getItem("current_user");
  const user = JSON.parse(localStorage.getItem("cpp_user"));

  if (!currentEmail || !user) return null;
  return user.email === currentEmail ? user : null;
}
window.logoutUser = logoutUser;

class CalculatorView {
  constructor() {
    this.displays = document.querySelectorAll(".calc-display");
    this.baseButtons = document.querySelectorAll(".base-btn");
  }
  updateDisplay(value) {
    this.displays.forEach((d) => {
      d.value = value;
    });
  }
  showError() {
    this.displays.forEach((d) => {
      d.value = "Error";
      d.classList.add("text-danger");
      setTimeout(() => d.classList.remove("text-danger"), 800);
    });
  }
  highlightBase(activeBase) {
    this.baseButtons.forEach((btn) => {
      const btnBase = parseInt(btn.dataset.base);
      if (btnBase === activeBase) {
        btn.classList.remove("btn-warning");
        btn.classList.add("btn-primary");
      } else {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-warning");
      }
    });
  }
  switchTab(type) {
    const stndCalc = document.getElementById("stnd-calc");
    const progCalc = document.getElementById("prog-calc");
    const tabStnd = document.getElementById("tab-stnd");
    const tabProg = document.getElementById("tab-prog");

    if (!stndCalc || !progCalc) return;

    if (type === "stnd") {
      stndCalc.style.display = "block";
      progCalc.style.display = "none";
      tabStnd.style.color = "#0091D5";
      tabProg.style.color = "#555";
    } else {
      stndCalc.style.display = "none";
      progCalc.style.display = "block";
      tabStnd.style.color = "#555";
      tabProg.style.color = "#0091D5";
    }
  }
}

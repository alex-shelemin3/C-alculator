class CalculatorController {
  constructor(model, view, authModel) {
    this.model = model;
    this.view = view;
    this.authModel = authModel;
  }
  append(value) {
    this.model.append(value);
    this.view.updateDisplay(this.model.getExpression());
    this._saveStats();
  }
  clear() {
    this.model.clear();
    this.view.updateDisplay("");
  }
  backspace() {
    this.model.backspace();
    this.view.updateDisplay(this.model.getExpression());
  }
  toggleNegative() {
    this.model.toggleNegative();
    this.view.updateDisplay(this.model.getExpression());
  }
  calculate() {
    const { result, error } = this.model.calculate();
    if (error) {
      this.view.showError();
    } else {
      this.view.updateDisplay(result);
    }
    this._saveStats();
  }
  setBase(base) {
    this.model.setBase(base);
    this.view.updateDisplay(this.model.getExpression());
    this.view.highlightBase(base);
  }
  applyNot() {
    this.model.applyNot();
    this.view.updateDisplay(this.model.getExpression());
  }
  appendBitOp(op) {
    if (op === "~") {
      this.applyNot();
      return;
    }
    this.model.appendBitOp(op);
    this.view.updateDisplay(this.model.getExpression());
  }
  switchTab(type) {
    this.model.clear();
    this.view.switchTab(type);
    this.view.updateDisplay("");
    if (type === "stnd") {
      this.model.base = 10;
    }
  }
  _saveStats() {
    if (this.authModel) {
      this.authModel.updateStats(this.model.clickCount, this.model.maxNumber);
    }
  }
}

const calcModel = new CalculatorModel();
const calcView = new CalculatorView();
const _authModelRef = typeof AuthModel !== "undefined" ? new AuthModel() : null;
const calcController = new CalculatorController(
  calcModel,
  calcView,
  _authModelRef,
);
window.append = (v) => calcController.append(v);
window.clearDisplay = () => calcController.clear();
window.backspace = () => calcController.backspace();
window.negative = () => calcController.toggleNegative();
window.calculate = () => calcController.calculate();
window.setBase = (b) => calcController.setBase(b);
window.bitOp = (op) => calcController.appendBitOp(op);
window.showCalc = (t) => calcController.switchTab(t);

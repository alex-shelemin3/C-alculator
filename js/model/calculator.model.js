class CalculatorModel {
  constructor() {
    this.expression = "";
    this.base = 10;
    this.clickCount = 0;
    this.maxNumber = 0;
  }
  append(value) {
    this.clickCount++;

    if (value === "x²") {
      this.expression += "**2";
    } else if (value === "x³") {
      this.expression += "**3";
    } else if (value === "√x") {
      this.expression = "Math.sqrt(" + this.expression + ")";
    } else if (value === "1/x") {
      if (this.expression !== "") {
        this.expression = "1/(" + this.expression + ")";
      }
    } else {
      this.expression += value;
    }
  }
  clear() {
    this.expression = "";
  }
  backspace() {
    this.expression = this.expression.slice(0, -1);
  }
  toggleNegative() {
    if (this.expression.startsWith("-")) {
      this.expression = this.expression.slice(1);
    } else if (this.expression !== "") {
      this.expression = "-" + this.expression;
    }
  }
  calculate() {
    try {
      const expr = this.expression.trim();
      if (expr === "") return { result: "", error: false };

      let result;

      if (this.base !== 10) {
        result = this._calcInBase(expr);
      } else {
        result = this._calcDecimal(expr);
      }
      const numResult = parseFloat(result);
      if (!isNaN(numResult) && Math.abs(numResult) > this.maxNumber) {
        this.maxNumber = Math.abs(numResult);
      }

      this.expression = result;
      return { result, error: false };
    } catch {
      this.expression = "Error";
      return { result: "Error", error: true };
    }
  }
  _calcDecimal(expr) {
    let prepared = expr
      .replace(/Math\.sqrt\(/g, "Math.sqrt(")
      .replace(/√/g, "Math.sqrt(")
      .replace(/\^/g, "**");
    prepared = prepared.replace(/(\d+(?:\.\d+)?)%/g, (_, num) => {
      return "(" + num + "/100)";
    });
    const result = eval(prepared);

    if (result === undefined || result === null) throw new Error("Invalid");
    if (!isFinite(result)) throw new Error("Division by zero");
    return parseFloat(result.toPrecision(10)).toString();
  }
  _calcInBase(expr) {
    const match = expr.match(
      /^([0-9A-Fa-f]+)\s*(<<|>>|[+\-*/|&^%])\s*([0-9A-Fa-f]+)$/,
    );

    if (!match) {
      const single = parseInt(expr, this.base);
      if (isNaN(single)) throw new Error("Invalid");
      return single.toString(this.base).toUpperCase();
    }

    const a = parseInt(match[1], this.base);
    const op = match[2];
    const b = parseInt(match[3], this.base);

    if (isNaN(a) || isNaN(b)) throw new Error("Invalid number for base");

    let result;
    switch (op) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "*":
        result = a * b;
        break;
      case "/":
        if (b === 0) throw new Error("Division by zero");
        result = Math.floor(a / b);
        break;
      case "%":
        result = a % b;
        break;
      case "|":
        result = a | b;
        break;
      case "&":
        result = a & b;
        break;
      case "^":
        result = a ^ b;
        break;
      case "<<":
        result = a << b;
        break;
      case ">>":
        result = a >> b;
        break;
      default:
        throw new Error("Unknown operator");
    }

    return result.toString(this.base).toUpperCase();
  }
  setBase(newBase) {
    if (
      this.expression !== "" &&
      !isNaN(parseInt(this.expression, this.base))
    ) {
      const decimalValue = parseInt(this.expression, this.base);
      this.expression = decimalValue.toString(newBase).toUpperCase();
    }
    this.base = newBase;
  }
  applyNot() {
    const num = parseInt(this.expression, this.base);
    if (isNaN(num)) {
      this.expression = "Error";
      return;
    }
    this.expression = (~num).toString(this.base).toUpperCase();
  }
  appendBitOp(op) {
    this.expression += " " + op + " ";
    this.clickCount++;
  }
  getExpression() {
    return this.expression;
  }
}

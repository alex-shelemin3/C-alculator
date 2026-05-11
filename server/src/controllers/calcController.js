const User = require("../models/User");
function calculate(req, res) {
  try {
    const { expression, base = 10 } = req.body;

    if (!expression) {
      return res.status(400).json({ error: "Вираз не надано" });
    }
    let result;
    try {
      result = evaluateExpression(expression, base);
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Помилка в виразі: " + error.message });
    }
    const user = User.findById(req.user.id);
    if (user) {
      const newMaxNumber = Math.max(
        user.maxNumber,
        Math.abs(parseFloat(result) || 0),
      );
      User.updateStats(req.user.id, (user.clickCount || 0) + 1, newMaxNumber);
    }
    res.json({
      expression,
      result,
      base,
    });
  } catch (error) {
    console.error("Calculate error:", error);
    res.status(500).json({ error: "Помилка при обчисленні" });
  }
}
function evaluateExpression(expr, base) {
  if (base === 10) {
    return evaluateDecimal(expr);
  } else {
    return evaluateBase(expr, base);
  }
}
function evaluateDecimal(expr) {
  let prepared = expr
    .replace(/Math\.sqrt\(/g, "Math.sqrt(")
    .replace(/√/g, "Math.sqrt(")
    .replace(/\^/g, "**");
  prepared = prepared.replace(/(\d+(?:\.\d+)?)%/g, (_, num) => {
    return "(" + num + "/100)";
  });
  const result = eval(prepared);
  if (result === undefined || result === null)
    throw new Error("Invalid expression");
  if (!isFinite(result)) throw new Error("Division by zero or infinity");
  return parseFloat(result.toPrecision(10)).toString();
}
function evaluateBase(expr, base) {
  const match = expr.match(
    /^([0-9A-Fa-f]+)\s*(<<|>>|[+\-*/|&^%])\s*([0-9A-Fa-f]+)$/,
  );
  if (!match) {
    const single = parseInt(expr, base);
    if (isNaN(single)) throw new Error("Invalid number for base " + base);
    return single.toString(base).toUpperCase();
  }
  const a = parseInt(match[1], base);
  const op = match[2];
  const b = parseInt(match[3], base);
  if (isNaN(a) || isNaN(b)) throw new Error("Invalid operands");
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
      throw new Error("Unknown operator: " + op);
  }
  return result.toString(base).toUpperCase();
}
module.exports = {
  calculate,
  evaluateExpression,
};

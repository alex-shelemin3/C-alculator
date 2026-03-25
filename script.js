function showCalc(type) {
  const stnd = document.getElementById("stnd-calc");
  const prog = document.getElementById("prog-calc");
  const tabStnd = document.getElementById("tab-stnd");
  const tabProg = document.getElementById("tab-prog");

  if (type === "stnd") {
    stnd.style.display = "block";
    prog.style.display = "none";
    tabStnd.style.color = "#0091D5";
    tabProg.style.color = "#555";
  } else {
    stnd.style.display = "none";
    prog.style.display = "block";
    tabStnd.style.color = "#555";
    tabProg.style.color = "#0091D5";
  }
}

document
  .getElementById("addRiskForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const activity = document.getElementById("activity").value;
    const kejadian = document.getElementById("kejadian").value;
    const cause = document.getElementById("cause").value;
    const dampak = document.getElementById("dampak").value;

    const newRisk = { activity, kejadian, cause, dampak };
    const risks = JSON.parse(localStorage.getItem("risks")) || [];
    risks.push(newRisk);
    localStorage.setItem("risks", JSON.stringify(risks));

    alert("Risk added successfully!");
    window.location.href = "index.html"; // Redirect to the dashboard
  });

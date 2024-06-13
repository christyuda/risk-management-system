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
document.addEventListener("DOMContentLoaded", function () {
  setupNavigation();
  showDashboard(); // Default view
});
function setupNavigation() {
  const links = document.querySelectorAll("#sidebar a");
  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default link behavior
      const action = link.getAttribute("onclick");
      switch (action) {
        case "showDashboard()":
          showDashboard();
          break;
        case "showAddRisk()":
          showAddRisk();
          break;
        case "showEvents()":
          showEvents();
          break;
        case "showCauses()":
          showCauses();
          break;
        case "showSettings()":
          showSettings();
          break;
      }
    });
  });
}

function showDashboard() {
  // Implementation similar to previously provided, or updated content
  document.getElementById("content").innerHTML =
    "<h1>Dashboard Content Here</h1>";
}

function showAddRisk() {
  window.location.href = "add-risk.html";
}

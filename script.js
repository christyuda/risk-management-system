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

function showDashboard() {
  const risks = JSON.parse(localStorage.getItem("risks")) || [];
  let html = `<h1>Dasbor Manajemen Risiko</h1>
                <table>
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>PROSES/AKTIVITAS</th>
                            <th>KEJADIAN</th>
                            <th>PENYEBAB</th>
                            <th>DAMPAK</th>
                            <th>TIPE RISIKO</th>
                            <th>KATEGORI RISIKO</th>
                            <th>ASPEK</th>
                            <th>LIKELIHOOD</th>
                            <th>SEVERITY</th>
                            <th>LEVEL RISIKO</th>
                        </tr>
                    </thead>
                    <tbody>`;
  risks.forEach((risk, index) => {
    html += `<tr>
                    <td>${index + 1}</td>
                    <td>${risk.activity}</td>
                    <td>${risk.kejadian}</td>
                    <td>${risk.cause}</td>
                    <td>${risk.dampak || "Dynamic"}</td>
                    <td><select id='risk-type-${index}'>
                        <option>Peluang</option>
                        <option>Ancaman</option>
                    </select></td>
                    <td><select id='risk-category-${index}'>
                        <option>Tata Kelola</option>
                        <option>Strategi</option>
                        <option>Operasional</option>
                        <option>Finansial</option>
                        <option>People</option>
                        <option>Regulatori</option>
                    </select></td>
                    <td><select id='aspect-${index}'>
                        <option>Kinerja</option>
                        <option>Keuangan</option>
                        <option>Kerahasiaan Informasi</option>
                        <option>SDM</option>
                    </select></td>
                    <td><select id='likelihood-${index}' onchange='calculateRiskLevel(${index})'>
                        <option>Jarang</option>
                        <option>Kemungkinan Kecil</option>
                        <option>Kemungkinan Sedang</option>
                        <option>Kemungkinan Besar</option>
                        <option>Hampir Pasti</option>
                    </select></td>
                    <td><select id='severity-${index}' onchange='calculateRiskLevel(${index})'>
                        <option>Sangat Kecil</option>
                        <option>Kecil</option>
                        <option>Sedang</option>
                        <option>Berat</option>
                        <option>Sangat Berat</option>
                    </select></td>
                    <td id='risk-level-${index}'>-</td>
                </tr>`;
  });
  html += `</tbody></table>`;
  document.getElementById("content").innerHTML = html;
}

function calculateRiskLevel(index) {
  const likelihood = document.getElementById(`likelihood-${index}`).value;
  const severity = document.getElementById(`severity-${index}`).value;
  const riskLevelCell = document.getElementById(`risk-level-${index}`);

  const riskMatrix = {
    "Hampir Pasti": {
      "Sangat Kecil": "Sedang",
      Kecil: "Tinggi",
      Sedang: "Tinggi",
      Berat: "Ekstrim",
      "Sangat Berat": "Ekstrim",
    },
    "Kemungkinan Besar": {
      "Sangat Kecil": "Sedang",
      Kecil: "Sedang",
      Sedang: "Tinggi",
      Berat: "Ekstrim",
      "Sangat Berat": "Ekstrim",
    },
    "Kemungkinan Sedang": {
      "Sangat Kecil": "Sedang",
      Kecil: "Sedang",
      Sedang: "Tinggi",
      Berat: "Tinggi",
      "Sangat Berat": "Ekstrim",
    },
    "Kemungkinan Kecil": {
      "Sangat Kecil": "Rendah",
      Kecil: "Sedang",
      Sedang: "Sedang",
      Berat: "Tinggi",
      "Sangat Berat": "Ekstrim",
    },
    Jarang: {
      "Sangat Kecil": "Rendah",
      Kecil: "Sedang",
      Sedang: "Sedang",
      Berat: "Tinggi",
      "Sangat Berat": "Ekstrim",
    },
  };

  riskLevelCell.textContent =
    riskMatrix[likelihood][severity] || "Invalid data";
}

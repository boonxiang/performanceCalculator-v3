// Rate table (middle rate only used)
const rateTable = {
    "JB": 96,
    "Austin/Tebrau/Setia Tropika": 93,
    "Kluang/Batu Pahat": 99,
    "Muar/Malacca": 106.5,
    "KL/Selangor": 99
};

const areas = [
    "JB",
    "Austin/Tebrau/Setia Tropika",
    "Kluang/Batu Pahat",
    "Muar/Malacca",
    "KL/Selangor"
];

function calculateMonthlyYield() {
    const solarSize = parseFloat(document.getElementById("solarSizeInput").value);
    const actualYield = parseFloat(document.getElementById("actualYieldInput").value);
    const areaIdx = parseInt(document.getElementById("areaSelect").value);
    const unit = document.getElementById("unitSelect").value;

    const errorDiv = document.getElementById("monthlyYieldError");
    const outputDiv = document.getElementById("monthlyYieldOutput");

    errorDiv.textContent = "";
    outputDiv.textContent = "";

    if (isNaN(solarSize) || solarSize <= 0) {
        errorDiv.textContent = "Please enter a valid solar system size (kW).";
        return;
    }

    if (isNaN(actualYield) || actualYield < 0) {
        errorDiv.textContent = "Please enter a valid actual yield.";
        return;
    }

    const selectedArea = areas[areaIdx];
    const rate = rateTable[selectedArea];
    const estimatedYield = Math.round(solarSize * rate);

    let actualYieldInKwh = unit === "MWh" ? actualYield * 1000 : actualYield;
    let performanceDiff = 100 - (((estimatedYield - actualYieldInKwh) / estimatedYield) * 100);

    // Determine performance rating
    let rating = "";
    let description = "";

    if (performanceDiff >= 90) {
        rating = "🌞 Excellent";
        description = "System is running optimally";
    } else if (performanceDiff >= 80 && performanceDiff < 90) {
        rating = "✅ Good";
        description = "The performance is acceptable";
    } else {
        rating = "🚨 Attention Needed";
        description = "System underperforming — please contact us for assistance";
    }

    const outputUnit = unit;

    outputDiv.innerHTML = `
        <strong>Selected Area:</strong> ${selectedArea}<br>
        <strong>Rate:</strong> ${rate}<br>
        <strong>Estimated Monthly Yield:</strong> ${(estimatedYield / (unit === "MWh" ? 1000 : 1)).toFixed(2)} ${outputUnit}<br>
        <strong>Actual Monthly Yield:</strong> ${actualYield.toFixed(2)} ${outputUnit}<br>
        <strong>Performance Gap:</strong> ${performanceDiff.toFixed(2)}%<br><br>

                <table class="result-table">
                    <thead>
                        <tr>
                            <th>Performance Gap (%)</th>
                            <th>Rating</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="${performanceDiff >= 90 ? 'background-color: #8dccf7ff;' : ''}">
                            <td data-label="Performance Gap (%)">≥ 90%</td>
                            <td data-label="Rating">🌞 Excellent</td>
                            <td data-label="Description">System is running optimally</td>
                        </tr>
                        <tr style="${performanceDiff >= 80 && performanceDiff < 90 ? 'background-color: #b4c8e7ff;' : ''}">
                            <td data-label="Performance Gap (%)">80% - 89%</td>
                            <td data-label="Rating">✅ Good</td>
                            <td data-label="Description">The performance is acceptable</td>
                        </tr>
                        <tr style="${performanceDiff < 80 ? 'background-color: #ff1327ff;' : ''}">
                            <td data-label="Performance Gap (%)">< 79% and below </td>
                            <td data-label="Rating">🚨 Attention Needed</td>
                            <td data-label="Description">System underperforming — please contact us for assistance</td>
                        </tr>
                        <tr>
                            <td colspan="3" data-label="Note"><strong>Please noted that this is used for the average roof angle calculation which is 15° - 35°</strong></td>
                        </tr>
                    </tbody>
                </table>
            `;
}

// Attach listener when DOM loads
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("areaSelect").addEventListener("change", () => {});
});

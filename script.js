// Fluid levels for simulation (3 is too low, 22 is too high, and 5-20 is normal)
const fluidLevels = [3, 5, 7, 8, 10, 12, 14, 16, 18, 20, 22]; 
let currentFluidLevel = 12; // Default fluid level

document.getElementById("simulateButton").addEventListener("click", simulateFluidChange);

// Function to simulate a change in fluid levels
function simulateFluidChange() {
    // Randomly select a new fluid level from the sample array
    currentFluidLevel = fluidLevels[Math.floor(Math.random() * fluidLevels.length)];
    document.getElementById("fluidValue").innerText = currentFluidLevel + " cm";
    
    // Check the fluid level and show appropriate page
    if (currentFluidLevel <= 5 || currentFluidLevel >= 20) {
        // If fluid level is outside normal range, show alert page
        showAlertPage();
    } else {
        // If fluid level is normal, show safe page
        showSafePage();
    }

    // Update the chart with the new value
    updateChart(currentFluidLevel);
}

// Show alert page with the current fluid level
function showAlertPage() {
    document.getElementById("mainPage").style.display = "none";
    document.getElementById("safePage").style.display = "none";
    document.getElementById("alertPage").style.display = "block";

    const alertMessage = `Your current fluid level is ${currentFluidLevel} cm, which is outside the safe range. Please contact your doctor immediately.`;
    document.getElementById("alertPage").querySelector("p").innerText = alertMessage;
}

// Show safe page with the current fluid level
function showSafePage() {
    document.getElementById("mainPage").style.display = "none";
    document.getElementById("alertPage").style.display = "none";
    document.getElementById("safePage").style.display = "block";

    const safeMessage = `Your current fluid level is ${currentFluidLevel} cm, which is within the normal range. Keep monitoring!`;
    document.getElementById("safePage").querySelector("p").innerText = safeMessage;
}

// Go back to the main screen
function goToMain() {
    document.getElementById("mainPage").style.display = "block";
    document.getElementById("safePage").style.display = "none";
    document.getElementById("alertPage").style.display = "none";
}

// Placeholder for contacting doctor
function goToDoctor() {
    alert("Contacting your doctor...");
}

// Chart.js setup for fluid level tracking
const ctx = document.getElementById('fluidGraph').getContext('2d');
let fluidChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // No preset labels, to be dynamically updated
        datasets: [{
            label: 'Amniotic Fluid Level (cm)',
            data: [],
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            fill: true
        }]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Simulation Steps'
                }
            },
            y: {
                beginAtZero: true,
                max: 25,
                title: {
                    display: true,
                    text: 'Fluid Level (cm)'
                }
            }
        }
    }
});

// Update the chart with the new fluid level
function updateChart(newValue) {
    const chartData = fluidChart.data.datasets[0].data;

    // Update data and labels dynamically
    fluidChart.data.labels.push('Step ' + (chartData.length + 1));
    chartData.push(newValue);

    // Set color based on fluid level
    const color = (newValue <= 5 || newValue >= 20) ? 'red' : 'green';
    const backgroundColor = (newValue <= 5 || newValue >= 20) ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 255, 0, 0.2)';

    fluidChart.data.datasets[0].borderColor = color;
    fluidChart.data.datasets[0].backgroundColor = backgroundColor;

    fluidChart.update();
}
    
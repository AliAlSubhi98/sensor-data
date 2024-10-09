const apiUrl = "http://localhost:8080/api/sensors"; // Base API URL

document.addEventListener("DOMContentLoaded", function () {
    fetchSensorData(); // Fetch data on page load

    // Handle form submission for new sensor data
    const form = document.getElementById("sensorDataForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission
        submitSensorData(); // Call function to submit data
    });
});

// Function to poll the server for new data every few seconds
function pollSensorData() {
    // Poll the server every 5 seconds (5000 milliseconds)
    setInterval(() => {
        fetchSensorData();  // Fetch updated sensor data from the server
    }, 5000);
}

// Function to fetch sensor data from the server
async function fetchSensorData() {
    try {
        const response = await fetch(apiUrl + "/all"); // Update this to your actual API endpoint
        const data = await response.json();

        // Update the dashboard with the latest data
        populateTable(data);
        updateSummaryStatistics(data);
        renderBarChart(data);
        renderLineChart(data);
        renderPieChart(data);
    } catch (error) {
        console.error('Error fetching sensor data:', error);
        // Optionally, display an error message in the UI
    }
}

// Initial call to fetch data when the page loads
window.onload = function() {
    fetchSensorData();  // Fetch the initial data
    pollSensorData();   // Start polling for real-time updates
};

async function submitSensorData() {
    const sensorType = document.getElementById("sensorType").value;
    const dataType = document.getElementById("dataType").value;
    const value = parseFloat(document.getElementById("value").value); // Ensure value is a number
    const unit = document.getElementById("unit").value;

    const sensorData = {
        sensorType: sensorType,
        dataType: dataType,
        value: value,
        unit: unit,
        timestamp: new Date().toISOString() // Use the current timestamp
    };

    try {
        const response = await fetch(apiUrl + "/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sensorData) // Send the sensor data as JSON
        });

        if (!response.ok) {
            throw new Error('Failed to submit sensor data: ' + response.statusText);
        }

        const data = await response.json();
        console.log("Sensor data submitted successfully:", data);
        alert("Sensor data submitted successfully!"); // Show success message
        fetchSensorData(); // Refresh the data
        document.getElementById("sensorDataForm").reset(); // Reset the form
    } catch (error) {
        console.error("Error submitting sensor data:", error);
        alert("Error submitting sensor data. Please try again."); // Show error message
    }
}

// Populate the sensor data table with the latest data
function populateTable(data) {
    const tableBody = document.getElementById("sensorDataTable").querySelector("tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    if (data.length === 0) {
        const noDataRow = `<tr><td colspan="5" class="text-center">No data available</td></tr>`;
        tableBody.innerHTML = noDataRow;
        return;
    }

    data.forEach(sensor => {
        const row = `<tr>
                        <td>${sensor.sensorType}</td>
                        <td>${sensor.dataType}</td>
                        <td>${sensor.value}</td>
                        <td>${sensor.unit}</td>
                        <td>${new Date(sensor.timestamp).toLocaleString()}</td>
                     </tr>`;
        tableBody.innerHTML += row; // Add new row to the table
    });
}

// Update summary statistics based on fetched sensor data
function updateSummaryStatistics(data) {
    const avgTemperature = calculateAverage(data, 'temperature');
    const avgHumidity = calculateAverage(data, 'humidity');
    const avgCO2 = calculateAverage(data, 'CO2');
    const avgSmoke = calculateAverage(data, 'smoke');
    const avgPressure = calculateAverage(data, 'pressure');
    const avgDust = calculateAverage(data, 'dust');
    const leakDetected = data.some(sensor => sensor.dataType === 'leak' && sensor.value > 0);

    document.getElementById("avgTemperature").innerText = avgTemperature !== null ? avgTemperature.toFixed(2) : 'N/A';
    document.getElementById("avgHumidity").innerText = avgHumidity !== null ? avgHumidity.toFixed(2) : 'N/A';
    document.getElementById("avgCO2").innerText = avgCO2 !== null ? avgCO2.toFixed(2) : 'N/A';
    document.getElementById("avgSmoke").innerText = avgSmoke !== null ? avgSmoke.toFixed(2) : 'N/A';
    document.getElementById("avgPressure").innerText = avgPressure !== null ? avgPressure.toFixed(2) : 'N/A';
    document.getElementById("avgDust").innerText = avgDust !== null ? avgDust.toFixed(2) : 'N/A';
    document.getElementById("waterLeak").innerText = leakDetected ? 'Yes' : 'No';
    document.getElementById("avgLeak").innerText = leakDetected ? 'Leak Detected' : 'No Leak';
}

// Helper function to calculate the average value for a specific data type
function calculateAverage(data, dataType) {
    const filteredData = data.filter(sensor => sensor.dataType === dataType);
    if (filteredData.length === 0) return null;

    const sum = filteredData.reduce((acc, sensor) => acc + sensor.value, 0);
    return sum / filteredData.length; // Return average
}

// Function to render the temperature and humidity bar chart
function renderBarChart(data) {
    const labels = [];
    const temperatureData = [];
    const humidityData = [];

    data.forEach(sensor => {
        if (sensor.dataType === 'temperature') {
            labels.push(sensor.timestamp);
            temperatureData.push(sensor.value);
        } else if (sensor.dataType === 'humidity') {
            humidityData.push(sensor.value);
        }
    });

    const ctx = document.getElementById('barChartContainer').getContext('2d');
    const barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Temperature',
                    data: temperatureData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Humidity',
                    data: humidityData,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to render the line chart for all sensor data
function renderLineChart(data) {
    const labels = [];
    const datasets = {};

    data.forEach(sensor => {
        const timestamp = new Date(sensor.timestamp).toLocaleString(); // Convert timestamp for better readability
        labels.push(timestamp);

        if (!datasets[sensor.dataType]) {
            datasets[sensor.dataType] = {
                label: sensor.dataType.charAt(0).toUpperCase() + sensor.dataType.slice(1), // Capitalize the label
                data: [],
                fill: false,
                borderColor: getRandomColor(), // Assign a random color for each dataType
                tension: 0.1
            };
        }

        datasets[sensor.dataType].data.push(sensor.value); // Add the value for the respective sensor dataType
    });

    // Convert datasets object to an array
    const datasetsArray = Object.values(datasets);

    const ctx = document.getElementById('lineChartContainer').getContext('2d');
    const lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasetsArray
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to get a random color for each dataset
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


// Function to render the pie chart based on sensor data distribution
function renderPieChart(data) {
    const dataTypeCounts = {};

    data.forEach(sensor => {
        const type = sensor.dataType;
        dataTypeCounts[type] = (dataTypeCounts[type] || 0) + 1;
    });

    const ctx = document.getElementById('pieChartContainer').getContext('2d');
    const pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(dataTypeCounts),
            datasets: [{
                label: 'Data Distribution',
                data: Object.values(dataTypeCounts),
                backgroundColor: [
                    'rgba(255, 0, 0, 0.2)',       // Bright Red
                    'rgba(0, 128, 0, 0.2)',       // Green
                    'rgba(0, 0, 255, 0.2)',       // Blue
                    'rgba(255, 165, 0, 0.2)',     // Orange
                    'rgba(128, 0, 128, 0.2)',     // Purple
                    'rgba(255, 255, 0, 0.2)',     // Yellow
                    'rgba(0, 255, 255, 0.2)'      // Cyan
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',         // Bright Red
                    'rgba(0, 128, 0, 1)',         // Green
                    'rgba(0, 0, 255, 1)',         // Blue
                    'rgba(255, 165, 0, 1)',       // Orange
                    'rgba(128, 0, 128, 1)',       // Purple
                    'rgba(255, 255, 0, 1)',       // Yellow
                    'rgba(0, 255, 255, 1)'        // Cyan
                ]
,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Data Distribution by Type'
                }
            }
        }
    });
}

function downloadReport() {
    const tableData = [];
    const rows = document.querySelectorAll("#sensorDataTable tbody tr");

    // Add header row
    tableData.push(["Sensor Type", "Data Type", "Value", "Unit", "Timestamp"]);

    // Loop through each row and push data to tableData array
    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        if (cells.length > 0) { // Skip empty rows
            const rowData = Array.from(cells).map(cell => cell.innerText);
            tableData.push(rowData);
        }
    });

    // Convert the data array to CSV format
    const csvContent = tableData.map(e => e.join(",")).join("\n");

    // Create a blob from the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "sensor_report.csv"); // Filename
    document.body.appendChild(link); // Append to the body
    link.click(); // Trigger download
    document.body.removeChild(link); // Remove link from body
}


// Placeholder for download report functionality
document.getElementById("downloadReport").addEventListener("click", function () {
    document.getElementById("downloadReport").addEventListener("click", downloadReport);

});
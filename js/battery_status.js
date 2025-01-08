// Wait for the DOM to load before accessing the battery API
document.addEventListener('DOMContentLoaded', function () {
    // Reference to the DOM elements
    const batteryBar = document.getElementById('battery-bar');
    const batteryPercentage = document.getElementById('battery-percentage');
    const chargingStatusText = document.getElementById('charging-status-text');
    const refreshButton = document.getElementById('refresh-button');

    // Function to update the battery status
    function updateBatteryStatus(battery) {
        const batteryLevel = battery.level * 100;  // Get battery level as a percentage
        const isCharging = battery.charging;

        // Update progress bar and battery percentage
        batteryBar.value = batteryLevel;
        batteryPercentage.textContent = `${batteryLevel}%`;

        // Update charging status text
        if (isCharging) {
            chargingStatusText.textContent = 'Charging';
            chargingStatusText.style.color = '#4CAF50';  // Green for charging
        } else {
            chargingStatusText.textContent = 'Not Charging';
            chargingStatusText.style.color = '#f44336';  // Red for not charging
        }
    }

    // Check if Battery API is supported
    if (navigator.getBattery) {
        navigator.getBattery().then(function(battery) {
            // Initial battery status update
            updateBatteryStatus(battery);

            // Update battery status whenever it changes
            battery.addEventListener('levelchange', function () {
                updateBatteryStatus(battery);
            });

            battery.addEventListener('chargingchange', function () {
                updateBatteryStatus(battery);
            });
        });
    } else {
        // Fallback if Battery API is not supported
        alert('Battery Status API is not supported on your browser.');
    }

    // Refresh button click handler
    refreshButton.addEventListener('click', function () {
        if (navigator.getBattery) {
            navigator.getBattery().then(function(battery) {
                updateBatteryStatus(battery);
            });
        }
    });
});

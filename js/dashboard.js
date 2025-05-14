document.addEventListener("DOMContentLoaded", () => {
    // Toggle blanket heating
    const blanketToggle = document.getElementById("blanket-toggle")
    const toggleLabel = document.querySelector(".toggle-label")
  
    if (blanketToggle && toggleLabel) {
      blanketToggle.addEventListener("change", function () {
        toggleLabel.textContent = this.checked ? "ON" : "OFF"
      })
    }
  
    // Simulate data updates (in a real app, this would come from an API)
    function simulateDataUpdates() {
      // Get random values within normal ranges
      const temperature = (Math.random() * 0.5 + 36.8).toFixed(1)
      const heartRate = Math.floor(Math.random() * 20 + 110)
      const spo2 = Math.floor(Math.random() * 3 + 96)
  
      // Update the DOM
      const tempValue = document.querySelector(".temperature .vital-value")
      const heartValue = document.querySelector(".heart-rate .vital-value")
      const spo2Value = document.querySelector(".spo2 .vital-value")
  
      if (tempValue) tempValue.textContent = `${temperature}°C`
      if (heartValue) heartValue.textContent = `${heartRate} BPM`
      if (spo2Value) spo2Value.textContent = `${spo2}%`
  
      // Update status badges based on values
      const tempBadge = document.querySelector(".temperature .status-badge")
      const heartBadge = document.querySelector(".heart-rate .status-badge")
      const spo2Badge = document.querySelector(".spo2 .status-badge")
  
      if (tempBadge) {
        if (temperature > 37.5) {
          tempBadge.className = "status-badge red"
          tempBadge.textContent = "Elevated"
        } else if (temperature > 37.0) {
          tempBadge.className = "status-badge yellow"
          tempBadge.textContent = "Slightly Elevated"
        } else {
          tempBadge.className = "status-badge green"
          tempBadge.textContent = "Normal"
        }
      }
  
      if (heartBadge) {
        if (heartRate > 140) {
          heartBadge.className = "status-badge red"
          heartBadge.textContent = "Elevated"
        } else if (heartRate < 100) {
          heartBadge.className = "status-badge yellow"
          heartBadge.textContent = "Low"
        } else {
          heartBadge.className = "status-badge green"
          heartBadge.textContent = "Normal"
        }
      }
  
      if (spo2Badge) {
        if (spo2 < 95) {
          spo2Badge.className = "status-badge red"
          spo2Badge.textContent = "Low"
        } else if (spo2 < 97) {
          spo2Badge.className = "status-badge yellow"
          spo2Badge.textContent = "Slightly Low"
        } else {
          spo2Badge.className = "status-badge green"
          spo2Badge.textContent = "Normal"
        }
      }
    }
  
    // Uncomment to enable simulated data updates
    // setInterval(simulateDataUpdates, 5000);
  })
  
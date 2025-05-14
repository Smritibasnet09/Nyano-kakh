

document.addEventListener("DOMContentLoaded", () => {
    // Filter functionality
    const filterLinks = document.querySelectorAll(".dropdown-content a")
    const timelineItems = document.querySelectorAll(".timeline-item")
  
    if (filterLinks.length > 0 && timelineItems.length > 0) {
      filterLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault()
  
          const filter = this.getAttribute("data-filter")
  
          // Update active state
          filterLinks.forEach((l) => l.classList.remove("active"))
          this.classList.add("active")
  
          // Filter timeline items
          timelineItems.forEach((item) => {
            if (filter === "all" || item.getAttribute("data-type") === filter) {
              item.style.display = "block"
            } else {
              item.style.display = "none"
            }
          })
        })
      })
    }
  
    // Export functionality (in a real app, this would generate a CSV or PDF)
    const exportButton = document.querySelector(".export-button")
  
    if (exportButton) {
      exportButton.addEventListener("click", () => {
        alert("Activity data export initiated. Your file will be ready for download shortly.")
      })
    }
  })

  // Firebase configuration
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    databaseURL: "your-database-url",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

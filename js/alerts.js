document.addEventListener("DOMContentLoaded", () => {
  // Acknowledge alert functionality
  const acknowledgeButtons = document.querySelectorAll(".acknowledge-button")

  if (acknowledgeButtons.length > 0) {
    acknowledgeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const alertCard = this.closest(".alert-card")
        const statusBadge = alertCard.querySelector(".status-badge")

        // Change status to acknowledged
        alertCard.classList.add("acknowledged")
        statusBadge.className = "status-badge gray"
        statusBadge.textContent = "Acknowledged"

        // Remove the acknowledge button
        this.remove()
      })
    })
  }

  // Search functionality
  const searchInput = document.querySelector(".search-input")
  const alertCards = document.querySelectorAll(".alert-card")

  if (searchInput && alertCards.length > 0) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase()

      alertCards.forEach((card) => {
        const title = card.querySelector("h3").textContent.toLowerCase()
        const description = card.querySelector("p").textContent.toLowerCase()

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          card.style.display = "flex"
        } else {
          card.style.display = "none"
        }
      })
    })
  }

  // Export functionality (in a real app, this would generate a CSV or PDF)
  const exportButton = document.querySelector(".export-button")

  if (exportButton) {
    exportButton.addEventListener("click", () => {
      alert("Alert data export initiated. Your file will be ready for download shortly.")
    })
  }
})
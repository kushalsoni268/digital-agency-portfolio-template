// Theme Switcher Functionality
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle")
    const themeIcon = document.getElementById("theme-icon")
  
    // Check if user has previously selected a theme
    const currentTheme = localStorage.getItem("theme")
    
    if (currentTheme) {
      document.body.classList.toggle("dark-theme", currentTheme === "dark")
      updateThemeIcon(currentTheme === "dark")
    }
  
    // Toggle theme when button is clicked
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme")
      const isDarkTheme = document.body.classList.contains("dark-theme")
      updateThemeIcon(isDarkTheme)
      localStorage.setItem("theme", isDarkTheme ? "dark" : "light")
    })
  
    // Function to update the theme icon
    function updateThemeIcon(isDarkTheme) {
      if (isDarkTheme) {
        themeIcon.classList.remove("fa-moon")
        themeIcon.classList.add("fa-sun")
      } else {
        themeIcon.classList.remove("fa-sun")
        themeIcon.classList.add("fa-moon")
      }
    }
})
  
  
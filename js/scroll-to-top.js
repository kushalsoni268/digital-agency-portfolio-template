// Scroll to Top Button Functionality
document.addEventListener("DOMContentLoaded", () => {
    // Create the scroll-to-top button element
    const scrollTopBtn = document.createElement("div")
    scrollTopBtn.className = "scroll-to-top"
    scrollTopBtn.id = "scrollToTop"
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
    document.body.appendChild(scrollTopBtn)
  
    // Initially hide the button
    scrollTopBtn.style.opacity = "0"
    scrollTopBtn.style.visibility = "hidden"
  
    // Show/hide the button based on scroll position
    window.addEventListener("scroll", () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = "1"
        scrollTopBtn.style.visibility = "visible"
      } else {
        scrollTopBtn.style.opacity = "0"
        scrollTopBtn.style.visibility = "hidden"
      }
    })
  
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener("click", () => {
      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  
    // Add hover effect for the custom cursor
    if (document.querySelector(".custom-cursor")) {
      scrollTopBtn.addEventListener("mouseenter", () => {
        document.querySelector(".custom-cursor").classList.add("cursor-hover")
      })
  
      scrollTopBtn.addEventListener("mouseleave", () => {
        document.querySelector(".custom-cursor").classList.remove("cursor-hover")
      })
    }
  })
  
  
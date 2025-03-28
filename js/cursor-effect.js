// Reference: https://www.youtube.com/watch?v=Yvz_axxWG4Y

// Custom Cursor Effect with Particles
document.addEventListener("DOMContentLoaded", () => {
    // Create canvas element for cursor effect
    const cursorCanvas = document.createElement("canvas")
    cursorCanvas.id = "cursor-canvas"
    cursorCanvas.style.position = "fixed"
    cursorCanvas.style.top = "0"
    cursorCanvas.style.left = "0"
    cursorCanvas.style.pointerEvents = "none" // Make sure it doesn't interfere with clicks
    cursorCanvas.style.zIndex = "9999" // Place it above all other elements
    document.body.appendChild(cursorCanvas)
  
    // Set canvas size to window size
    cursorCanvas.width = window.innerWidth
    cursorCanvas.height = window.innerHeight
  
    // Get canvas context
    const ctx = cursorCanvas.getContext("2d")
  
    // Mouse position with default values
    const mouse = {
      x: undefined,
      y: undefined,
    }
  
    // Colors
    const colors = [
      "#ff6b6b", // primary color
      "#4ecdc4", // secondary color
      "#ffffff", // white
    ]
  
    // Update mouse position on mouse move
    window.addEventListener("mousemove", (event) => {
      mouse.x = event.x
      mouse.y = event.y
      // Create particles on mouse move
      for (let i = 0; i < 3; i++) {
        particlesArray.push(new Particle())
      }
    })
  
    // Handle window resize
    window.addEventListener("resize", () => {
      cursorCanvas.width = window.innerWidth
      cursorCanvas.height = window.innerHeight
    })
  
    // Particle class
    class Particle {
      constructor() {
        this.x = mouse.x
        this.y = mouse.y
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.life = 20 // Particle lifetime
      }
  
      // Update particle position and properties
      update() {
        this.x += this.speedX
        this.y += this.speedY
  
        if (this.size > 0.2) this.size -= 0.1
        this.life--
      }
  
      // Draw particle on canvas
      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
  
        // Add glow effect
        ctx.shadowBlur = 15
        ctx.shadowColor = this.color
      }
    }
  
    // Array to store particles
    let particlesArray = []
  
    // Animation function
    function animate() {
      // Clear canvas with semi-transparent black for trail effect
      ctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height)
  
      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
  
        // Remove particles that are too small or have exceeded their lifetime
        if (particlesArray[i].size <= 0.2 || particlesArray[i].life <= 0) {
          particlesArray.splice(i, 1)
          i--
        }
      }
  
      // Limit the number of particles for performance
      if (particlesArray.length > 100) {
        particlesArray = particlesArray.slice(-100)
      }
  
      requestAnimationFrame(animate)
    }
  
    // Start animation
    animate()
  
    // Hide default cursor on the body
    document.body.style.cursor = "none"
  
    // Create custom cursor element
    const customCursor = document.createElement("div")
    customCursor.className = "custom-cursor"
    document.body.appendChild(customCursor)
  
    // Update custom cursor position
    window.addEventListener("mousemove", (e) => {
      customCursor.style.left = e.clientX + "px"
      customCursor.style.top = e.clientY + "px"
    })
  
    // Show cursor when mouse enters the window
    window.addEventListener("mouseenter", () => {
      customCursor.style.opacity = "1"
    })
  
    // Hide cursor when mouse leaves the window
    window.addEventListener("mouseleave", () => {
      customCursor.style.opacity = "0"
    })
  
    // Add hover effect for clickable elements
    const clickableElements = document.querySelectorAll(
      "a, button, input, textarea, .btn, .nav-link, .portfolio-item, .service-card, .theme-switch",
    )
  
    clickableElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        customCursor.classList.add("cursor-hover")
      })
  
      element.addEventListener("mouseleave", () => {
        customCursor.classList.remove("cursor-hover")
      })
    })
  })
  
  
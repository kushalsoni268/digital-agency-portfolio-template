// Reference: https://www.youtube.com/watch?v=d620nV6bp0A

// Canvas Animation
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // Colors
  const colors = [
    "#ff6b6b", // primary color
    "#4ecdc4", // secondary color
    "#ffffff", // white
  ]

  // Particle settings
  const particlesArray = []
  const numberOfParticles = 100

  // Mouse position
  const mouse = {
    x: null,
    y: null,
    radius: 150,
  }

  window.addEventListener("mousemove", (event) => {
    mouse.x = event.x
    mouse.y = event.y
  })

  // Create particle class
  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x
      this.y = y
      this.directionX = directionX
      this.directionY = directionY
      this.size = size
      this.color = color
      this.speedX = directionX
      this.speedY = directionY
    }

    // Draw individual particle
    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
      ctx.fillStyle = this.color
      ctx.fill()
    }

    // Check particle position, mouse position, move the particle, draw the particle
    update() {
      // Check if particle is still within canvas
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX
        this.speedX = this.directionX
      }
      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY
        this.speedY = this.directionY
      }

      // Check collision detection - mouse position / particle position
      const dx = mouse.x - this.x
      const dy = mouse.y - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < mouse.radius + this.size) {
        if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
          this.x += 10
          this.speedX = this.directionX * 5
        }
        if (mouse.x > this.x && this.x > this.size * 10) {
          this.x -= 10
          this.speedX = this.directionX * 5
        }
        if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
          this.y += 10
          this.speedY = this.directionY * 5
        }
        if (mouse.y > this.y && this.y > this.size * 10) {
          this.y -= 10
          this.speedY = this.directionY * 5
        }
      }

      // Move particle
      this.x += this.speedX
      this.y += this.speedY

      // Gradually slow down particles
      if (this.speedX !== this.directionX) {
        this.speedX = this.speedX * 0.95
        if (Math.abs(this.speedX - this.directionX) < 0.1) {
          this.speedX = this.directionX
        }
      }

      if (this.speedY !== this.directionY) {
        this.speedY = this.speedY * 0.95
        if (Math.abs(this.speedY - this.directionY) < 0.1) {
          this.speedY = this.directionY
        }
      }

      // Draw particle
      this.draw()
    }
  }

  // Create particle array
  function init() {
    particlesArray.length = 0
    for (let i = 0; i < numberOfParticles; i++) {
      const size = Math.random() * 5 + 1
      const x = Math.random() * (canvas.width - size * 2 - size * 2) + size * 2
      const y = Math.random() * (canvas.height - size * 2 - size * 2) + size * 2
      const directionX = Math.random() * 0.4 - 0.2
      const directionY = Math.random() * 0.4 - 0.2
      const color = colors[Math.floor(Math.random() * colors.length)]

      particlesArray.push(new Particle(x, y, directionX, directionY, size, color))
    }
  }

  // Connect particles with lines
  function connect() {
    let opacityValue = 1
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        const distance =
          (particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x) +
          (particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y)

        if (distance < (canvas.width / 7) * (canvas.height / 7)) {
          opacityValue = 1 - distance / 20000
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
          ctx.stroke()
        }
      }
    }
  }

  // Animation loop
  function animate() {
    requestAnimationFrame(animate) // For Smooth Animation
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update()
    }
    connect()
  }

  // Resize event
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    mouse.radius = 150
    init()
  })

  // Mouse out event
  window.addEventListener("mouseout", () => {
    mouse.x = undefined
    mouse.y = undefined
  })

  init()
  animate()
})


import { useEffect, useRef } from 'react'

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let w: number
    let h: number
    let time = 0

    const orbs = [
      { x: 0.3, y: 0.3, r: 0.35, color: '59, 130, 246', speed: 0.0003, offset: 0 },
      { x: 0.7, y: 0.6, r: 0.3, color: '168, 85, 247', speed: 0.00025, offset: 2 },
      { x: 0.5, y: 0.8, r: 0.25, color: '34, 197, 94', speed: 0.00035, offset: 4 },
      { x: 0.2, y: 0.7, r: 0.2, color: '59, 130, 246', speed: 0.0002, offset: 1 },
      { x: 0.8, y: 0.2, r: 0.22, color: '168, 85, 247', speed: 0.00028, offset: 3 },
    ]

    const particles: { x: number; y: number; r: number; dx: number; dy: number; alpha: number }[] = []

    function resize() {
      w = canvas!.width = window.innerWidth
      h = canvas!.height = window.innerHeight
    }

    function createParticles() {
      particles.length = 0
      const count = Math.min(80, Math.floor(w * h / 25000))
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.5 + 0.3,
          dx: (Math.random() - 0.5) * 0.2,
          dy: (Math.random() - 0.5) * 0.2 - 0.1,
          alpha: Math.random() * 0.6 + 0.2,
        })
      }
    }

    function draw() {
      time += 1
      ctx!.clearRect(0, 0, w, h)
      ctx!.fillStyle = '#0a0a0a'
      ctx!.fillRect(0, 0, w, h)

      for (const orb of orbs) {
        const ox = w * (orb.x + Math.sin(time * orb.speed + orb.offset) * 0.15)
        const oy = h * (orb.y + Math.cos(time * orb.speed * 0.7 + orb.offset) * 0.1)
        const or = Math.min(w, h) * orb.r

        const grad = ctx!.createRadialGradient(ox, oy, 0, ox, oy, or)
        grad.addColorStop(0, `rgba(${orb.color}, 0.15)`)
        grad.addColorStop(0.3, `rgba(${orb.color}, 0.06)`)
        grad.addColorStop(0.7, `rgba(${orb.color}, 0.015)`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')

        ctx!.fillStyle = grad
        ctx!.fillRect(0, 0, w, h)
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.dx
        p.y += p.dy

        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = '#ffffff'
        ctx!.globalAlpha = p.alpha * 0.4
        ctx!.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (dist < 120) {
            ctx!.beginPath()
            ctx!.moveTo(p.x, p.y)
            ctx!.lineTo(p2.x, p2.y)
            ctx!.strokeStyle = '#3b82f6'
            ctx!.globalAlpha = (1 - dist / 120) * 0.06
            ctx!.lineWidth = 0.5
            ctx!.stroke()
          }
        }
      }

      ctx!.globalAlpha = 0.015
      ctx!.strokeStyle = '#3b82f6'
      ctx!.lineWidth = 0.5
      const gridSize = 60
      for (let x = 0; x < w; x += gridSize) {
        ctx!.beginPath()
        ctx!.moveTo(x, 0)
        ctx!.lineTo(x, h)
        ctx!.stroke()
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx!.beginPath()
        ctx!.moveTo(0, y)
        ctx!.lineTo(w, y)
        ctx!.stroke()
      }

      ctx!.globalAlpha = 1
      animId = requestAnimationFrame(draw)
    }

    resize()
    createParticles()
    draw()

    window.addEventListener('resize', () => {
      resize()
      createParticles()
    })

    return () => {
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

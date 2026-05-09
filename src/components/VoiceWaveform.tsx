import { useEffect, useRef } from 'react'

interface VoiceWaveformProps {
  barCount?: number
  color?: string
  className?: string
}

export default function VoiceWaveform({
  barCount = 32,
  color = '#3b82f6',
  className = '',
}: VoiceWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const dpr = Math.min(window.devicePixelRatio, 2)

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      canvas!.width = rect.width * dpr
      canvas!.height = rect.height * dpr
      ctx!.scale(dpr, dpr)
    }

    resize()

    let time = 0
    function draw() {
      const rect = canvas!.getBoundingClientRect()
      ctx!.clearRect(0, 0, rect.width, rect.height)

      const barWidth = rect.width / barCount
      const centerY = rect.height / 2

      for (let i = 0; i < barCount; i++) {
        const x = i * barWidth + barWidth / 2
        const freq1 = Math.sin(time * 2 + i * 0.4) * 0.5 + 0.5
        const freq2 = Math.sin(time * 3.5 + i * 0.7 + 1) * 0.3 + 0.7
        const freq3 = Math.cos(time * 1.2 + i * 0.2 + 2) * 0.4 + 0.6
        const height = (freq1 * freq2 * freq3) * (rect.height * 0.85)

        const gradient = ctx!.createLinearGradient(0, centerY - height / 2, 0, centerY + height / 2)
        gradient.addColorStop(0, color)
        gradient.addColorStop(0.5, '#a855f7')
        gradient.addColorStop(1, color)

        ctx!.fillStyle = gradient
        ctx!.globalAlpha = 0.7 + freq1 * 0.3
        roundRect(ctx!, x - barWidth * 0.3, centerY - height / 2, barWidth * 0.6, height, 4)
        ctx!.fill()
      }

      ctx!.globalAlpha = 1
      time += 0.03
      animId = requestAnimationFrame(draw)
    }

    function roundRect(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
      c.beginPath()
      c.moveTo(x + r, y)
      c.lineTo(x + w - r, y)
      c.quadraticCurveTo(x + w, y, x + w, y + r)
      c.lineTo(x + w, y + h - r)
      c.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
      c.lineTo(x + r, y + h)
      c.quadraticCurveTo(x, y + h, x, y + h - r)
      c.lineTo(x, y + r)
      c.quadraticCurveTo(x, y, x + r, y)
      c.closePath()
    }

    draw()

    return () => cancelAnimationFrame(animId)
  }, [barCount, color])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  )
}

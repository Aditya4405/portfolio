import { useEffect, useRef } from 'react'

export default function MatrixBackground({ theme }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let mouse = { x: -1000, y: -1000 }
    let gridOffset = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resize)
    resize()

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const cellSize = 45
      const cols = Math.floor(canvas.width / cellSize) + 2
      const rows = Math.floor(canvas.height / cellSize) + 2
      
      gridOffset += 0.15
      if (gridOffset > cellSize) gridOffset = 0

      const isDark = theme === 'dark'
      const baseLineColor = isDark ? 'rgba(192, 57, 43, 0.04)' : 'rgba(192, 57, 43, 0.05)'
      
      ctx.lineWidth = 1
      ctx.strokeStyle = baseLineColor

      ctx.beginPath()
      for(let x = 0; x < cols; x++) {
        ctx.moveTo(x * cellSize, 0)
        ctx.lineTo(x * cellSize, canvas.height)
      }
      for(let y = -1; y < rows; y++) {
        ctx.moveTo(0, y * cellSize + gridOffset)
        ctx.lineTo(canvas.width, y * cellSize + gridOffset)
      }
      ctx.stroke()

      for(let x = 0; x < cols; x++) {
        for(let y = -1; y < rows; y++) {
          const cy = (y * cellSize) + gridOffset
          const cx = x * cellSize
          const dx = mouse.x - cx
          const dy = mouse.y - cy
          const dist = Math.sqrt(dx*dx + dy*dy)
          
          if(dist < 180) {
             const opacity = 1 - (dist / 180)
             // Crimson red glow on mouse proximity
             ctx.fillStyle = `rgba(192, 57, 43, ${opacity * 0.1})`
             ctx.fillRect(cx, cy, cellSize, cellSize)
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[0] opacity-60"
    />
  )
}

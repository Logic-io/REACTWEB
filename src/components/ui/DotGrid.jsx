import { useCallback, useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import './DotGrid.css'

gsap.registerPlugin(InertiaPlugin)

const throttle = (func, limit) => {
  let lastCall = 0

  return function throttled(...args) {
    const now = performance.now()
    if (now - lastCall >= limit) {
      lastCall = now
      func.apply(this, args)
    }
  }
}

function hexToRgb(hex) {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  if (!match) return { r: 0, g: 0, b: 0 }

  return {
    r: Number.parseInt(match[1], 16),
    g: Number.parseInt(match[2], 16),
    b: Number.parseInt(match[3], 16),
  }
}

export default function DotGrid({
  dotSize = 16,
  gap = 32,
  baseColor = '#5227FF',
  activeColor = '#5227FF',
  proximity = 150,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = '',
  style,
}) {
  const wrapperRef = useRef(null)
  const canvasRef = useRef(null)
  const dotsRef = useRef([])
  const pointerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0,
  })

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor])
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor])

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) return null

    const path = new window.Path2D()
    path.arc(0, 0, dotSize / 2, 0, Math.PI * 2)
    return path
  }, [dotSize])

  const buildGrid = useCallback(() => {
    const wrapper = wrapperRef.current
    const canvas = canvasRef.current
    if (!wrapper || !canvas) return

    const { width, height } = wrapper.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const context = canvas.getContext('2d')
    if (context) context.scale(dpr, dpr)

    const columns = Math.floor((width + gap) / (dotSize + gap))
    const rows = Math.floor((height + gap) / (dotSize + gap))
    const cell = dotSize + gap
    const gridWidth = cell * columns - gap
    const gridHeight = cell * rows - gap
    const startX = (width - gridWidth) / 2 + dotSize / 2
    const startY = (height - gridHeight) / 2 + dotSize / 2
    const dots = []

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        dots.push({
          cx: startX + x * cell,
          cy: startY + y * cell,
          xOffset: 0,
          yOffset: 0,
          _inertiaApplied: false,
        })
      }
    }

    dotsRef.current = dots
  }, [dotSize, gap])

  useEffect(() => {
    if (!circlePath) return undefined

    let animationFrameId
    const proximitySquared = proximity * proximity

    const draw = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const context = canvas.getContext('2d')
      if (!context) return

      context.clearRect(0, 0, canvas.width, canvas.height)
      const { x: pointerX, y: pointerY } = pointerRef.current

      for (const dot of dotsRef.current) {
        const offsetX = dot.cx + dot.xOffset
        const offsetY = dot.cy + dot.yOffset
        const deltaX = dot.cx - pointerX
        const deltaY = dot.cy - pointerY
        const distanceSquared = deltaX * deltaX + deltaY * deltaY
        let fillStyle = baseColor

        if (distanceSquared <= proximitySquared) {
          const distance = Math.sqrt(distanceSquared)
          const strength = 1 - distance / proximity
          const red = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * strength)
          const green = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * strength)
          const blue = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * strength)
          fillStyle = `rgb(${red},${green},${blue})`
        }

        context.save()
        context.translate(offsetX, offsetY)
        context.fillStyle = fillStyle
        context.fill(circlePath)
        context.restore()
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationFrameId)
  }, [proximity, baseColor, activeRgb, baseRgb, circlePath])

  useEffect(() => {
    buildGrid()
    let resizeObserver = null

    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(buildGrid)
      if (wrapperRef.current) resizeObserver.observe(wrapperRef.current)
    } else {
      window.addEventListener('resize', buildGrid)
    }

    return () => {
      if (resizeObserver) resizeObserver.disconnect()
      else window.removeEventListener('resize', buildGrid)
    }
  }, [buildGrid])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => gsap.killTweensOf(dotsRef.current)
    }

    const applyReturn = (dot) => {
      gsap.to(dot, {
        xOffset: 0,
        yOffset: 0,
        duration: returnDuration,
        ease: 'elastic.out(1,0.75)',
      })
      dot._inertiaApplied = false
    }

    const handleMove = (event) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const now = performance.now()
      const pointer = pointerRef.current
      const deltaTime = pointer.lastTime ? now - pointer.lastTime : 16
      const deltaX = event.clientX - pointer.lastX
      const deltaY = event.clientY - pointer.lastY
      let velocityX = (deltaX / deltaTime) * 1000
      let velocityY = (deltaY / deltaTime) * 1000
      let speed = Math.hypot(velocityX, velocityY)

      if (speed > maxSpeed) {
        const scale = maxSpeed / speed
        velocityX *= scale
        velocityY *= scale
        speed = maxSpeed
      }

      pointer.lastTime = now
      pointer.lastX = event.clientX
      pointer.lastY = event.clientY
      pointer.vx = velocityX
      pointer.vy = velocityY
      pointer.speed = speed

      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top

      for (const dot of dotsRef.current) {
        const distance = Math.hypot(dot.cx - pointer.x, dot.cy - pointer.y)
        if (speed > speedTrigger && distance < proximity && !dot._inertiaApplied) {
          dot._inertiaApplied = true
          gsap.killTweensOf(dot)
          const pushX = dot.cx - pointer.x + velocityX * 0.005
          const pushY = dot.cy - pointer.y + velocityY * 0.005

          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => applyReturn(dot),
          })
        }
      }
    }

    const handleClick = (event) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const clickX = event.clientX - rect.left
      const clickY = event.clientY - rect.top

      for (const dot of dotsRef.current) {
        const distance = Math.hypot(dot.cx - clickX, dot.cy - clickY)
        if (distance < shockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true
          gsap.killTweensOf(dot)
          const falloff = Math.max(0, 1 - distance / shockRadius)
          const pushX = (dot.cx - clickX) * shockStrength * falloff
          const pushY = (dot.cy - clickY) * shockStrength * falloff

          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => applyReturn(dot),
          })
        }
      }
    }

    const throttledMove = throttle(handleMove, 50)
    window.addEventListener('mousemove', throttledMove, { passive: true })
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('mousemove', throttledMove)
      window.removeEventListener('click', handleClick)
      gsap.killTweensOf(dotsRef.current)
    }
  }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength])

  return (
    <div className={`dot-grid ${className}`} style={style} aria-hidden="true">
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </div>
  )
}

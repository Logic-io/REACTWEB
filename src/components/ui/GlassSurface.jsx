import { useCallback, useEffect, useId, useRef, useState } from 'react'
import './GlassSurface.css'

function supportsSvgFilters(filterId) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false

  const isWebKit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
  const isFirefox = /Firefox/.test(navigator.userAgent)
  if (isWebKit || isFirefox) return false

  const element = document.createElement('div')
  element.style.backdropFilter = `url(#${filterId})`
  return element.style.backdropFilter !== ''
}

export default function GlassSurface({
  children,
  width = 200,
  height = 80,
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'difference',
  className = '',
  style = {},
}) {
  const uniqueId = useId().replace(/:/g, '-')
  const filterId = `glass-filter-${uniqueId}`
  const redGradientId = `red-grad-${uniqueId}`
  const blueGradientId = `blue-grad-${uniqueId}`
  const [svgSupported] = useState(() => supportsSvgFilters(filterId))

  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const redChannelRef = useRef(null)
  const greenChannelRef = useRef(null)
  const blueChannelRef = useRef(null)
  const gaussianBlurRef = useRef(null)

  const generateDisplacementMap = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect()
    const actualWidth = rect?.width || 400
    const actualHeight = rect?.height || 200
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5)

    const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradientId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradientId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect width="${actualWidth}" height="${actualHeight}" fill="black"/>
        <rect width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradientId})"/>
        <rect width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradientId})" style="mix-blend-mode:${mixBlendMode}"/>
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)"/>
      </svg>
    `

    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`
  }, [blueGradientId, blur, borderRadius, borderWidth, brightness, mixBlendMode, opacity, redGradientId])

  const updateDisplacementMap = useCallback(() => {
    imageRef.current?.setAttribute('href', generateDisplacementMap())
  }, [generateDisplacementMap])

  useEffect(() => {
    updateDisplacementMap()

    const channels = [
      { ref: redChannelRef, offset: redOffset },
      { ref: greenChannelRef, offset: greenOffset },
      { ref: blueChannelRef, offset: blueOffset },
    ]

    channels.forEach(({ ref, offset }) => {
      if (!ref.current) return
      ref.current.setAttribute('scale', String(distortionScale + offset))
      ref.current.setAttribute('xChannelSelector', xChannel)
      ref.current.setAttribute('yChannelSelector', yChannel)
    })

    gaussianBlurRef.current?.setAttribute('stdDeviation', String(displace))
  }, [
    blueOffset,
    displace,
    distortionScale,
    greenOffset,
    redOffset,
    updateDisplacementMap,
    xChannel,
    yChannel,
  ])

  useEffect(() => {
    const container = containerRef.current
    if (!container || typeof ResizeObserver === 'undefined') return undefined

    let animationFrameId
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(updateDisplacementMap)
    })

    resizeObserver.observe(container)
    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
    }
  }, [updateDisplacementMap])

  const containerStyle = {
    ...style,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
    '--glass-frost': backgroundOpacity,
    '--glass-saturation': saturation,
    '--filter-id': `url(#${filterId})`,
  }

  return (
    <div
      ref={containerRef}
      className={`glass-surface ${svgSupported ? 'glass-surface--svg' : 'glass-surface--fallback'} ${className}`}
      style={containerStyle}
    >
      <svg className="glass-surface__filter" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage ref={imageRef} width="100%" height="100%" preserveAspectRatio="none" result="map" />
            <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" result="displacedRed" />
            <feColorMatrix
              in="displacedRed"
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="red"
            />
            <feDisplacementMap ref={greenChannelRef} in="SourceGraphic" in2="map" result="displacedGreen" />
            <feColorMatrix
              in="displacedGreen"
              type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="green"
            />
            <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" result="displacedBlue" />
            <feColorMatrix
              in="displacedBlue"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
              result="blue"
            />
            <feBlend in="red" in2="green" mode="screen" result="redGreen" />
            <feBlend in="redGreen" in2="blue" mode="screen" result="output" />
            <feGaussianBlur ref={gaussianBlurRef} in="output" stdDeviation="0.7" />
          </filter>
        </defs>
      </svg>
      <div className="glass-surface__content">{children}</div>
    </div>
  )
}

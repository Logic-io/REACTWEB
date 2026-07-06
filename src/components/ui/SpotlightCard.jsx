import { useRef } from 'react'

export default function SpotlightCard({ children, className = '', as: Tag = 'article' }) {
  const cardRef = useRef(null)

  const handlePointerMove = (event) => {
    const card = cardRef.current
    if (!card || event.pointerType === 'touch') return

    const rect = card.getBoundingClientRect()
    card.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`)
    card.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`)
    card.style.setProperty('--spotlight-opacity', '1')
  }

  const handlePointerLeave = () => {
    cardRef.current?.style.setProperty('--spotlight-opacity', '0')
  }

  return (
    <Tag
      ref={cardRef}
      className={`spotlight-card ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </Tag>
  )
}

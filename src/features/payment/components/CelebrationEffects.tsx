import { useState } from 'react'

export const Bunting = () => {
  const colors = ['#67AEFF', '#5BA0EB', '#FFCC00', '#55CC55', '#AA55FF', '#FF8800']
  return (
    <div className="absolute top-0 left-0 w-full flex justify-between px-2 pt-2 pointer-events-none z-30">
      {Array.from({ length: 12 }).map((_, i) => (
        <svg
          key={i}
          width="40"
          height="40"
          viewBox="0 0 40 40"
          className="drop-shadow-sm animate-bounce"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <path d="M0 0 L40 0 L20 35 Z" fill={colors[i % colors.length]} />
        </svg>
      ))}
    </div>
  )
}

export const Confetti = () => {
  const colors = ['#67AEFF', '#85C1FF', '#FFCC00', '#55CC55', '#AA55FF', '#FF00AA']
  const [pieces] = useState(() =>
    Array.from({ length: 40 }).map(() => ({
      left: Math.random() * 100,
      width: 4 + Math.random() * 8,
      height: 4 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2
    }))
  )

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {pieces.map((p, i) => (
        <div
          key={i}
          className="absolute animate-fall"
          style={{
            left: `${p.left}%`,
            top: `-20px`,
            width: `${p.width}px`,
            height: `${p.height}px`,
            backgroundColor: p.color,
            borderRadius: '2px',
            opacity: 0.6,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}
    </div>
  )
}

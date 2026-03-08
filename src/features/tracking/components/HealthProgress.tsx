import { useState, useRef } from 'react'
import { TrendingUp } from 'lucide-react'

export type HealthDataItem = {
  label: string
  score: number
  pores: number
  acnes: number
  darkCircles: number
  darkPots: number
}

const defaultData: HealthDataItem[] = [
  { label: 'Day 1', score: 70, pores: 72, acnes: 74, darkCircles: 62, darkPots: 70 },
  { label: 'Day 2', score: 87, pores: 88, acnes: 79, darkCircles: 65, darkPots: 79 }
]

export default function HealthProgress({ data = defaultData }: { data?: HealthDataItem[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const svgContainerRef = useRef<HTMLDivElement>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  const W = 100
  const H = 100
  const pad = { left: 8, right: 6, top: 10, bottom: 6 }
  const n = data.length

  const xScale = (i: number) => pad.left + (i / (n - 1)) * (W - pad.left - pad.right)
  const yScale = (s: number) => pad.top + (1 - s / 100) * (H - pad.top - pad.bottom)

  const linePath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d.score)}`)
    .join(' ')

  const areaPath = `${linePath} L ${xScale(n - 1)} ${H - pad.bottom} L ${xScale(0)} ${H - pad.bottom} Z`

  const latestScore = data[data.length - 1].score

  const metrics = (d: (typeof data)[0]) => [
    { label: 'Pores', value: d.pores },
    { label: 'Acne', value: d.acnes },
    { label: 'Dark circles', value: d.darkCircles },
    { label: 'Dark spots', value: d.darkPots }
  ]

  const TOOLTIP_W = 148

  const handleMouseEnter = (i: number, score: number) => {
    const el = svgContainerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setHoveredIdx(i)
    setTooltipPos({
      x: (xScale(i) / W) * rect.width,
      y: (yScale(score) / H) * rect.height
    })
  }

  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-slate-100"
      style={{ padding: '20px 20px 16px' }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p style={{ fontWeight: 700, color: '#1e293b', fontSize: 16, marginBottom: 2 }}>
            Skin Health Progress
          </p>
          <p style={{ fontSize: 13, color: '#94a3b8' }}>Daily skin health scores</p>
        </div>
        <div
          style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#16a34a',
            borderRadius: 999,
            padding: '4px 12px',
            fontSize: 12,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          <TrendingUp size={11} />
          Score: {latestScore}
        </div>
      </div>

      <div style={{ position: 'relative', height: 210 }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 24,
            width: 26,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingRight: 4
          }}
        >
          {[100, 75, 50, 25, 0].map((v) => (
            <span key={v} style={{ fontSize: 10, color: '#cbd5e1', lineHeight: 1 }}>
              {v}
            </span>
          ))}
        </div>

        <div
          ref={svgContainerRef}
          style={{ position: 'absolute', left: 28, right: 0, top: 0, bottom: 24 }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            style={{ overflow: 'visible', display: 'block' }}
          >
            <defs>
              <linearGradient id="violetGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.01" />
              </linearGradient>
            </defs>

            {[0, 25, 50, 75, 100].map((v) => (
              <line
                key={v}
                x1={pad.left}
                y1={yScale(v)}
                x2={W - pad.right}
                y2={yScale(v)}
                stroke="#f1f5f9"
                strokeWidth="0.6"
              />
            ))}

            <line
              x1={pad.left}
              y1={yScale(0)}
              x2={W - pad.right + 2}
              y2={yScale(0)}
              stroke="#e2e8f0"
              strokeWidth="0.6"
            />
            <polygon
              points={`${W - pad.right + 2},${yScale(0) - 1.2} ${W - pad.right + 4},${yScale(0)} ${W - pad.right + 2},${yScale(0) + 1.2}`}
              fill="#e2e8f0"
            />

            <path d={areaPath} fill="url(#violetGrad2)" />

            <path
              d={linePath}
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {data.map((d, i) => (
              <g key={i}>
                {hoveredIdx === i && (
                  <circle
                    cx={xScale(i)}
                    cy={yScale(d.score)}
                    r="5.5"
                    fill="#8b5cf6"
                    fillOpacity="0.10"
                  />
                )}
                <circle
                  cx={xScale(i)}
                  cy={yScale(d.score)}
                  r={hoveredIdx === i ? 3.8 : 3.2}
                  fill="white"
                  stroke="#8b5cf6"
                  strokeWidth="2"
                />

                <circle
                  cx={xScale(i)}
                  cy={yScale(d.score)}
                  r="8"
                  fill="transparent"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => handleMouseEnter(i, d.score)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              </g>
            ))}
          </svg>
          {hoveredIdx !== null &&
            (() => {
              const d = data[hoveredIdx]
              const el = svgContainerRef.current
              const containerW = el ? el.getBoundingClientRect().width : 340
              const rawLeft = tooltipPos.x - TOOLTIP_W / 2
              const left = Math.min(Math.max(rawLeft, 0), containerW - TOOLTIP_W)
              const top = tooltipPos.y

              return (
                <div
                  style={{
                    position: 'absolute',
                    left,
                    top,
                    transform: 'translateY(calc(-100% - 10px))',
                    width: TOOLTIP_W,
                    background: 'white',
                    border: '1px solid #e8edf5',
                    borderRadius: 12,
                    padding: '8px 10px',
                    boxShadow: '0 8px 28px rgba(100,116,139,0.14)',
                    pointerEvents: 'none',
                    zIndex: 20
                  }}
                >
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: '#1e293b',
                      marginBottom: 6,
                      textTransform: 'uppercase',
                      letterSpacing: '0.07em'
                    }}
                  >
                    {d.label}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {metrics(d).map((m) => (
                      <div
                        key={m.label}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <div
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: 3,
                              background: '#bfdbfe',
                              flexShrink: 0
                            }}
                          />
                          <span style={{ fontSize: 11, color: '#64748b' }}>{m.label}</span>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#1e293b' }}>
                          {m.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })()}
        </div>

        {/* X-axis labels */}
        <div
          style={{
            position: 'absolute',
            left: 28,
            right: 40,
            bottom: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}
        >
          {data.map((d, i) => (
            <span
              key={i}
              style={{
                fontSize: 10,
                color: hoveredIdx === i ? '#8b5cf6' : '#94a3b8',
                fontWeight: hoveredIdx === i ? 600 : 400,
                transition: 'color 0.15s'
              }}
            >
              {d.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

import { useState, useRef, useMemo } from 'react'
import { TrendingUp, ChevronDown, Check } from 'lucide-react'

export type HealthDataItem = {
  label: string
  score: number
  pores: number
  acnes: number
  darkCircles: number
  darkPots: number
  date?: string
}

const defaultData: HealthDataItem[] = [
  { label: 'Day 1', score: 70, pores: 72, acnes: 74, darkCircles: 62, darkPots: 70 },
  { label: 'Day 2', score: 87, pores: 88, acnes: 79, darkCircles: 65, darkPots: 79 }
]

const DATE_OPTIONS = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '3m', label: 'Last 3 months' },
  { value: 'all', label: 'All time' }
]

const MAX_POINTS = 5

function pickTopChanges(pool: HealthDataItem[], n: number): HealthDataItem[] {
  if (pool.length <= n) return pool
  const importance = pool.map((d, i) => {
    const prev = i > 0 ? Math.abs(d.score - pool[i - 1].score) : 0
    const next = i < pool.length - 1 ? Math.abs(d.score - pool[i + 1].score) : 0
    return { idx: i, val: Math.max(prev, next) }
  })
  const kept = new Set<number>([0, pool.length - 1])
  importance
    .filter((x) => x.idx !== 0 && x.idx !== pool.length - 1)
    .sort((a, b) => b.val - a.val)
    .slice(0, n - 2)
    .forEach((x) => kept.add(x.idx))
  return pool.filter((_, i) => kept.has(i))
}

function filterByDays(data: HealthDataItem[], days: number): HealthDataItem[] {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
  return data.filter((d) => {
    if (!d.date) return true
    return new Date(d.date).getTime() >= cutoff
  })
}

export default function HealthProgress({ data = defaultData }: { data?: HealthDataItem[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const svgContainerRef = useRef<HTMLDivElement>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const [dateFilter, setDateFilter] = useState('7d')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const displayData = useMemo<HealthDataItem[]>(() => {
    const sorted = [...data].sort((a, b) => {
      if (!a.date || !b.date) return 0
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
    if (dateFilter === 'all') return pickTopChanges(sorted, MAX_POINTS)
    const hasDates = sorted.some((d) => !!d.date)
    if (!hasDates) return sorted.slice(-MAX_POINTS)
    const days = dateFilter === '7d' ? 7 : dateFilter === '30d' ? 30 : 90
    const inRange = filterByDays(sorted, days)
    if (inRange.length === 0) return sorted.slice(-MAX_POINTS)
    return pickTopChanges(inRange, MAX_POINTS)
  }, [data, dateFilter])

  const W = 100
  const H = 100
  const pad = { left: 8, right: 6, top: 10, bottom: 6 }
  const n = displayData.length

  const xScale = (i: number) =>
    n === 1
      ? (W - pad.left - pad.right) / 2 + pad.left
      : pad.left + (i / (n - 1)) * (W - pad.left - pad.right)

  const yScale = (s: number) => pad.top + (1 - s / 100) * (H - pad.top - pad.bottom)

  const linePath = displayData
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d.score)}`)
    .join(' ')

  const areaPath = `${linePath} L ${xScale(n - 1)} ${H - pad.bottom} L ${xScale(0)} ${H - pad.bottom} Z`

  const latestScore = displayData[displayData.length - 1].score

  const metrics = (d: HealthDataItem) => [
    { label: 'Pores', value: d.pores, color: '#8b5cf6' },
    { label: 'Acne', value: d.acnes, color: '#ec4899' },
    { label: 'Dark circles', value: d.darkCircles, color: '#06b6d4' },
    { label: 'Dark spots', value: d.darkPots, color: '#f59e0b' }
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

  const selectedLabel = DATE_OPTIONS.find((o) => o.value === dateFilter)?.label ?? 'Last 7 days'

  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-slate-100"
      style={{ padding: '20px 20px 16px' }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <p style={{ fontWeight: 700, color: '#1e293b', fontSize: 16, marginBottom: 2 }}>
            Skin Health Progress
          </p>
          <p style={{ fontSize: 13, color: '#94a3b8' }}>Daily skin health scores</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Date filter dropdown */}
          <div style={{ position: 'relative', userSelect: 'none' }}>
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: dropdownOpen ? '#eff6ff' : '#fafafa',
                border: `1.5px solid ${dropdownOpen ? '#93c5fd' : '#e5e7eb'}`,
                borderRadius: 10,
                padding: '5px 10px 5px 12px',
                cursor: 'pointer',
                outline: 'none',
                fontSize: 12,
                fontWeight: 500,
                color: '#374151',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
                boxShadow: dropdownOpen ? '0 0 0 3px rgba(59,130,246,0.08)' : 'none'
              }}
            >
              {selectedLabel}
              <ChevronDown
                size={13}
                color="#9ca3af"
                style={{
                  transition: 'transform 0.2s',
                  transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
              />
            </button>

            {dropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  right: 0,
                  zIndex: 50,
                  background: '#fff',
                  border: '1.5px solid #dbeafe',
                  borderRadius: 12,
                  boxShadow: '0 8px 24px rgba(59,130,246,0.10), 0 2px 8px rgba(0,0,0,0.06)',
                  overflow: 'hidden',
                  minWidth: 148
                }}
              >
                {DATE_OPTIONS.map((opt) => {
                  const isActive = opt.value === dateFilter
                  return (
                    <div
                      key={opt.value}
                      onClick={() => {
                        setDateFilter(opt.value)
                        setDropdownOpen(false)
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        fontSize: 12,
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? '#2563eb' : '#374151',
                        background: isActive ? '#eff6ff' : 'transparent',
                        cursor: 'pointer',
                        transition: 'background 0.1s',
                        gap: 8
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive)
                          (e.currentTarget as HTMLDivElement).style.background = '#eff6ff'
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive)
                          (e.currentTarget as HTMLDivElement).style.background = 'transparent'
                      }}
                    >
                      <span>{opt.label}</span>
                      {isActive && <Check size={12} color="#2563eb" strokeWidth={2.5} />}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Score badge */}
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
              gap: 4,
              whiteSpace: 'nowrap'
            }}
          >
            <TrendingUp size={11} />
            Score: {latestScore}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ position: 'relative', height: 210 }}>
        {/* Y-axis labels */}
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
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {displayData.map((d, i) => (
              <g key={i}>
                {/* Outer glow ring on hover */}
                {hoveredIdx === i && (
                  <circle
                    cx={xScale(i)}
                    cy={yScale(d.score)}
                    r="3.5"
                    fill="#8b5cf6"
                    fillOpacity="0.15"
                  />
                )}
                {/* Solid dot — no white fill */}
                <circle
                  cx={xScale(i)}
                  cy={yScale(d.score)}
                  r={hoveredIdx === i ? 2.0 : 1.4}
                  fill="#8b5cf6"
                />
                {/* Hit area */}
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

          {/* Tooltip */}
          {hoveredIdx !== null &&
            (() => {
              const d = displayData[hoveredIdx]
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
                    border: '1px solid #e5e7eb',
                    borderRadius: 12,
                    padding: '8px 10px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                    pointerEvents: 'none',
                    zIndex: 20
                  }}
                >
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: '#374151',
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
                              borderRadius: '50%',
                              background: m.color,
                              flexShrink: 0
                            }}
                          />
                          <span style={{ fontSize: 11, color: '#6b7280' }}>{m.label}</span>
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
          {displayData.map((d, i) => (
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

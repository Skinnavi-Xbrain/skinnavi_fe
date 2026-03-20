import { useState, useRef, useMemo, useEffect } from 'react'
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

const defaultData: HealthDataItem[] = []

const DATE_OPTIONS = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '3m', label: 'Last 3 months' },
  { value: 'all', label: 'All time' }
]

const DAYS_MAP: Record<string, number | undefined> = {
  '7d': 7,
  '30d': 30,
  '3m': 90,
  all: 1000
}

export default function HealthProgress({
  data = defaultData,
  onDateFilterChange
}: {
  data?: HealthDataItem[]
  onDateFilterChange?: (days: number | undefined) => void
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const svgContainerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(300)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const [dateFilter, setDateFilter] = useState('7d')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setContainerWidth(el.clientWidth))
    ro.observe(el)
    setContainerWidth(el.clientWidth)
    return () => ro.disconnect()
  }, [])

  const handleDateFilterChange = (value: string) => {
    setDateFilter(value)
    if (onDateFilterChange) {
      onDateFilterChange(DAYS_MAP[value])
    }
  }

  const displayData = useMemo<HealthDataItem[]>(() => {
    return [...data].sort((a, b) => {
      if (!a.date || !b.date) return 0
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
  }, [data])

  const n = displayData.length

  const CHART_HEIGHT = 180
  const LABEL_HEIGHT = 36
  const SCROLLBAR_SPACE = 8
  const Y_AXIS_WIDTH = 32

  const minPerPoint = 48
  const contentWidth = Math.max(containerWidth, n * minPerPoint)

  const padL = 12
  const padR = 20
  const padT = 14
  const padB = 6

  const svgW = contentWidth
  const svgH = CHART_HEIGHT

  const xScale = (i: number) =>
    n === 1 ? (svgW - padL - padR) / 2 + padL : padL + (i / (n - 1)) * (svgW - padL - padR)

  const yScale = (s: number) => padT + (1 - s / 100) * (svgH - padT - padB)

  const linePath = displayData
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d.score)}`)
    .join(' ')

  const areaPath =
    n > 0 ? `${linePath} L ${xScale(n - 1)} ${svgH - padB} L ${xScale(0)} ${svgH - padB} Z` : ''

  const latestScore = displayData[displayData.length - 1]?.score ?? 0

  const metrics = (d: HealthDataItem) => [
    { label: 'Pores', value: d.pores, color: '#8b5cf6' },
    { label: 'Acne', value: d.acnes, color: '#ec4899' },
    { label: 'Dark circles', value: d.darkCircles, color: '#06b6d4' },
    { label: 'Dark spots', value: d.darkPots, color: '#f59e0b' }
  ]

  const TOOLTIP_W = 160
  const TOOLTIP_H = 124

  const handleMouseEnter = (i: number, score: number) => {
    const scrollEl = scrollContainerRef.current
    const scrollLeft = scrollEl ? scrollEl.scrollLeft : 0
    const xPx = xScale(i)
    const yPx = yScale(score)
    const xInView = xPx - scrollLeft
    setHoveredIdx(i)
    setTooltipPos({ x: xInView, y: yPx })
  }

  const selectedLabel = DATE_OPTIONS.find((o) => o.value === dateFilter)?.label ?? 'Last 7 days'

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

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
                        handleDateFilterChange(opt.value)
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

      <div style={{ display: 'flex', position: 'relative' }}>
        <div
          style={{
            flexShrink: 0,
            width: Y_AXIS_WIDTH,
            height: CHART_HEIGHT,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingRight: 6,
            paddingTop: padT,
            paddingBottom: padB
          }}
        >
          {[100, 75, 50, 25, 0].map((v) => (
            <span key={v} style={{ fontSize: 10, color: '#cbd5e1', lineHeight: 1 }}>
              {v}
            </span>
          ))}
        </div>

        <div
          ref={containerRef}
          style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}
        >
          <div
            ref={scrollContainerRef}
            style={{
              overflowX: 'auto',
              overflowY: 'hidden',
              paddingBottom: SCROLLBAR_SPACE,
              scrollbarWidth: 'thin',
              scrollbarColor: '#93c5fd #f1f5f9'
            }}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div style={{ width: contentWidth, position: 'relative' }}>
              <div
                ref={svgContainerRef}
                style={{ width: contentWidth, height: CHART_HEIGHT, position: 'relative' }}
              >
                <svg
                  width={svgW}
                  height={svgH}
                  viewBox={`0 0 ${svgW} ${svgH}`}
                  style={{ display: 'block', overflow: 'visible' }}
                >
                  <defs>
                    <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.01" />
                    </linearGradient>
                  </defs>

                  {[0, 25, 50, 75, 100].map((v) => (
                    <line
                      key={v}
                      x1={padL}
                      y1={yScale(v)}
                      x2={svgW - padR}
                      y2={yScale(v)}
                      stroke="#f1f5f9"
                      strokeWidth="0.6"
                    />
                  ))}

                  <line
                    x1={padL}
                    y1={yScale(0)}
                    x2={svgW - padR + 2}
                    y2={yScale(0)}
                    stroke="#e2e8f0"
                    strokeWidth="0.6"
                  />
                  <polygon
                    points={`${svgW - padR + 2},${yScale(0) - 1.2} ${svgW - padR + 4},${yScale(0)} ${svgW - padR + 2},${yScale(0) + 1.2}`}
                    fill="#e2e8f0"
                  />

                  <path d={areaPath} fill="url(#blueGrad)" />
                  <path
                    d={linePath}
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {displayData.map((d, i) => (
                    <g key={i}>
                      {hoveredIdx === i && (
                        <>
                          <line
                            x1={xScale(i)}
                            y1={padT}
                            x2={xScale(i)}
                            y2={svgH - padB}
                            stroke="#60a5fa"
                            strokeWidth="0.6"
                            strokeDasharray="3,3"
                            opacity={0.35}
                          />
                          <circle
                            cx={xScale(i)}
                            cy={yScale(d.score)}
                            r="5"
                            fill="#60a5fa"
                            fillOpacity="0.12"
                          />
                        </>
                      )}
                      <circle
                        cx={xScale(i)}
                        cy={yScale(d.score)}
                        r={hoveredIdx === i ? 2.5 : 1.8}
                        fill="#60a5fa"
                      />
                      <circle
                        cx={xScale(i)}
                        cy={yScale(d.score)}
                        r="10"
                        fill="transparent"
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={() => handleMouseEnter(i, d.score)}
                      />
                    </g>
                  ))}
                </svg>

                {hoveredIdx !== null &&
                  (() => {
                    const d = displayData[hoveredIdx]
                    const scrollEl = scrollContainerRef.current
                    const viewportW = scrollEl ? scrollEl.clientWidth : 300

                    const rawLeft = tooltipPos.x - TOOLTIP_W / 2
                    const left = Math.min(Math.max(rawLeft, 0), viewportW - TOOLTIP_W)

                    const showBelow = tooltipPos.y < TOOLTIP_H + 10
                    const top = showBelow ? tooltipPos.y + 14 : tooltipPos.y - TOOLTIP_H - 10

                    return (
                      <div
                        style={{
                          position: 'sticky',
                          left,
                          top,
                          marginTop: showBelow
                            ? -(CHART_HEIGHT - tooltipPos.y - 14)
                            : -(CHART_HEIGHT - tooltipPos.y + TOOLTIP_H + 10),
                          width: TOOLTIP_W,
                          background: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: 12,
                          padding: '10px 12px',
                          boxShadow: '0 6px 20px rgba(0,0,0,0.10)',
                          pointerEvents: 'none',
                          zIndex: 30
                        }}
                      >
                        <p
                          style={{
                            fontSize: 10,
                            fontWeight: 800,
                            color: '#374151',
                            marginBottom: 8,
                            textTransform: 'uppercase',
                            letterSpacing: '0.07em'
                          }}
                        >
                          {d.label}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
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

              <div
                style={{
                  width: contentWidth,
                  height: LABEL_HEIGHT,
                  position: 'relative'
                }}
              >
                {displayData.map((d, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: xScale(i),
                      top: 8,
                      transform: 'translateX(-50%)',
                      textAlign: 'center',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {d.label.split(' ').map((part, pi) => (
                      <div
                        key={pi}
                        style={{
                          fontSize: 10,
                          lineHeight: '14px',
                          color: hoveredIdx === i ? '#60a5fa' : '#94a3b8',
                          fontWeight: hoveredIdx === i ? 600 : 400,
                          transition: 'color 0.15s'
                        }}
                      >
                        {part}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

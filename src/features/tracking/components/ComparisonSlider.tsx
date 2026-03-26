import { TrendingUp, ArrowLeftRight, CalendarDays, ChevronDown, Ban } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import type {
  ComparisonResponse,
  ComparisonSliderProps,
  CustomSelectProps,
  DropdownOption
} from '../types'
import { compareAnalyses } from '../services/tracking.api'

const CustomSelect = ({
  id,
  value,
  options,
  placeholder = 'Select',
  onChange
}: CustomSelectProps) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const ITEM_H = 34
  const MAX_VISIBLE = 5
  const listMaxH = ITEM_H * MAX_VISIBLE

  return (
    <div ref={ref} style={{ position: 'relative', minWidth: 130 }} id={id}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 6,
          background: open ? '#f0f7ff' : '#f8fafc',
          border: `1px solid ${open ? '#93c5fd' : '#e2e8f0'}`,
          borderRadius: 10,
          padding: '6px 10px',
          cursor: 'pointer',
          outline: 'none',
          fontSize: 12,
          fontWeight: 500,
          color: selected ? '#334155' : '#94a3b8',
          transition: 'all 0.15s',
          whiteSpace: 'nowrap'
        }}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <ChevronDown
          size={13}
          color="#94a3b8"
          style={{
            flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s'
          }}
        />
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 5px)',
            left: 0,
            zIndex: 100,
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 12,
            boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
            overflow: 'hidden',
            minWidth: '100%'
          }}
        >
          <div
            style={{
              maxHeight: listMaxH,
              overflowY: options.length > MAX_VISIBLE ? 'auto' : 'visible',
              scrollbarWidth: 'thin',
              scrollbarColor: '#e2e8f0 transparent'
            }}
          >
            {options.map((opt) => {
              const isSelected = opt.value === value
              const isDisabled = !!opt.disabled

              return (
                <div
                  key={opt.value}
                  title={isDisabled ? 'Not available' : undefined}
                  onClick={() => {
                    if (isDisabled) return
                    onChange(opt.value)
                    setOpen(false)
                  }}
                  style={{
                    height: ITEM_H,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 12px',
                    fontSize: 12,
                    fontWeight: isSelected ? 600 : 400,
                    color: isDisabled ? '#cbd5e1' : isSelected ? '#2563eb' : '#334155',
                    background: isSelected ? '#eff6ff' : 'transparent',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    transition: 'background 0.1s',
                    gap: 6
                  }}
                  onMouseEnter={(e) => {
                    if (!isDisabled && !isSelected)
                      (e.currentTarget as HTMLDivElement).style.background = '#f8fafc'
                  }}
                  onMouseLeave={(e) => {
                    if (!isDisabled && !isSelected)
                      (e.currentTarget as HTMLDivElement).style.background = 'transparent'
                  }}
                >
                  <span>{opt.label}</span>
                  {isDisabled && <Ban size={11} color="#cbd5e1" />}
                  {isSelected && !isDisabled && (
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="#2563eb"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export const ComparisonSlider = ({ tracking }: ComparisonSliderProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = String(date.getFullYear()).slice(-2) // Lấy 2 số cuối của năm
    return `${day}/${month}/${year}`
  }

  const skinAnalyses = tracking?.skin_analyses || []
  const sortedAnalyses = [...skinAnalyses].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
  const defaultAfterId = sortedAnalyses[0]?.id || ''
  const defaultBeforeId = sortedAnalyses[1]?.id || ''
  const [selectedBefore, setSelectedBefore] = useState<string>(defaultBeforeId)
  const [selectedAfter, setSelectedAfter] = useState<string>(defaultAfterId)
  const [comparisonData, setComparisonData] = useState<ComparisonResponse | null>(null)
  const beforeAnalysis = skinAnalyses.find((a) => a.id === selectedBefore)
  const afterAnalysis = skinAnalyses.find((a) => a.id === selectedAfter)

  const isAfterDate = (analysis: (typeof skinAnalyses)[0], other?: (typeof skinAnalyses)[0]) => {
    if (!analysis || !other) return false
    return new Date(analysis.created_at).getTime() > new Date(other.created_at).getTime()
  }

  const beforeImage = beforeAnalysis?.face_image_url
  const afterImage = afterAnalysis?.face_image_url
  const scoreImprovement = comparisonData?.overall_score_difference ?? 0

  const keyChangeMetric = comparisonData?.metrics_comparison
    ?.filter((m) => m.difference !== null)
    ?.sort((a, b) => Math.abs(b.difference!) - Math.abs(a.difference!))[0]

  const latestScore = afterAnalysis?.overall_score ?? 0
  const hasComparison = beforeAnalysis && afterAnalysis

  useEffect(() => {
    if (selectedBefore && selectedAfter && selectedBefore !== selectedAfter) {
      const fetchComparison = async () => {
        try {
          const data = (await compareAnalyses({
            analysisId1: selectedBefore,
            analysisId2: selectedAfter
          })) as ComparisonResponse
          setComparisonData(data)
        } catch (error) {
          console.error('Error comparing analyses:', error)
          setComparisonData(null)
        }
      }
      fetchComparison()
    } else {
      setComparisonData(null)
    }
  }, [selectedBefore, selectedAfter])

  useEffect(() => {
    if (selectedBefore && selectedAfter) {
      const before = skinAnalyses.find((a) => a.id === selectedBefore)
      const after = skinAnalyses.find((a) => a.id === selectedAfter)
      if (before && after && !isAfterDate(after, before)) {
        setSelectedAfter('')
      }
    }
  }, [selectedBefore, selectedAfter, skinAnalyses])

  useEffect(() => {
    if (!selectedBefore && defaultBeforeId) setSelectedBefore(defaultBeforeId)
    if (!selectedAfter && defaultAfterId) setSelectedAfter(defaultAfterId)
    if (selectedBefore && !skinAnalyses.find((a) => a.id === selectedBefore))
      setSelectedBefore(defaultBeforeId)
    if (selectedAfter && !skinAnalyses.find((a) => a.id === selectedAfter))
      setSelectedAfter(defaultAfterId)
  }, [skinAnalyses, defaultBeforeId, defaultAfterId])

  const beforeOptions: DropdownOption[] = [
    ...skinAnalyses.map((analysis) => {
      let disabled = false
      if (selectedAfter) {
        const afterAnal = skinAnalyses.find((a) => a.id === selectedAfter)
        disabled = afterAnal ? !isAfterDate(afterAnal, analysis) : false
      }
      return {
        value: analysis.id,
        label: formatDate(analysis.created_at),
        disabled
      }
    })
  ]

  const afterOptions: DropdownOption[] = [
    ...skinAnalyses.map((analysis) => {
      const disabled = beforeAnalysis ? !isAfterDate(analysis, beforeAnalysis) : false
      return {
        value: analysis.id,
        label: formatDate(analysis.created_at),
        disabled
      }
    })
  ]

  const formatMetricName = (metric?: string) => {
    if (!metric) return ''
    return metric.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  }

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 20,
        padding: 20,
        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        border: '1px solid #f1f5f9',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 12
          }}
        >
          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: 'rgb(96, 165, 250)', margin: 0 }}>
              Before / After Comparison
            </p>
          </div>
          <div
            style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              color: '#16a34a',
              borderRadius: 999,
              padding: '5px 12px',
              fontSize: 12,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              whiteSpace: 'nowrap'
            }}
          >
            <TrendingUp size={12} />
            Score: {latestScore}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CalendarDays size={20} color="#94a3b8" style={{ flexShrink: 0 }} />

          <CustomSelect
            id="before-select"
            value={selectedBefore}
            options={beforeOptions}
            placeholder="Before scan"
            onChange={(newId) => {
              setSelectedBefore(newId)
              const newBefore = skinAnalyses.find((a) => a.id === newId)
              const currentAfter = skinAnalyses.find((a) => a.id === selectedAfter)
              if (newBefore && currentAfter && !isAfterDate(currentAfter, newBefore)) {
                setSelectedAfter('')
              }
            }}
          />

          <span style={{ fontSize: 13, color: '#cbd5e1', fontWeight: 400, flexShrink: 0 }}>→</span>

          <CustomSelect
            id="after-select"
            value={selectedAfter}
            options={afterOptions}
            placeholder="After scan"
            onChange={setSelectedAfter}
          />
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          flex: 1,
          overflow: 'hidden',
          borderRadius: 16,
          border: '1px solid #f1f5f9',
          minHeight: 260
        }}
      >
        {hasComparison ? (
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ width: '50%', position: 'relative', overflow: 'hidden' }}>
              <img
                src={
                  beforeImage ||
                  'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=600'
                }
                alt="Before"
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  filter: 'grayscale(20%) brightness(0.95)'
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: 12,
                  left: 12,
                  fontSize: 10,
                  color: '#fff',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'rgba(0,0,0,0.35)',
                  backdropFilter: 'blur(6px)',
                  padding: '3px 10px',
                  borderRadius: 6
                }}
              >
                Before
              </span>
            </div>

            <div style={{ width: '50%', position: 'relative', overflow: 'hidden' }}>
              <img
                src={
                  afterImage ||
                  'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=600'
                }
                alt="After"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: 12,
                  right: 12,
                  fontSize: 10,
                  color: '#fff',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'rgba(59,130,246,0.55)',
                  backdropFilter: 'blur(6px)',
                  padding: '3px 10px',
                  borderRadius: 6
                }}
              >
                After
              </span>
            </div>

            <div
              style={{
                position: 'absolute',
                inset: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                pointerEvents: 'none'
              }}
            >
              <div style={{ width: 1.5, height: '100%', background: 'rgba(255,255,255,0.7)' }} />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: '#fff',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#60a5fa'
                }}
              >
                <ArrowLeftRight size={14} />
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f8fafc'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>
                Select two analyses to compare
              </p>
              <p style={{ color: '#cbd5e1', fontSize: 11 }}>
                Choose before and after scans from the dropdowns above
              </p>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
        <div
          style={{
            background: '#f0fdf4',
            borderRadius: 14,
            padding: '12px 14px',
            border: '1px solid #dcfce7'
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: '#16a34a',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 4
            }}
          >
            Improvement
          </p>
          <p style={{ color: '#15803d', fontSize: 13, fontWeight: 700 }}>
            {scoreImprovement > 0 ? '+' : ''}
            {scoreImprovement}%
            {scoreImprovement === 0 ? ' stable' : scoreImprovement > 0 ? ' improved' : ' declined'}
          </p>
        </div>
        <div
          style={{
            background: '#eff6ff',
            borderRadius: 14,
            padding: '12px 14px',
            border: '1px solid #dbeafe'
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: '#3b82f6',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 4
            }}
          >
            Key Change
          </p>
          <p style={{ color: '#1d4ed8', fontSize: 13, fontWeight: 700 }}>
            {keyChangeMetric
              ? `${formatMetricName(keyChangeMetric.metric_type)} ${
                  (keyChangeMetric.difference ?? 0) > 0 ? '+' : ''
                }${keyChangeMetric.difference}`
              : 'No change'}
          </p>
        </div>
      </div>
    </div>
  )
}

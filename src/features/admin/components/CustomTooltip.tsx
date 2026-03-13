interface CustomTooltipProps {
  active?: boolean
  payload?: { name: string; value: number; color: string }[]
  label?: string
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 10,
        padding: '10px 14px',
        fontSize: 12,
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
      }}
    >
      <p style={{ fontWeight: 600, marginBottom: 4, color: '#374151' }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, display: 'flex', gap: 8 }}>
          <span>{p.name}:</span>
          <span style={{ fontWeight: 600 }}>
            {p.value > 1000 ? `$${(p.value / 1000).toFixed(0)}K` : p.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}

export default CustomTooltip

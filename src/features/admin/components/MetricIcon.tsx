interface MetricIconProps {
  title: string
  color: string
}

const MetricIcon = ({ title, color }: MetricIconProps) => {
  const s = { stroke: color, strokeWidth: '1.8', strokeLinecap: 'round' as const }

  if (title === 'Total Users')
    return (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" {...s} />
        <circle cx="9" cy="7" r="4" {...s} />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" {...s} />
      </svg>
    )

  if (title === 'Total Products')
    return (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="2" {...s} />
        <path d="M7 9h10M7 13h6M15 13h2" {...s} />
      </svg>
    )

  if (title === 'Active Users')
    return (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path
          d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
          fill={color}
        />
      </svg>
    )

  if (title === 'Total Revenue')
    return (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" {...s} />
        <path d="M12 6v12M9 9h4.5a1.5 1.5 0 0 1 0 3H9m0 0h5a1.5 1.5 0 0 1 0 3H9" {...s} />
      </svg>
    )

  // Active Subscriptions
  return (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="3" {...s} />
      <path d="M8 12h8M8 8h8M8 16h5" {...s} />
    </svg>
  )
}

export default MetricIcon

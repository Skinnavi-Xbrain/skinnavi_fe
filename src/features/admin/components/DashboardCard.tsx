import type { Metric } from '../types'
import MetricIcon from './MetricIcon'

const DashboardCard = ({ title, value, change, positive, bg, iconColor }: Metric) => (
  <div className="bg-white rounded-2xl p-[22px] border border-gray-100 shadow-sm">
    <div className="flex justify-between items-start mb-[14px]">
      <div
        style={{ background: bg }}
        className="w-[42px] h-[42px] rounded-xl flex items-center justify-center"
      >
        <MetricIcon title={title} color={iconColor} />
      </div>
      <span
        style={{
          color: positive ? '#10B981' : '#EF4444',
          background: positive ? '#ECFDF5' : '#FEF2F2'
        }}
        className="text-xs font-semibold px-[9px] py-[3px] rounded-full"
      >
        {change}
      </span>
    </div>
    <div className="text-[13px] text-gray-500 mb-1">{title}</div>
    <div className="text-[26px] font-bold text-gray-900">{value}</div>
  </div>
)

export default DashboardCard

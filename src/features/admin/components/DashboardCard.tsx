import type { Metric } from '../types'
import MetricIcon from './MetricIcon'

const DashboardCard = ({ title, value, bg, iconColor }: Metric) => (
  <div className="bg-white rounded-2xl p-[22px] border border-gray-100 shadow-sm">
    <div className="flex justify-between items-start mb-[14px]">
      <div
        style={{ background: bg }}
        className="w-[42px] h-[42px] rounded-xl flex items-center justify-center"
      >
        <MetricIcon title={title} color={iconColor} />
      </div>
    </div>
    <div className="text-[13px] text-gray-500 mb-1">{title}</div>
    <div className="text-[26px] font-bold text-gray-900">{value}</div>
  </div>
)

export default DashboardCard

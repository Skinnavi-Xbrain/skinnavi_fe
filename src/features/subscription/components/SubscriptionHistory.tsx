// src/features/subscription/components/SubscriptionHistory.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/shared/components/ui/table'
import { Badge } from '@/shared/components/ui/badge'
import type { UserSubscription } from '../services/subscription.api'

interface Props {
  subscriptions: UserSubscription[]
}

export const SubscriptionHistory = ({ subscriptions }: Props) => {
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    }).format(new Date(dateString))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price) + 'đ'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100'
      case 'CANCELED':
        return 'bg-red-50 text-red-600 border-red-100'
      default:
        return 'bg-slate-50 text-slate-500 border-slate-200'
    }
  }

  if (subscriptions.length === 0) return null

  return (
    <div className="mt-8">
      <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-100 bg-white">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest">
                Package
              </TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest">
                Start Date
              </TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest">
                End Date
              </TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest">
                Price
              </TableHead>
              <TableHead className="font-bold uppercase text-[10px] tracking-widest">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell className="font-bold text-slate-700">{sub.package.name}</TableCell>
                <TableCell className="text-sm text-slate-500">
                  {formatDate(sub.startDate)}
                </TableCell>
                <TableCell className="text-sm text-slate-500">{formatDate(sub.endDate)}</TableCell>
                <TableCell className="font-semibold text-slate-700">
                  {formatPrice(sub.package.price)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${getStatusColor(sub.status)} font-black uppercase text-[9px]`}
                  >
                    {sub.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden space-y-4">
        {subscriptions.map((sub) => (
          <div key={sub.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-black text-slate-800 uppercase tracking-tight">
                  {sub.package.name}
                </h4>
                <p className="text-[10px] text-slate-400 font-bold mt-1">
                  ID: {sub.id.slice(0, 8).toUpperCase()}
                </p>
              </div>
              <Badge
                variant="outline"
                className={`${getStatusColor(sub.status)} font-black uppercase text-[9px]`}
              >
                {sub.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-4">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Amount
                </span>
                <span className="text-sm font-black text-blue-500">
                  {formatPrice(sub.package.price)}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Expiry
                </span>
                <span className="text-sm font-bold text-slate-600">{formatDate(sub.endDate)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

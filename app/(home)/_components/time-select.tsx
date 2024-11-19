'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/select'
import { useRouter, useSearchParams } from 'next/navigation'

const MONTH_OPTIONS = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
]
const MonthSelect = () => {
  const { push } = useRouter()
  const searchParam = useSearchParams()
  const month = searchParam.get('month') ?? String(new Date().getMonth() + 1)

  const handleMonthChange = (month: string) => {
    push(`/?month=${month}`)
  }

  return (
    <Select
      onValueChange={(value) => handleMonthChange(value)}
      defaultValue={month ?? ''}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a month" />
      </SelectTrigger>
      <SelectContent>
        {MONTH_OPTIONS.map((month) => (
          <SelectItem key={month.value} value={month.value}>
            {month.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default MonthSelect
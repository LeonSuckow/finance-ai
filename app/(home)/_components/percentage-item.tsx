import IconAndTitle from '@/app/_components/custom/iconAndTitle'
import { ReactNode } from 'react'

interface PercentageItemProps {
  icon: ReactNode
  title: string
  value: number
}

const PercentageItem = ({ icon, title, value }: PercentageItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <IconAndTitle icon={icon} title={title} />
      <p className="text-sm font-bold">{value}%</p>
    </div>
  )
}

export default PercentageItem

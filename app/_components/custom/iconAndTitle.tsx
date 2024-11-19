import { cn } from '@/app/_lib/utils'
import { ReactNode } from 'react'
interface IconAndTitleProps {
  icon: ReactNode
  title: string
  iconClass?: string
  titleClass?: string
}
const IconAndTitle = ({
  icon,
  title,
  iconClass,
  titleClass,
}: IconAndTitleProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className={cn('rounded-lg bg-white bg-opacity-[3%] p-2', iconClass)}>
        {icon}
      </div>
      <p className={cn('text-sm text-muted-foreground', titleClass)}>{title}</p>
    </div>
  )
}

export default IconAndTitle

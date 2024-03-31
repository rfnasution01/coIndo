import { Card } from '@/components/Card'
import { getModeSlice } from '@/store/reducer/stateMode'
import clsx from 'clsx'
import { Flame } from 'lucide-react'
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'

export function CardHelper({
  title,
  mappingData,
}: {
  title: string
  mappingData?: ReactNode
}) {
  const mode = useSelector(getModeSlice)

  return (
    <Card
      variant={mode.isLight ? 'light' : 'dark'}
      color={mode?.isLight ? 'light' : 'dark'}
      radius="xl"
      classes={clsx('flex flex-col gap-y-24', {
        'col-span-4': mappingData,
        'col-span-8': !mappingData,
      })}
    >
      <div className="flex items-center gap-x-8">
        <span className="text-[2rem] font-bold">{title}</span>
        <span>
          <Flame size={18} color="red" />
        </span>
      </div>
      <div>{mappingData}</div>
    </Card>
  )
}

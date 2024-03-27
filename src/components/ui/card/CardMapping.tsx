import { ReactNode } from 'react'

export function CardMapping({
  idx,
  label,
  description,
  subLabel,
}: {
  idx: number
  label?: string | ReactNode
  description?: string | ReactNode
  subLabel?: string | ReactNode
}) {
  return (
    <div key={idx} className="flex items-center gap-x-16 text-[2rem]">
      <span className="w-1/12">{idx + 1}.</span>

      <div className="flex w-7/12 flex-col gap-y-8">
        <span className="text-[2rem] font-bold">{label}</span>
        <span className="text-[1.6rem] font-extralight">{description}</span>
      </div>
      {subLabel}
    </div>
  )
}

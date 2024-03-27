import { Pagination } from '@/components/Pagination'
import { getModeSlice } from '@/store/reducer/stateMode'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'

export function ContentTemplate({
  infoComponent,
  table,
  filter,
  totalPage,
}: {
  infoComponent?: ReactNode
  table?: ReactNode
  filter?: ReactNode
  totalPage: number
}) {
  const mode = useSelector(getModeSlice)
  return (
    <div className="mx-48 mb-32 flex h-full flex-col gap-y-32 overflow-y-auto phones:mt-32">
      {/* --- Info --- */}
      {infoComponent}
      <div
        className={clsx('flex flex-col rounded-2xl', {
          'bg-white': mode.isLight,
          'bg-dark-tint-2': !mode.isLight,
        })}
      >
        {/* --- Filter --- */}
        {filter}
        {/* --- Table --- */}
        {table}
        {/* --- Footer --- */}
        <div className="flex justify-end p-32">
          <Pagination totalPage={totalPage} />
        </div>
      </div>
    </div>
  )
}

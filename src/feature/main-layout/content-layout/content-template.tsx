import { Pagination } from '@/components/Pagination'
import { MarketsFilter } from '@/feature/markets'
import { getModeSlice } from '@/store/reducer/stateMode'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useSelector } from 'react-redux'

export function ContentTemplate({
  infoComponent,
  form,
  refetch,
  table,
  totalPage,
}: {
  infoComponent?: ReactNode
  form: UseFormReturn | undefined | any
  refetch: ReactNode
  table: ReactNode
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
          'bg-zinc-900': !mode.isLight,
        })}
      >
        {/* --- Filter --- */}
        <div className="flex items-center gap-x-32 p-32">
          <MarketsFilter form={form} />
          {refetch}
        </div>
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

import { getModeSlice } from '@/store/reducer/stateMode'
import clsx from 'clsx'
import { RefreshCcw } from 'lucide-react'
import { useSelector } from 'react-redux'

export function Refetch({ refetch }: { refetch: () => void }) {
  const mode = useSelector(getModeSlice)

  return (
    <div
      onClick={refetch}
      className={clsx(
        'flex items-center gap-x-8 rounded-lg border-2 px-24 py-12 text-[2rem] hover:cursor-pointer',
        {
          'bg-white hover:bg-background': mode.isLight,
          'bg-dark-tint-1 border-zinc-800 hover:bg-zinc-800': !mode.isLight,
        },
      )}
    >
      <span>
        <RefreshCcw size={18} />
      </span>
      <span>Refresh</span>
    </div>
  )
}

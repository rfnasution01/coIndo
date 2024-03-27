import { getModeSlice } from '@/store/reducer/stateMode'
import * as Tooltip from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'

const Tooltips = ({
  triggerComponent,
  tooltipContent,
}: {
  triggerComponent: ReactNode
  tooltipContent: ReactNode
}) => {
  const mode = useSelector(getModeSlice)

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className="hover:cursor-pointer">{triggerComponent} </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={clsx(
              'z-20 w-[15vw] rounded-xl border px-32 py-24 text-center shadow-xl',
              {
                'border-slate-300 bg-white text-black': mode.isLight,
                'bg-dark-tint-1 border-dark-background text-white':
                  !mode.isLight,
              },
            )}
            sideOffset={5}
          >
            {tooltipContent}
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default Tooltips

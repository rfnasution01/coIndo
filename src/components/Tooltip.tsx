import * as Tooltip from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'

const Tooltips = ({
  triggerComponent,
  tooltipContent,
}: {
  triggerComponent: ReactNode
  tooltipContent: ReactNode
}) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className="hover:cursor-pointer">{triggerComponent} </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-20 w-[15vw] rounded-xl border bg-white px-32 py-24 text-center shadow-xl"
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

import clsx from 'clsx'

interface ChipProps {
  children: React.ReactNode
  selected: boolean
  classes?: string
  isSubtab?: boolean
}

export const Chip = ({
  children,
  selected,
  isSubtab = false,
  classes = '',
}: ChipProps) => {
  return (
    <div
      className={clsx(
        `w-[35rem] min-w-max rounded-t-2xl border-[1.5px] border-b-0 p-16 text-center text-24 font-extrabold transition-all ease-in hover:border-border-subdued hover:bg-white hover:text-black ${classes}`,
        {
          'border-transparent text-typography-disabled': !selected && isSubtab,
          'border-surface-depressed bg-surface-depressed text-typography-disabled':
            !selected && !isSubtab,
          'border-border-subdued bg-white': selected,
        },
      )}
    >
      {children}
    </div>
  )
}

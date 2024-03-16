import clsx from 'clsx'

interface CheckboxProps extends React.ComponentProps<'input'> {
  label?: string
  direction?: 'row' | 'column'
  containerClasses?: string
}

export const Checkbox = ({
  label,
  direction = 'column',
  containerClasses = '',
  ...props
}: CheckboxProps) => {
  return (
    <div
      className={clsx(`flex gap-8 ${containerClasses}`, {
        'flex-col': direction === 'column',
        'flex-row items-center': direction === 'row',
      })}
    >
      <div
        className={clsx(
          `flex h-32 w-32 items-center justify-center gap-8 rounded-full transition-all ease-in hover:bg-neutral-100`,
        )}
      >
        <input
          className="peer relative inline-block h-[3rem] w-[3rem] cursor-pointer appearance-none rounded-md border-2 border-border bg-white transition-all ease-in checked:border-primary checked:bg-primary checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:text-14 checked:after:text-white checked:after:content-['\2714'] active:border-primary active:bg-primary"
          type="checkbox"
          {...props}
        />
      </div>

      {label && (
        <label htmlFor={props.name} className="text-14 tracking-0.1">
          {label}
        </label>
      )}
    </div>
  )
}

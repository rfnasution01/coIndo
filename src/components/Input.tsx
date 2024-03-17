import { cn } from '@/lib/helpers/utils'
import * as React from 'react'

import { FieldError } from 'react-hook-form'

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'prefix' | 'suffix'
  > {
  suffix?: React.ReactElement
  prefix?: React.ReactElement
  error?: FieldError | undefined
  onValueChange?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, error, suffix, prefix, onValueChange, ...props },
    ref,
  ) => {
    return (
      <div className={cn('relative flex w-full', className)}>
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-16">
            {prefix}
          </div>
        )}
        <input
          type={type}
          className={cn(
            `disabled:text-formText-disabled
            border-input file:text-sm
            placeholder:text-muted-foreground
            disabled:bg-form-disabled
            h-48
            flex-grow
            rounded-lg
            border-2
            border-[#8C9196]
            bg-background
            p-24
            text-[2rem]
            ring-offset-background
            transition-all
            duration-300
            file:border-0
            file:bg-transparent
            file:font-medium
            focus:shadow-primary-shade-1
          disabled:cursor-not-allowed
            disabled:opacity-50`,
            className,
            error && 'border-destructive',
            prefix && 'pl-48', // add left padding if prefix is present
            suffix && 'pr-48', // add right padding if suffix is present
          )}
          onChange={onValueChange}
          ref={ref}
          {...props}
        />
        {suffix && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-24">
            {suffix}
          </div>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }

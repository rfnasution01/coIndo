import { UseFormReturn } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/Form'
import { Input } from '.'
import { useSelector } from 'react-redux'
import { getModeSlice } from '@/store/reducer/stateMode'
import clsx from 'clsx'

export function FormLabelComponent({
  form,
  label,
  placeholder = '',
  name,
  prefix,
  suffix,
  type,
}: {
  form: UseFormReturn | any | undefined
  label?: string
  placeholder?: string
  name: string
  prefix?: JSX.Element
  suffix?: JSX.Element
  type?: 'text' | 'number'
}) {
  const mode = useSelector(getModeSlice)

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-y-8">
          <FormLabel>{label}</FormLabel>
          <Input
            {...field}
            className={clsx('', {
              'border-slate-300 bg-white': mode.isLight,
              'bg-dark-tint-1 border-zinc-700': !mode.isLight,
            })}
            type={type}
            placeholder={placeholder}
            value={field.value}
            prefix={prefix}
            suffix={suffix}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

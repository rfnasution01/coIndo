import { UseFormReturn } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/Form'
import { Input } from '.'

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
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-y-8">
          <FormLabel>{label}</FormLabel>
          <Input
            {...field}
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

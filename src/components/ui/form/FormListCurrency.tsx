import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'
import { convertSlugToText } from '@/lib/helpers/formatText'
import { cn } from '@/lib/helpers/utils'
import { RatesType } from '@/lib/interfaces/ratesProps'
import { DataSelectType, FormInputProps } from '@/lib/interfaces/selectProps'
import Select, { components } from 'react-select'

interface ListCurrencyProps extends FormInputProps {
  isDisabled?: boolean
  isLoading?: boolean
  data: RatesType[]
  placeHolder?: string
  name: string
  initialValue?: DataSelectType
}

export function FormListCurrency({
  isDisabled,
  isLoading,
  data,
  placeHolder,
  name,
  useFormReturn,
  className,
  headerLabel,
  initialValue,
}: ListCurrencyProps) {
  const Option = (props: any) => {
    return (
      <components.Option {...props}>
        <span>
          {props?.data?.symbol} - {props?.label}
        </span>
      </components.Option>
    )
  }

  let dataOptions: DataSelectType[] = []
  if (data) {
    dataOptions = data.map((item) => ({
      value: item?.id,
      label: convertSlugToText(item?.id),
      symbol: item?.symbol,
      price: Number(item?.rateUsd),
    }))
  }

  return (
    <FormField
      name={name}
      control={useFormReturn.control}
      render={({}) => (
        <FormItem className={cn('flex flex-col space-y-8', className)}>
          <FormLabel>{headerLabel}</FormLabel>
          <FormControl>
            <Select
              defaultValue={initialValue}
              placeholder={placeHolder ?? 'Pilih ...'}
              isDisabled={isDisabled}
              isLoading={isLoading}
              value={
                dataOptions.filter(
                  (item) => item.value === initialValue?.value,
                )[0]
              }
              isClearable
              isSearchable
              options={dataOptions}
              components={{ Option }}
              onChange={(optionSelected: any) => {
                useFormReturn.setValue(name, optionSelected.value)
                useFormReturn.setValue(
                  name.includes('idCurrency1')
                    ? 'priceCurrency1'
                    : 'priceCurrency2',
                  optionSelected.price,
                )
                useFormReturn.setValue(
                  name.includes('idCurrency1')
                    ? 'symbolCurrency1'
                    : 'symbolCurrency2',
                  optionSelected.symbol,
                )
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

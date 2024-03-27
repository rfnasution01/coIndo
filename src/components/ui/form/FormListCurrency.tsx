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
import { getModeSlice } from '@/store/reducer/stateMode'
import { useSelector } from 'react-redux'
import Select, { components } from 'react-select'
import { customStyles } from '@/lib/interfaces/selectProps'

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
  const mode = useSelector(getModeSlice)

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
      render={({ field }) => (
        <FormItem className={cn('flex flex-col space-y-8', className)}>
          <FormLabel>{headerLabel}</FormLabel>
          <FormControl>
            <Select
              {...field}
              styles={{
                ...customStyles,
                singleValue: (provided) => ({
                  ...provided,
                  color: mode.isLight ? 'black' : 'grey',
                }),
                input: (provided) => ({
                  ...provided,
                  color: mode.isLight ? 'black' : 'grey',
                }),
                menuList: (provided) => ({
                  ...provided,
                  padding: 0,
                  maxHeight: '50vh',
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': {
                    width: 0,
                    height: 0,
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: 'transparent',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'transparent',
                    borderRadius: '6px',
                  },
                }),
                control: (provided) => ({
                  ...provided,
                  backgroundColor: mode.isLight
                    ? 'rgb(255 255 255 / var(--tw-bg-opacity))'
                    : 'rgb(51 65 85 / var(--tw-bg-opacity))',
                  border: mode.isLight
                    ? '1px solid rgb(203 213 225 / var(--tw-bg-opacity))'
                    : 'background-color: rgb(15 23 42 / var(--tw-bg-opacity))',
                  borderRadius: '0.375rem',
                }),
                option: (provided) => ({
                  ...provided,
                  backgroundColor: mode.isLight
                    ? 'rgb(255 255 255 / var(--tw-bg-opacity))'
                    : 'rgb(51 65 85 / var(--tw-bg-opacity))',
                  color: mode.isLight
                    ? 'rgb(32 34 35 / var(--tw-bg-opacity))'
                    : 'rgb(255 255 255 / var(--tw-bg-opacity))',
                  cursor: isDisabled ? 'not-allowed' : 'default',
                  ':hover': {
                    cursor: 'pointer',
                    backgroundColor: mode.isLight
                      ? 'rgb(240 244 247 / var(--tw-bg-opacity))'
                      : 'rgb(30 41 59 / var(--tw-bg-opacity))',
                  },
                }),
              }}
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
                const isIdCurrency1 = name.includes('idCurrency1')

                useFormReturn.setValue(name, optionSelected?.value)
                useFormReturn.setValue(
                  isIdCurrency1 ? 'priceCurrency1' : 'priceCurrency2',
                  optionSelected.price,
                )
                useFormReturn.setValue(
                  isIdCurrency1 ? 'symbolCurrency1' : 'symbolCurrency2',
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

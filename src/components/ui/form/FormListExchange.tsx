import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'
import { convertSlugToText } from '@/lib/helpers/formatText'
import { cn } from '@/lib/helpers/utils'
import { ExchangeType } from '@/lib/interfaces/exchangesProps'
import { DataSelectType, FormInputProps } from '@/lib/interfaces/selectProps'
import { getModeSlice } from '@/store/reducer/stateMode'
import { useSelector } from 'react-redux'
import Select, { components } from 'react-select'
import { customStyles } from '@/lib/interfaces/selectProps'

interface ListExchangeProps extends FormInputProps {
  isDisabled?: boolean
  isLoading?: boolean
  data: ExchangeType[]
  placeHolder?: string
  name: string
  initialValue?: DataSelectType
}

export function FormListExchange({
  isDisabled,
  isLoading,
  data,
  placeHolder,
  name,
  useFormReturn,
  className,
  headerLabel,
  initialValue,
}: ListExchangeProps) {
  const mode = useSelector(getModeSlice)
  const Option = (props: any) => {
    return (
      <components.Option {...props}>
        <span>{props?.label}</span>
      </components.Option>
    )
  }

  let dataOptions: DataSelectType[] = []
  if (data) {
    dataOptions = data.map((item) => ({
      value: item?.exchangeId,
      label: convertSlugToText(item?.name),
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
                dataOptions.filter((item) => item.value === field?.value)[0]
              }
              isClearable
              isSearchable
              options={dataOptions}
              components={{ Option }}
              onChange={(optionSelected: any) => {
                useFormReturn.setValue(name, optionSelected?.value)
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

import { convertSlugToText } from '@/lib/helpers/formatText'
import { RatesType } from '@/lib/interfaces/ratesProps'
import { DataSelectType } from '@/lib/interfaces/selectProps'
import { Dispatch, SetStateAction } from 'react'
import Select, { components } from 'react-select'

export default ({
  isDisabled,
  isLoading,
  data,
  placeHolder,
  setValue,
}: {
  isDisabled?: boolean
  isLoading?: boolean
  data: RatesType[]
  placeHolder?: string
  setValue: Dispatch<SetStateAction<number | undefined>>
}) => {
  const Option = (props: any) => {
    return (
      <components.Option {...props}>
        <div className="">
          {props?.data?.symbol} - {props?.label}
        </div>
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
    <Select
      classNamePrefix="select"
      placeholder={placeHolder ?? 'Pilih ...'}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isClearable
      isSearchable
      options={dataOptions}
      components={{ Option }}
      onChange={(optionSelected) => {
        setValue(optionSelected?.price)
      }}
    />
  )
}

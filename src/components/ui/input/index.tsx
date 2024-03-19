import { Input } from '@/components/Input'
import { Dispatch, SetStateAction, ChangeEvent } from 'react'

type FormLabelProps = {
  label?: string
  type: 'text' | 'number'
  setNumberValue?: Dispatch<SetStateAction<number | undefined>>
  setTextValue?: Dispatch<SetStateAction<string | undefined>>
}

export function FormLabel({
  label,
  type,
  setNumberValue,
  setTextValue,
}: FormLabelProps) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (type === 'text' && setTextValue) {
      setTextValue(value)
    } else if (type === 'number' && setNumberValue) {
      const numberValue = parseFloat(value)
      setNumberValue(isNaN(numberValue) ? undefined : numberValue)
    }
  }

  return (
    <div className="flex flex-col gap-y-12">
      {label && <h5 className="text-[2rem]">{label}</h5>}
      <Input placeholder="Jumlah" type={type} onChange={onChange} />
    </div>
  )
}

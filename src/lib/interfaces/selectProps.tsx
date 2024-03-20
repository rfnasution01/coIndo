import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  UseFormReturn,
} from 'react-hook-form'

export type DataSelectType = {
  value: number | string
  label: string
  price?: number
}
export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  headerLabel?: string
  useFormReturn: UseFormReturn | any | undefined
  formName?: string
  isDisabled?: boolean
}

export type FormInputPropsType<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  headerLabel?: string
  useFormReturn: UseFormReturn
  formName?: string
  isDisabled?: boolean
  className?: string
} & UseControllerProps<TFieldValues, TName>

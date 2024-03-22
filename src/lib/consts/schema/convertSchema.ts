import * as zod from 'zod'

export const convertSchema = zod.object({
  idCurrency1: zod.number().optional(),
  idCurrency2: zod.number().optional(),
  jumlah: zod.number().optional(),
  priceCurrency1: zod.number().optional(),
  priceCurrency2: zod.number().optional(),
  symbolCurrency1: zod.string().optional(),
  symbolCurreny2: zod.string().optional(),
})

export type ConvertType = {
  idCurrency1: number
  idCurrency2: number
  jumlah: number
  priceCurrency1: number
  priceCurrency2: number
  symbolCurrency1: string
  symbolCurrency2: string
}

import * as zod from 'zod'

export const convertSchema = zod.object({
  jumlah: zod.number().optional(),
  priceFIAT: zod.number().optional(),
  priceCrypto: zod.number().optional(),
  symbolOrigin: zod.string().optional(),
  symbolCurrency: zod.string().optional(),
})

export type ConvertType = {
  jumlah: number
  priceFIAT: number
  priceCrypto: number
  symbolFIAT: string
  symbolCrypto: string
}

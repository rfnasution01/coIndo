import * as zod from 'zod'

export const marketSchema = zod.object({
  exchangeId: zod.string().optional(),
  baseSymbol: zod.string().optional(),
  baseId: zod.string().optional(),
  quoteSymbol: zod.string().optional(),
  quoteId: zod.string().optional(),
})

export type MarketType = {
  exchangeId: string
  baseSymbol: string
  baseId: string
  quoteSymbol: string
  quoteId: string
}

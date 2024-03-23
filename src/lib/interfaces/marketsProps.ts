export type MarketsType = {
  exchangeId: string
  rank: string
  baseSymbol: string
  baseId: string
  quoteSymbol: string
  quoteId: string
  priceQuote: string
  priceUsd: string
  volumeUsd24Hr: string
  percentExchangeVolume: string
  tradesCount24Hr: string
  updated: number
}

export type MarketsParams = {
  exchangeId?: string
  baseSymbol?: string
  baseId?: string
  quoteSymbol?: string
  quoteId?: string
  assetSymbol?: string
  assetId?: string
  limit?: number
  offset?: number
}

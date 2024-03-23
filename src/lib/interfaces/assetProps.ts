export type AssetsType = {
  id: string
  rank: string
  symbol: string
  name: string
  supply: string
  maxSupply: string
  marketCapUsd: string
  volumeUsd24Hr: string
  priceUsd: string
  changePercent24Hr: string
  vwap24Hr: string
  explorer: string
}

export type AssetsHistoryType = {
  priceUsd: string
  time: number
}

export type AssetsMarketType = {
  exchangeId: string
  baseId: string
  quoteId: string
  baseSymbol: string
  quoteSymbol: string
  volumeUsd24Hr: string
  priceUsd: string
  volumePercent: string
}
export type AssetsParams = {
  search?: string
  limit?: number
  offset?: number
  id?: string
}

export type AssetsHistoryParams = {
  id: string
  interval: 'm1' | 'm5' | 'm15' | 'm30' | 'h1' | 'h2' | 'h6' | 'h12' | 'd1'
  start?: number
  end?: number
}

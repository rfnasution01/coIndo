export type CandlesType = {
  open: string
  high: string
  low: string
  close: string
  volume: string
  period: number
}

export type CandlesParams = {
  exchange: string
  interval:
    | 'm1'
    | 'm5'
    | 'm15'
    | 'm30'
    | 'h1'
    | 'h2'
    | 'h4'
    | 'h8'
    | 'h12'
    | 'd1'
    | 'w1'
  baseId: string
  quoteId: string
  start: number
  end: number
}

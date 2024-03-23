import { CandlesParams, CandlesType } from '@/lib/interfaces/candlesProps'
import { Res, api } from '../api'

export const candlesEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getCandles: builder.query<Res<CandlesType[]>, CandlesParams>({
      query: ({ exchange, interval, baseId, quoteId, start, end }) => ({
        url: 'candles',
        params: {
          ...(exchange && { exchange }),
          ...(interval && { interval }),
          ...(baseId && { baseId }),
          ...(quoteId && { quoteId }),
          ...(start && { start }),
          ...(end && { end }),
        },
      }),
    }),
  }),
})

export const { useGetCandlesQuery } = candlesEndpoints

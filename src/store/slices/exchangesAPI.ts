import { ExchangeType } from '@/lib/interfaces/exchangesProps'
import { Res, api } from '../api'

export const exchangesEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getExchanges: builder.query<Res<ExchangeType[]>, void>({
      query: () => ({
        url: 'exchanges',
      }),
    }),
  }),
})

export const { useGetExchangesQuery } = exchangesEndpoints

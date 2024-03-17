import { Res, api } from '../api'
import { RatesType } from '@/lib/interfaces/ratesProps'

export const antreanEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getRates: builder.query<Res<RatesType[]>, void>({
      query: () => ({
        url: 'rates',
      }),
    }),
  }),
})

export const { useGetRatesQuery } = antreanEndpoints

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StateCurrencyType = {
  symbol: string
  currencySymbol: string
  price: number
  id: string
}

const initialState: StateCurrencyType = {
  symbol: 'USD',
  currencySymbol: '$',
  price: 1,
  id: 'united-states-dollar',
}

const stateCurrencySlice = createSlice({
  name: 'stateCurrency',
  initialState,
  reducers: {
    setStateCurrency: (state, action: PayloadAction<StateCurrencyType>) => {
      const { symbol, currencySymbol, price, id } = action.payload
      state.symbol = symbol
      state.currencySymbol = currencySymbol
      state.price = price
      state.id = id
    },
  },
})

export const { setStateCurrency } = stateCurrencySlice.actions

export const getCurrencySlice = (state: { stateCurrency: StateCurrencyType }) =>
  state.stateCurrency

export default stateCurrencySlice.reducer

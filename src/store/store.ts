import { configureStore } from '@reduxjs/toolkit'

import { api } from './api'
import stateCurrencySlices from './reducer/stateCurrency.ts'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    stateCurrency: stateCurrencySlices,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import { configureStore } from '@reduxjs/toolkit'

import { api } from './api'
import stateCurrencySlices from './reducer/stateCurrency.ts'
import stateModeSlices from './reducer/stateMode.ts'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    stateCurrency: stateCurrencySlices,
    stateMode: stateModeSlices,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

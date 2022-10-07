import { configureStore } from '@reduxjs/toolkit'

import exchangeParams from './slices/exchangeParams'
import exchangeHistory from './slices/exchangeHistory'
import exchangeRates from './slices/exchangeRates'

const store = configureStore({
    reducer: {
        exchangeParams,
        exchangeHistory,
        exchangeRates,
    },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

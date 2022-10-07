import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import exchangeApi from 'api/ExchangeApi'
import { ExchangeRates } from 'types/api'

interface State {
    loading: boolean
    data?: ExchangeRates
}

const initialState: State = {
    loading: false,
}

export const fetchExchangeRates = createAsyncThunk(
    'exchangeRates/fetchExchangeRates',
    (_, { getState }): Promise<ExchangeRates | undefined> => {
        const state = getState() as State
        if (state.loading) {
            return Promise.resolve(state.data)
        }
        return exchangeApi.fetchExchangeRates()
    }
)

const exchangeRatesSlice = createSlice({
    name: 'exchangeRates',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchExchangeRates.fulfilled, (state, action) => {
            state.data = action.payload
        })
    },
})

export default exchangeRatesSlice.reducer

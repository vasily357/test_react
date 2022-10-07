import { createSlice } from '@reduxjs/toolkit'

import { ExchangeParams } from 'types/exchange'

const initialState: ExchangeParams = {}

const exchangeParamsSlice = createSlice({
    name: 'exchangeParams',
    initialState,
    reducers: {
        setExchangeParams(state, action) {
            return { ...(state || {}), ...action.payload }
        },
    },
})

export const { setExchangeParams } = exchangeParamsSlice.actions

export default exchangeParamsSlice.reducer

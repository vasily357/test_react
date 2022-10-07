import { createSlice } from '@reduxjs/toolkit'

import { ExchangeParams } from 'types/exchange'

const initialState: Required<ExchangeParams & { key: string }>[] = []

const exchangeHistorySlice = createSlice({
    name: 'exchangeHistory',
    initialState,
    reducers: {
        addItem(state, action) {
            const key = `${action.payload.amount}${action.payload.from}${action.payload.to}`
            if (state.find((item) => item.key === key)) {
                return state
            }
            return [...state, { ...action.payload, key }]
        },
        deleteItem(state, action) {
            return state.filter((item) => item.key !== action.payload)
        },
    },
})

export const { addItem, deleteItem } = exchangeHistorySlice.actions

export default exchangeHistorySlice.reducer

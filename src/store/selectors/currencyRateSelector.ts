import { createSelector } from '@reduxjs/toolkit'

import { CurrencyCode } from 'types/api'
import { RootState } from 'store/index'

export const currencyRateSelector = createSelector(
    [
        (state: RootState) => state.exchangeRates.data,
        (_, currencyCode: CurrencyCode | undefined) => currencyCode,
    ],
    (exchangeRates, currencyCode) =>
        currencyCode === undefined ? undefined : exchangeRates?.[currencyCode]
)

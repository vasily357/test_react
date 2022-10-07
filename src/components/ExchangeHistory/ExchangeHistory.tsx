import React from 'react'

import { useSelector } from 'hooks/redux'
import { ExchangeHistoryItem } from './components/ExchangeHistoryItem'

export const ExchangeHistory: React.FC = () => {
    const exchangeHistory = useSelector((state) => state.exchangeHistory)

    return (
        <>
            {exchangeHistory.map(({ amount, from, to, key }) => (
                <ExchangeHistoryItem
                    key={key}
                    itemKey={key}
                    amount={amount}
                    from={from}
                    to={to}
                />
            ))}
        </>
    )
}

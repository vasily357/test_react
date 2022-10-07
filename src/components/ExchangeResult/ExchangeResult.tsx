import React, { useCallback } from 'react'

import styles from './ExchangeResult.scss'

import { useDispatch, useSelector } from 'hooks/redux'
import { Button } from 'components/ui/Button'
import { addItem } from 'store/slices/exchangeHistory'
import { ExchangeResultItem } from 'components/ExchangeResultItem'
import { getExchangeResult } from 'utils/getExchangeResult'
import { currencyRateSelector } from 'store/selectors/currencyRateSelector'

export const ExchangeResult: React.FC = () => {
    const exchangeParams = useSelector((state) => state.exchangeParams)
    const dispatch = useDispatch()

    const handleClickObserveButton = useCallback(
        () => dispatch(addItem(exchangeParams)),
        [dispatch, exchangeParams]
    )
    const { amount, from, to } = exchangeParams
    const rateFrom = useSelector((state) => currencyRateSelector(state, from))
    const rateTo = useSelector((state) => currencyRateSelector(state, to))
    const exchangeResult = getExchangeResult({ amount, rateFrom, rateTo })
    return (
        <div className={styles.resultContainer}>
            <>
                <ExchangeResultItem
                    amount={amount}
                    from={from}
                    to={to}
                    result={exchangeResult}
                />
                {Boolean(amount && from && to) && (
                    <Button
                        color="green-white"
                        onClick={handleClickObserveButton}
                    >
                        Observe
                    </Button>
                )}
            </>
        </div>
    )
}

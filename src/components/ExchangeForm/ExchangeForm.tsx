import React, { ChangeEvent, useCallback } from 'react'

import styles from './ExchangeForm.scss'

import { Input } from 'components/ui/Input'
import { Select, SelectOption } from 'components/ui/Select'
import { CurrencyCode } from 'types/api'
import { useDispatch } from 'hooks/redux'
import { setExchangeParams } from 'store/slices/exchangeParams'

const currencyOptions: SelectOption[] = [
    { value: 'EUR', caption: 'EUR' },
    { value: 'USD', caption: 'USD' },
    { value: 'JPY', caption: 'JPY' },
    { value: 'RUB', caption: 'RUB' },
    { value: 'GBP', caption: 'GBP' },
]

export const ExchangeForm: React.FC = () => {
    const dispatch = useDispatch()

    const handleAmountChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(setExchangeParams({ amount: Number(event.target.value) }))
        },
        [dispatch]
    )

    const handleSelectFrom = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            dispatch(
                setExchangeParams({ from: event.target.value as CurrencyCode })
            )
        },
        [dispatch]
    )

    const handleSelectTo = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            dispatch(
                setExchangeParams({ to: event.target.value as CurrencyCode })
            )
        },
        [dispatch]
    )

    return (
        <div className={styles.formWrapper}>
            <div className={styles.inputWrapper}>
                <Input
                    type="number"
                    placeholder="amount"
                    onChange={handleAmountChange}
                />
            </div>
            <div className={styles.inputWrapper}>
                <span>From:</span>
                <Select
                    options={currencyOptions}
                    placeholder="choose a currency"
                    onChange={handleSelectFrom}
                />
            </div>
            <div className={styles.inputWrapper}>
                <span>To:</span>
                <Select
                    options={currencyOptions}
                    placeholder="choose a currency"
                    onChange={handleSelectTo}
                />
            </div>
        </div>
    )
}

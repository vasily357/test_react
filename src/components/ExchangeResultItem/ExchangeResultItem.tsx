import React from 'react'

import styles from './ExchangeResultItem.scss'

import { CurrencyCode } from 'types/api'

interface Props {
    amount?: number
    result?: number
    from?: CurrencyCode
    to?: CurrencyCode
}

const ExchangeResultItemComponent: React.FC<Props> = ({
    amount,
    from,
    to,
    result,
}) => {
    if (!amount || !from || !to || !result) {
        return <></>
    }
    return (
        <div className={styles.resultWrapper}>
            {amount} <b>{from}</b> = {result} <b>{to}</b>
        </div>
    )
}

export const ExchangeResultItem = React.memo(ExchangeResultItemComponent)

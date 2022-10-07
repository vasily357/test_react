import React, { useEffect } from 'react'

import 'react-toastify/dist/ReactToastify.css'
import 'styles/styles.scss'

import { useDispatch } from 'hooks/redux'
import { fetchExchangeRates } from 'store/slices/exchangeRates'
import { ExchangeForm } from 'components/ExchangeForm'
import { ExchangeResult } from 'components/ExchangeResult'
import { ExchangeHistory } from 'components/ExchangeHistory'
import { API_POLING_INTERVAL } from 'constants/index'
import { ToastContainer, toast } from 'react-toastify'

export const App: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(fetchExchangeRates()).catch((e) => toast(e.message))
        }, API_POLING_INTERVAL)

        return () => {
            clearInterval(interval)
        }
    }, [dispatch])

    return (
        <main>
            <h1>CurrEx</h1>
            <p>online smart currency converter</p>
            <ExchangeForm />
            <ExchangeResult />
            <ExchangeHistory />
            <ToastContainer position="top-center" />
        </main>
    )
}

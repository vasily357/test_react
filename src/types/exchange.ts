import { CurrencyCode } from './api'

export type ExchangeParams = {
    amount?: number
    from?: CurrencyCode
    to?: CurrencyCode
}

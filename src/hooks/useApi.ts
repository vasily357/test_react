import { ExchangeRates } from 'types/api'

export default function () {
    let countCalls = 0
    async function fetchExchangeRates(): Promise<ExchangeRates> {
        countCalls++
        if (countCalls % 60 === 0) {
            throw new Error('Failed to fetch exchange rates')
        }
        return {
            USD: 1,
            EUR: 1.11193,
            JPY: 141.01,
            RUB: 0.0163863,
            GBP: 0.883,
        }
    }
    return { fetchExchangeRates }
}

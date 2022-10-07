import { ExchangeRates } from 'types/api'
import { random } from 'utils/random'

class ExchangeApi {
    private countCalls = 0

    async fetchExchangeRates(): Promise<ExchangeRates> {
        this.countCalls++
        if (this.countCalls % 60 === 0) {
            throw new Error('Failed to fetch exchange rates')
        }
        await new Promise((resolve) => setTimeout(resolve, 2000))
        return {
            USD: 1,
            EUR: random(1, 1.5), //1.11193,
            JPY: random(141, 145), // 141.01,
            RUB: random(60, 65), // 0.0163863,
            GBP: random(0.5, 1), // 0.883,
        }
    }
}

export default new ExchangeApi()

import { fetchExchangeRates } from './services/parser.service'
import { sendMessage } from './services/telegram.service'
import { CurrencyRates } from './types/rates.type'
import { compareRates } from './services/compare.service'

app()

async function app(previousRates?: CurrencyRates): Promise<void> {
  let exchangeRates: CurrencyRates

  try {
    exchangeRates = await fetchExchangeRates()
    const message: string = compareRates(exchangeRates, previousRates)
    if (message !== '') { await sendMessage(message) }
  } finally {
    setTimeout((): void => {
      app(exchangeRates)
    }, 10 * 60 * 1000)
  }
}
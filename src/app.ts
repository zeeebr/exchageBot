import { fetchExchangeRates } from './services/parser.service'
import { sendMessage } from './services/telegram.service'
import { CurrencyRates } from './types/rates.type'
import { compareRates } from './services/compare.service'

app()

async function app(previousRates?: CurrencyRates): Promise<void> {
  const exchangeRates: CurrencyRates = await fetchExchangeRates()
  const message: string = compareRates(exchangeRates, previousRates)
  if (message !== '') { await sendMessage(message) }

  setTimeout((): void => {
    app(exchangeRates)
  }, 0.2 * 60 * 1000)
}
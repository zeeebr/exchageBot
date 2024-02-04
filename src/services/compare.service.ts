import { DateTime } from 'luxon'
import { CurrencyRateDetails, CurrencyRates } from '../types/rates.type'

export function compareRates(currentData: CurrencyRates, previousData?: CurrencyRates): string {
  const currencies: string[] = Object.keys(currentData)

  if (!previousData) {
    const resultMessages: string[] = currencies.map(currency => {
      const currentRates: CurrencyRateDetails = currentData[currency]

      const icon = (currency === 'kztToUsd') ? '$' : (currency === 'kztToRub') ? '₽' : '???'
      const updatedAt: string = DateTime.fromMillis(currentRates.updatedAt).toFormat('dd.MM.yyyy HH:mm')

      return `${icon} Buy: ${currentRates.buy}, Sell: ${currentRates.sell} (updatedAt: ${updatedAt})`
    })

    return resultMessages.join('\n')
  }

  const resultMessages: string[] = currencies.map(currency => {
    const currentRates: CurrencyRateDetails = currentData[currency]
    const previousRates: CurrencyRateDetails = previousData[currency]

    const buyChanged: boolean = currentRates.buy !== previousRates.buy;
    const sellChanged: boolean = currentRates.sell !== previousRates.sell

    if (buyChanged || sellChanged) {
      const icon = (currency === 'kztToUsd') ? '$' : (currency === 'kztToRub') ? '₽' : '???'
      const updatedAt: string = DateTime.fromMillis(currentRates.updatedAt).toFormat('dd.MM.yyyy HH:mm')

      const changes: string[] = [
        buyChanged ? `Buy: ${previousRates.buy} -> ${currentRates.buy}` : '',
        sellChanged ? `Sell: ${previousRates.sell} -> ${currentRates.sell}` : ''
      ]

      return `${icon} ${changes.filter(change => change !== '').join(', ')} (updatedAt: ${updatedAt})`
    }

    return ''
  })

  return resultMessages.filter(message => message !== '').join('\n')
}
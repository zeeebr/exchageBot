import axios from 'axios'
import { load } from 'cheerio'
import { DateTime } from 'luxon'
import { CurrencyRateDetails, CurrencyRates } from '../types/rates.type'

export async function fetchExchangeRates(): Promise<CurrencyRates> {
  try {
    const { data: html } = await axios.get('https://ifin.kz/exchanger/valuta-sk/branch/34104')

    return {
      kztToUsd: ratesExtractor(html, 'Доллар США'),
      kztToRub: ratesExtractor(html, 'Российский рубль')
    }
  } catch (err) {
    console.error(err)
    throw err
  }
}

function ratesExtractor(html: string, currencyName: string): CurrencyRateDetails  {
  const $ = load(html)

  const container = $(`div[class="currency-name"]:contains('${currencyName}')`).closest('div[class^="block-currency-rate"]')

  const date: string = container.find('div[class="text-detail date-rate"]').text().trim()
  const updatedAt: number = DateTime.fromFormat(date, 'dd.MM.yyyy HH:mm').toMillis()

  const buy: number = parseFloat(container.find('div:contains("Покупка")').next('div[class="currency-rate-big"]').text().trim())
  const sell: number = parseFloat(container.find('div:contains("Продажа")').next('div[class="currency-rate-big"]').text().trim())

  return { buy, sell, updatedAt }
}
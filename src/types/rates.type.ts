export type CurrencyRateDetails = {
  buy: number
  sell: number
  updatedAt: number
}

export type CurrencyRates = {
  [currency: string]: CurrencyRateDetails
}

export function convertToUSD(currency: number) {
  if (currency === 0) {
    return 0
  }
  return 1 / currency
}

export function roundToNDecimals(number = 0, n = 0) {
  const multiplier = Math.pow(10, n)
  return Math.round(number * multiplier) / multiplier
}

export function calculateCurrency({
  cryptoCurrency = 0,
  fiatCurrency = 0,
  jumlah = 1,
}: {
  cryptoCurrency: number
  fiatCurrency: number
  jumlah: number
}) {
  const originalFIATPrice = convertToUSD(fiatCurrency)
  const prices = originalFIATPrice * cryptoCurrency * jumlah
  if (prices > 1000) {
    return roundToNDecimals(prices, 0)
  } else if (prices > 100) {
    return roundToNDecimals(prices, 1)
  } else if (prices > 10) {
    return roundToNDecimals(prices, 2)
  } else if (prices > 1) {
    return roundToNDecimals(prices, 4)
  } else {
    return roundToNDecimals(prices, 6)
  }
}

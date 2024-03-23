import { Badge } from '@/components/Badge'
import { Column } from '@/components/Table'
import { FormatManipulationComponent } from '@/lib/helpers/formatComponent'
import { calculateCurrency, roundToNDecimals } from '@/lib/helpers/formatNumber'
import { capitalizeFirstLetterFromLowercase } from '@/lib/helpers/formatText'
import { MarketsType } from '@/lib/interfaces/marketsProps'
import { getCurrencySlice } from '@/store/reducer/stateCurrency'
import { useSelector } from 'react-redux'

export const columnsMarkets: Column<MarketsType>[] = [
  {
    header: 'Exchange',
    key: 'exchangeId',
    width: '!min-w-[12rem]',
    renderCell(rowData) {
      return (
        <span>
          {capitalizeFirstLetterFromLowercase(
            rowData?.exchangeId.toLocaleLowerCase(),
          )}
        </span>
      )
    },
  },
  {
    header: 'Pairs',
    key: 'baseSymbol',
    width: '!min-w-[12rem]',
    renderCell(rowData) {
      return (
        <span>
          {rowData?.baseSymbol} / {rowData?.quoteSymbol}
        </span>
      )
    },
  },
  {
    header: 'Harga',
    key: 'priceUsd',
    width: '!min-w-[12rem]',
    renderCell(rowData) {
      return <FormatNumber cryptoCurrency={Number(rowData?.priceUsd)} />
    },
  },
  {
    header: '24Hr %',
    key: 'percentExchangeVolume',
    width: '!min-w-[12rem]',
    renderCell(rowData) {
      const percent24Hr = Number(rowData?.percentExchangeVolume)
      const isPositive = percent24Hr >= 0

      return (
        <Badge variant={isPositive ? 'success' : 'danger'}>
          {roundToNDecimals(percent24Hr, percent24Hr * 100 < 1 ? 4 : 2)}
        </Badge>
      )
    },
  },
  {
    header: 'Volume 24Hr ',
    key: 'volumeUsd24Hr',
    width: '!min-w-[12rem]',
    renderCell(rowData) {
      return <FormatNumber cryptoCurrency={Number(rowData?.volumeUsd24Hr)} />
    },
  },
  { header: 'Count 24Hr', key: 'tradesCount24Hr', width: '!min-w-[12rem]' },
]

export const FormatNumber = ({
  cryptoCurrency,
}: {
  cryptoCurrency: number
}) => {
  const stateCurrency = useSelector(getCurrencySlice)
  const fiatCurrency = Number(stateCurrency.price)
  const fiatSymbol = stateCurrency.currencySymbol

  const price = calculateCurrency({
    cryptoCurrency: Number(cryptoCurrency),
    fiatCurrency: fiatCurrency,
    jumlah: 1,
  })
  return (
    <FormatManipulationComponent price={price} currencySymbol={fiatSymbol} />
  )
}

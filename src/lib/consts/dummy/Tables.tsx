import { Badge } from '@/components/Badge'
import { Column } from '@/components/Table'
import { FormatManipulationComponent } from '@/lib/helpers/formatComponent'
import {
  calculateCurrency,
  convertNumberToString,
  roundToNDecimals,
} from '@/lib/helpers/formatNumber'
import { capitalizeFirstLetterFromLowercase } from '@/lib/helpers/formatText'
import { AssetsType } from '@/lib/interfaces/assetProps'
import { ExchangeType } from '@/lib/interfaces/exchangesProps'
import { MarketsType } from '@/lib/interfaces/marketsProps'
import { getCurrencySlice } from '@/store/reducer/stateCurrency'
import { useSelector } from 'react-redux'

export const columnsAssets: Column<AssetsType>[] = [
  {
    header: 'Name',
    key: 'name',
    info: 'Pengidentifikasi unik untuk nama assets',
    // width: '!min-w-[12rem]',
    renderCell(rowData) {
      return (
        <span>
          {capitalizeFirstLetterFromLowercase(
            rowData?.name.toLocaleLowerCase(),
          )}
        </span>
      )
    },
  },
  {
    header: 'Symbol',
    key: 'symbol',
    info: 'Symbol untuk mengidentifikasi asset yang ditawarkan exchange',
  },
  {
    header: 'Harga',
    key: 'priceUsd',
    info: 'Jumlah uang yang digunakan untuk memperdagangkan 1 aset',
    // width: '!min-w-[12rem]',
    renderCell(rowData) {
      return <FormatNumber cryptoCurrency={Number(rowData?.priceUsd)} />
    },
  },
  {
    header: '24Hr %',
    key: 'changePercent24Hr',
    info: 'arah dan perubahan nilai dalam 24 jam terakhir',
    // width: '!min-w-[12rem]',
    renderCell(rowData) {
      const percent24Hr = Number(rowData?.changePercent24Hr)
      const isPositive = percent24Hr >= 0

      return (
        <Badge variant={isPositive ? 'success' : 'danger'}>
          {roundToNDecimals(percent24Hr, 2)}
        </Badge>
      )
    },
  },
  {
    header: 'Volume 24Hr ',
    key: 'volumeUsd24Hr',
    info: 'Volume yang ditransaksikan di pasar ini dalam 24 jam terakhir',
    // width: '!min-w-[12rem]',
    renderCell(rowData) {
      return <FormatNumber cryptoCurrency={Number(rowData?.volumeUsd24Hr)} />
    },
  },
  {
    header: 'Supply',
    key: 'supply',
    info: 'Supply tersedia untuk trading',
    renderCell(rowData) {
      return <span>{roundToNDecimals(Number(rowData.supply))}</span>
    },
  },
  {
    header: 'Max Supply',
    key: 'maxSupply',
    info: 'Total kuantitas asset',
    renderCell(rowData) {
      return (
        <span>
          {rowData?.maxSupply ? (
            convertNumberToString(Number(rowData?.maxSupply))
          ) : (
            <Badge variant="general">Unlimited</Badge>
          )}
        </span>
      )
    },
  },
  {
    header: 'Market Cap',
    key: 'marketCapUsd',
    info: 'Supply dikali harga',
    renderCell(rowData) {
      return <span>{roundToNDecimals(Number(rowData.marketCapUsd))}</span>
    },
  },
]

export const columnsMarkets: Column<MarketsType>[] = [
  {
    header: 'Market',
    key: 'exchangeId',
    info: 'Pengidentifikasi unik untuk nama exchange',
    // width: '!min-w-[12rem]',
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
    info: 'Kombinasi dari aset yang dibeli dan mata uang yang digunakan untuk membeli',
    // width: '!min-w-[12rem]',
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
    info: 'Jumlah uang yang digunakan untuk memperdagangkan 1 aset',
    // width: '!min-w-[12rem]',
    renderCell(rowData) {
      return <FormatNumber cryptoCurrency={Number(rowData?.priceUsd)} />
    },
  },
  {
    header: '24Hr %',
    key: 'percentExchangeVolume',
    info: 'Jumlah volume harian yang ditransaksikan suatu pasar dalam kaitannya dengan total volume harian semua pasar di bursa',
    // width: '!min-w-[12rem]',
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
    info: 'Volume yang ditransaksikan di pasar ini dalam 24 jam terakhir',
    // width: '!min-w-[12rem]',
    renderCell(rowData) {
      return <FormatNumber cryptoCurrency={Number(rowData?.volumeUsd24Hr)} />
    },
  },
  {
    header: 'Count 24Hr',
    key: 'tradesCount24Hr',
    info: 'Jumlah perdagangan di pasar ini dalam 24 jam terakhir',
    // width: '!min-w-[12rem]',
  },
]

export const columnsExchanges: Column<ExchangeType>[] = [
  {
    header: 'Exchange',
    key: 'name',
    info: 'Pengidentifikasi unik untuk nama exchange',
  },
  {
    header: '24Hr %',
    key: 'percentExchangeVolume',
    info: 'Jumlah volume harian yang ditransaksikan suatu pasar dalam kaitannya dengan total volume harian semua pasar di bursa',
    // width: '!min-w-[12rem]',
    renderCell(rowData) {
      const percent24Hr = Number(rowData?.percentTotalVolume)
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
    info: 'Volume yang ditransaksikan di pasar ini dalam 24 jam terakhir',
    // width: '!min-w-[12rem]',
    renderCell(rowData) {
      return <FormatNumber cryptoCurrency={Number(rowData?.volumeUsd)} />
    },
  },
  {
    header: 'Trading Pairs',
    key: 'tradingPairs',
    info: 'Jumlah trading pairs yang ditawarkan exchange',
    // width: '!min-w-[12rem]',
  },
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

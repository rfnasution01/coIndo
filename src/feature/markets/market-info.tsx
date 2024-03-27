import { Badge } from '@/components/Badge'
import { CardHelper, CardMapping } from '@/components/ui/card'
import { FormatManipulationComponent } from '@/lib/helpers/formatComponent'
import { calculateCurrency, roundToNDecimals } from '@/lib/helpers/formatNumber'
import { capitalizeFirstLetterFromLowercase } from '@/lib/helpers/formatText'
import { MarketsType } from '@/lib/interfaces/marketsProps'
import { getCurrencySlice } from '@/store/reducer/stateCurrency'
import { useSelector } from 'react-redux'

export function MarketInfo({
  sortedByPercent,
  sortedByTrades,
  sortedByVolume,
}: {
  sortedByVolume: MarketsType[]
  sortedByPercent: MarketsType[]
  sortedByTrades: MarketsType[]
}) {
  const stateCurrency = useSelector(getCurrencySlice)

  return (
    <div className="grid grid-cols-12 gap-32">
      {/* --- Top Volume --- */}
      <CardHelper
        title="Top Volume 24Hr"
        mappingData={
          <div className="flex flex-col gap-y-16">
            {sortedByVolume?.slice(0, 5).map((item, idx) => (
              <CardMapping
                idx={idx}
                label={capitalizeFirstLetterFromLowercase(item?.exchangeId)}
                description={`${item?.baseSymbol}/${item?.quoteSymbol}`}
                subLabel={
                  <FormatManipulationComponent
                    currencySymbol={stateCurrency?.currencySymbol}
                    price={calculateCurrency({
                      cryptoCurrency: Number(item?.volumeUsd24Hr),
                      fiatCurrency: stateCurrency?.price,
                      jumlah: 1,
                    })}
                  />
                }
              />
            ))}
          </div>
        }
      />
      {/* --- Top Percentage --- */}
      <CardHelper
        title="Top Kenaikan 24Hr"
        mappingData={
          <div className="flex flex-col gap-y-16">
            {sortedByPercent
              ?.slice(0, 5)
              .map((item, idx) => (
                <CardMapping
                  idx={idx}
                  label={capitalizeFirstLetterFromLowercase(item?.exchangeId)}
                  description={`${item?.baseSymbol}/${item?.quoteSymbol}`}
                  subLabel={
                    <Badge variant="success">
                      +
                      {roundToNDecimals(Number(item?.percentExchangeVolume), 2)}
                    </Badge>
                  }
                />
              ))}
          </div>
        }
      />
      {/* --- Top Trade --- */}
      <CardHelper
        title="Top Trade 24Hr"
        mappingData={
          <div className="flex flex-col gap-y-16">
            {sortedByTrades
              ?.slice(0, 5)
              .map((item, idx) => (
                <CardMapping
                  idx={idx}
                  label={capitalizeFirstLetterFromLowercase(item?.exchangeId)}
                  description={`${item?.baseSymbol}/${item?.quoteSymbol}`}
                  subLabel={item?.tradesCount24Hr}
                />
              ))}
          </div>
        }
      />
    </div>
  )
}

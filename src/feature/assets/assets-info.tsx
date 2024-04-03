import { Card } from '@/components/Card'
import { Loading } from '@/components/Loading'
import Tooltips from '@/components/Tooltip'
import { FormatManipulationComponent } from '@/lib/helpers/formatComponent'
import {
  calculateCurrency,
  convertNumberToString,
  roundToNDecimals,
} from '@/lib/helpers/formatNumber'
import { AssetsType } from '@/lib/interfaces/assetProps'
import { getCurrencySlice } from '@/store/reducer/stateCurrency'
import { getModeSlice } from '@/store/reducer/stateMode'
import clsx from 'clsx'
import { CircleAlert, Globe, Share2, Star } from 'lucide-react'
import { useSelector } from 'react-redux'

export function AssetsInfo({
  assets,
  isFetching,
}: {
  assets?: AssetsType
  isFetching?: boolean
}) {
  const mode = useSelector(getModeSlice)
  const currencyState = useSelector(getCurrencySlice)

  return (
    <Card
      variant={mode.isLight ? 'light' : 'dark'}
      classes="h-full"
      color={mode?.isLight ? 'light' : 'dark'}
      radius="xl"
    >
      {isFetching ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-y-12">
          {/* ----- Title ----- */}
          <div className="flex items-center justify-between">
            {/* --- Name --- */}
            <div className="flex items-center gap-x-12">
              <h4 className="text-[2.4rem]">{assets?.name}</h4>
              <h5>{assets?.symbol}</h5>
            </div>

            {/* --- Star --- */}
            <div className="flex items-center gap-x-12">
              <span>
                <Star size={18} />
              </span>
              <span>
                <Share2 size={18} />
              </span>
            </div>
          </div>
          {/* ----- Price ----- */}
          <div className="flex items-center justify-between text-[3rem] font-bold">
            <FormatManipulationComponent
              currencySymbol={currencyState.currencySymbol}
              price={calculateCurrency({
                cryptoCurrency: Number(assets?.priceUsd),
                fiatCurrency: currencyState.price,
                jumlah: 1,
              })}
            />
            <span
              className={clsx('text-[2rem] font-light', {
                'text-success': Number(assets?.changePercent24Hr) >= 0,
                'text-red-800': Number(assets?.changePercent24Hr) < 0,
              })}
            >
              {Number(assets?.changePercent24Hr) >= 0 && '+'}{' '}
              {roundToNDecimals(Number(assets?.changePercent24Hr), 2)}
            </span>
          </div>
          {/* ----- Rank ----- */}
          <div className="mb-24 flex items-center gap-x-12">
            <span
              className={clsx('p-8', {
                'bg-light-background': mode.isLight,
                'bg-dark-background': !mode.isLight,
              })}
            >
              Rank #{assets?.rank}
            </span>
            <a href={assets?.explorer} target="_blank">
              <Globe size={16} />
            </a>
          </div>
          {/* ----- Info ----- */}
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-x-8">
              <span className="text-[2rem]">Market cap</span>
              <Tooltips
                triggerComponent={<CircleAlert size={12} />}
                tooltipContent={<span>Supply x price</span>}
              />
            </div>
            <span className="text-[2rem]">
              {convertNumberToString(Number(assets?.marketCapUsd))}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-x-8">
              <span className="text-[2rem]">Max Supply</span>
              <Tooltips
                triggerComponent={<CircleAlert size={12} />}
                tooltipContent={<span>Jumlah total aset yang diterbitkan</span>}
              />
            </div>
            <span className="text-[2rem]">
              {convertNumberToString(Number(assets?.maxSupply))}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-x-8">
              <span className="text-[2rem]">Volume 24Hr</span>
              <Tooltips
                triggerComponent={<CircleAlert size={12} />}
                tooltipContent={
                  <span>
                    Kuantitas volume perdagangan yang diwakili dalam USD selama
                    24 jam terakhir
                  </span>
                }
              />
            </div>
            <span className="text-[2rem]">
              {convertNumberToString(Number(assets?.volumeUsd24Hr))}
            </span>
          </div>
        </div>
      )}
    </Card>
  )
}

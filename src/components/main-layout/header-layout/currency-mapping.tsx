import { Loading } from '@/components/Loading'
import { NoData } from '@/components/NoData'
import { convertSlugToText } from '@/lib/helpers/formatText'
import { RatesType } from '@/lib/interfaces/ratesProps'
import {
  StateCurrencyType,
  getCurrencySlice,
  setStateCurrency,
} from '@/store/reducer/stateCurrency'
import clsx from 'clsx'
import { Check, Gem } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function CurrencyMapping({
  rates,
  title,
  setIsOpen,
  isLoading,
}: {
  rates: RatesType[]
  title: string
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isLoading: boolean
}) {
  const dispatch = useDispatch()
  const stateCurrency = useSelector(getCurrencySlice)

  const handleChangeCurrency = (
    symbol: string,
    currencySymbol: string,
    price: number,
    id: string,
  ) => {
    const newCurrency: StateCurrencyType = {
      symbol: symbol,
      currencySymbol: currencySymbol,
      price: price,
      id: id,
    }
    dispatch(setStateCurrency(newCurrency))
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col gap-y-16">
      <h3 className="font-roboto text-[2rem] font-light">{title}</h3>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-12 gap-24">
          {rates.length === 0 ? (
            <NoData className="col-span-12" />
          ) : (
            rates.map((item, idx) => (
              <div
                className={clsx(
                  'col-span-3 flex items-center gap-x-16 rounded-xl p-16 hover:cursor-pointer hover:bg-primary-shade-1 hover:text-background',
                  {
                    'bg-primary-shade-1 text-background':
                      stateCurrency.symbol === item?.symbol,
                  },
                )}
                key={idx}
                onClick={() =>
                  handleChangeCurrency(
                    item?.symbol,
                    item?.currencySymbol,
                    Number(item?.rateUsd),
                    item?.id,
                  )
                }
              >
                <div
                  className={clsx(
                    'flex h-48 w-48 items-center justify-center rounded-full',
                    {
                      'bg-background text-primary-shade-1':
                        stateCurrency.symbol === item?.symbol,
                      'bg-primary-shade-1 text-background':
                        stateCurrency.symbol !== item?.symbol,
                    },
                  )}
                >
                  <span className="font-roboto text-[1.6rem]">
                    {item?.currencySymbol ?? <Gem size={16} />}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-y-8">
                  <h4 className="font-roboto text-[2rem] font-medium">
                    {convertSlugToText(item?.id)}
                  </h4>
                  <h5>{item?.symbol}</h5>
                </div>
                {stateCurrency.symbol === item?.symbol && (
                  <span className="flex h-32 w-32 items-center justify-center rounded-full bg-success-tint-2 text-black">
                    <Check size={12} />
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

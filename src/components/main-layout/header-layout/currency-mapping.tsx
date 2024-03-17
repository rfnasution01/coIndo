import { Loading } from '@/components/Loading'
import { convertSlugToText } from '@/lib/helpers/formatText'
import { RatesType } from '@/lib/interfaces/ratesProps'
import clsx from 'clsx'
import { Check, Gem } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export function CurrencyMapping({
  rates,
  stateCurrency,
  setStateCurrency,
  title,
  setIsOpen,
  isLoading,
}: {
  rates: RatesType[]
  stateCurrency: Record<string, string | undefined>
  setStateCurrency: Dispatch<SetStateAction<Record<string, string | undefined>>>
  title: string
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isLoading: boolean
}) {
  const handleClick = (
    symbol: string,
    currencySymbol: string,
    price: string,
    id: string,
  ) => {
    setStateCurrency((prevState) => ({
      ...prevState,
      symbol: symbol,
      currencySymbol: currencySymbol,
      price: price,
      id: id,
    }))
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col gap-y-16">
      <h3 className="font-roboto text-[2rem] font-light">{title}</h3>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-12 gap-24">
          {rates.map((item, idx) => (
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
                handleClick(
                  item?.symbol,
                  item?.currencySymbol,
                  item?.rateUsd,
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
          ))}
        </div>
      )}
    </div>
  )
}

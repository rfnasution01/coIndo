import { Table } from '@/components/Table'
import { MarketsFilter } from '@/feature/markets/market-filter'
import { columnsMarkets } from '@/lib/consts/dummy/Tables'
import { marketSchema } from '@/lib/consts/schema/marketSchema'
import { MarketsType } from '@/lib/interfaces/marketsProps'
import { getModeSlice } from '@/store/reducer/stateMode'
import { useGetMarketsQuery } from '@/store/slices/marketsAPI'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { RefreshCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

export default function Market() {
  const mode = useSelector(getModeSlice)

  const [limit, _setLimit] = useState<number>(100)
  const [offset, _setOffset] = useState<number>(0)

  const form = useForm({
    resolver: zodResolver(marketSchema),
    defaultValues: {
      exchangeId: undefined,
      baseSymbol: undefined,
      baseId: undefined,
      quoteSymbol: undefined,
      quoteId: undefined,
      assetId: undefined,
    },
  })

  const formWatch = form.watch()
  const { exchangeId, baseSymbol, quoteSymbol, baseId, quoteId } = formWatch

  const { data, isLoading, isFetching, refetch } = useGetMarketsQuery({
    exchangeId: exchangeId,
    baseSymbol: baseSymbol,
    quoteSymbol: quoteSymbol,
    baseId: baseId,
    quoteId: quoteId,
    limit,
    offset,
  })
  const [dataMarkets, setDataMarkets] = useState<MarketsType[]>()

  useEffect(() => {
    if (data?.data) {
      setDataMarkets(data?.data)
    }
  }, [data])

  return (
    <div className="flex flex-col gap-y-32">
      <div
        className={clsx('flex flex-col rounded-3xl', {
          'bg-white': mode?.isLight,
          'bg-zinc-900': !mode?.isLight,
        })}
      >
        <div className="flex items-center gap-x-32 p-32">
          <MarketsFilter form={form} />
          {/* --- All Market --- */}
          <div
            onClick={refetch}
            className="flex items-center gap-x-8 rounded-lg bg-background px-24 py-12 text-[2rem] hover:cursor-pointer hover:bg-background"
          >
            <span>
              <RefreshCcw size={18} />
            </span>
            <span>Refresh</span>
          </div>
        </div>
        <Table
          data={dataMarkets ?? []}
          columns={columnsMarkets}
          containerClasses="h-full"
          loading={isLoading || isFetching}
          // maxHeight="h-full"
        />
      </div>
      <div className="">Footer</div>
    </div>
  )
}

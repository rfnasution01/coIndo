import { Refetch } from '@/components/Refetch'
import { Table } from '@/components/Table'
import { ContentTemplate } from '@/feature/main-layout/content-layout/content-template'
import { MarketInfo } from '@/feature/markets'
import { columnsMarkets } from '@/lib/consts/dummy/Tables'
import { marketSchema } from '@/lib/consts/schema/marketSchema'
import { useSearch } from '@/lib/hooks/useSearch'
import { MarketsType } from '@/lib/interfaces/marketsProps'
import { useGetMarketsQuery } from '@/store/slices/marketsAPI'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Market() {
  const limit = 2000
  const [offset, _setOffset] = useState<number>(0)
  const { currentPage } = useSearch()

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

  const sortedMarket = dataMarkets ? [...dataMarkets] : []

  const sortedByVolume = sortedMarket.sort((a, b) => {
    return parseFloat(b.volumeUsd24Hr) - parseFloat(a.volumeUsd24Hr)
  })
  const sortedByPercent = sortedMarket.sort((a, b) => {
    return (
      parseFloat(b.percentExchangeVolume) - parseFloat(a.percentExchangeVolume)
    )
  })
  const sortedByTrades = sortedMarket.sort((a, b) => {
    return parseFloat(b.tradesCount24Hr) - parseFloat(a.tradesCount24Hr)
  })

  const dataPerPage = 100
  const totalData = dataMarkets ? dataMarkets.length : 0
  const totalPage = Math.ceil(totalData / dataPerPage)

  return (
    <ContentTemplate
      form={form}
      totalPage={totalPage}
      refetch={<Refetch refetch={refetch} />}
      table={
        <Table
          data={
            dataMarkets?.slice(
              currentPage * dataPerPage - dataPerPage,
              currentPage * dataPerPage,
            ) ?? []
          }
          columns={columnsMarkets}
          containerClasses="h-full"
          loading={isLoading || isFetching}
        />
      }
      infoComponent={
        <MarketInfo
          sortedByVolume={sortedByVolume}
          sortedByPercent={sortedByPercent}
          sortedByTrades={sortedByTrades}
        />
      }
    />
    // <div className="flex h-full flex-col gap-y-32">
    //   <div
    //     className={clsx('flex flex-1 flex-col rounded-3xl ', {
    //       'bg-white': mode?.isLight,
    //       'bg-zinc-900': !mode?.isLight,
    //     })}
    //   >
    //     <div className="flex items-center gap-x-32 p-32">
    //       <MarketsFilter form={form} />
    //       {/* --- All Market --- */}
    //       {/* <div
    //         onClick={refetch}
    //         className="flex items-center gap-x-8 rounded-lg bg-background px-24 py-12 text-[2rem] hover:cursor-pointer hover:bg-background"
    //       >
    //         <span>
    //           <RefreshCcw size={18} />
    //         </span>
    //         <span>Refresh</span>
    //       </div> */}
    //     </div>
    //     {/* <Table
    //       data={dataMarkets ?? []}
    //       columns={columnsMarkets}
    //       containerClasses="h-full"
    //       loading={isLoading || isFetching}
    //     /> */}
    //   </div>
    //   {/* <div className="flex items-center justify-end">Footer</div> */}
    // </div>
  )
}

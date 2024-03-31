import { Badge } from '@/components/Badge'
import { Refetch } from '@/components/Refetch'
import { Table } from '@/components/Table'
import { CardHelper, CardMapping } from '@/components/ui/card'
import { ContentTemplate } from '@/feature/main-layout/content-layout/content-template'
import { MarketInfo, MarketsFilter } from '@/feature/markets'
import { columnsMarkets } from '@/lib/consts/dummy/Tables'
import { marketSchema } from '@/lib/consts/schema/marketSchema'
import { roundToNDecimals } from '@/lib/helpers/formatNumber'
import { capitalizeFirstLetterFromLowercase } from '@/lib/helpers/formatText'
import { useSearch } from '@/lib/hooks/useSearch'
import { MarketsType } from '@/lib/interfaces/marketsProps'
import { useGetMarketsQuery } from '@/store/slices/marketsAPI'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Market() {
  const limit = 2000
  const offset = 0
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

  const sortedByPercent = sortedMarket.sort((a, b) => {
    return (
      parseFloat(b.percentExchangeVolume) - parseFloat(a.percentExchangeVolume)
    )
  })

  const dataPerPage = 100
  const totalData = dataMarkets ? dataMarkets.length : 0
  const totalPage = Math.ceil(totalData / dataPerPage)

  return (
    <ContentTemplate
      totalPage={totalPage}
      filter={
        <MarketsFilter form={form} refetch={<Refetch refetch={refetch} />} />
      }
      table={
        <Table
          data={
            dataMarkets?.slice(
              currentPage * dataPerPage - dataPerPage,
              currentPage * dataPerPage,
            ) ?? []
          }
          columns={columnsMarkets}
          containerClasses="h-full phones:w-[calc(100vw_-_11rem)]"
          loading={isLoading || isFetching}
        />
      }
      infoComponent={
        <MarketInfo
          card1={
            <CardHelper
              title="Popular Market"
              mappingData={
                <div className="flex flex-col gap-y-16">
                  {sortedByPercent
                    ?.slice(0, 5)
                    .map((item, idx) => (
                      <CardMapping
                        idx={idx}
                        label={`${item?.baseSymbol}/${item?.quoteSymbol}`}
                        description={capitalizeFirstLetterFromLowercase(
                          item?.exchangeId,
                        )}
                        subLabel={
                          <Badge variant="success">
                            +
                            {roundToNDecimals(
                              Number(item?.percentExchangeVolume),
                              2,
                            )}
                          </Badge>
                        }
                      />
                    ))}
                </div>
              }
            />
          }
          card2={<CardHelper title="Market News" />}
        />
      }
    />
  )
}

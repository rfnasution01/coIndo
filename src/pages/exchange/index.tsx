import { Badge } from '@/components/Badge'
import { Table } from '@/components/Table'
import { CardHelper, CardMapping } from '@/components/ui/card'
import { ContentTemplate } from '@/feature/main-layout/content-layout/content-template'
import { MarketInfo } from '@/feature/markets'
import { columnsExchanges } from '@/lib/consts/dummy/Tables'
import { roundToNDecimals } from '@/lib/helpers/formatNumber'
import { capitalizeFirstLetterFromLowercase } from '@/lib/helpers/formatText'
import { useSearch } from '@/lib/hooks/useSearch'
import { ExchangeType } from '@/lib/interfaces/exchangesProps'
import { useGetExchangesQuery } from '@/store/slices/exchangesAPI'
import { Link } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Exchange() {
  const { currentPage } = useSearch()

  const { data, isLoading, isFetching } = useGetExchangesQuery()
  const [dataExchanges, setDataExchanges] = useState<ExchangeType[]>()

  useEffect(() => {
    if (data?.data) {
      setDataExchanges(data?.data)
    }
  }, [data])

  const sortedMarket = dataExchanges ? [...dataExchanges] : []

  const sortedByPercent = sortedMarket.sort((a, b) => {
    return parseFloat(b.percentTotalVolume) - parseFloat(a.percentTotalVolume)
  })

  const dataPerPage = 100
  const totalData = dataExchanges ? dataExchanges.length : 0
  const totalPage = Math.ceil(totalData / dataPerPage)

  return (
    <ContentTemplate
      totalPage={totalPage}
      table={
        <Table
          data={
            dataExchanges?.slice(
              currentPage * dataPerPage - dataPerPage,
              currentPage * dataPerPage,
            ) ?? []
          }
          columns={columnsExchanges}
          containerClasses="h-full phones:w-[calc(100vw_-_11rem)]"
          loading={isLoading || isFetching}
        />
      }
      infoComponent={
        <MarketInfo
          card1={
            <CardHelper
              title="Popular Exchange"
              mappingData={
                <div className="flex flex-col gap-y-16">
                  {sortedByPercent?.slice(0, 5).map((item, idx) => (
                    <CardMapping
                      idx={idx}
                      label={capitalizeFirstLetterFromLowercase(
                        item?.exchangeId,
                      )}
                      description={
                        <a
                          href={item?.exchangeUrl}
                          target="_blank"
                          className="flex items-center gap-x-8"
                        >
                          <Link size={12} />
                          <span>{item?.tradingPairs} pairs</span>
                        </a>
                      }
                      subLabel={
                        <Badge variant="success">
                          +
                          {roundToNDecimals(
                            Number(item?.percentTotalVolume),
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
          card2={<CardHelper title="Exchange News" />}
        />
      }
    />
  )
}

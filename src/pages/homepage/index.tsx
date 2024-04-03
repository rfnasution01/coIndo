import { Badge } from '@/components/Badge'
import { Table } from '@/components/Table'
import { CardHelper, CardMapping } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ContentTemplate } from '@/feature/main-layout/content-layout/content-template'
import { MarketInfo } from '@/feature/markets'
import { columnsAssets } from '@/lib/consts/dummy/Tables'
import { roundToNDecimals } from '@/lib/helpers/formatNumber'
import { capitalizeFirstLetterFromLowercase } from '@/lib/helpers/formatText'
import { useSearch } from '@/lib/hooks/useSearch'
import { AssetsType } from '@/lib/interfaces/assetProps'
import { getModeSlice } from '@/store/reducer/stateMode'
import { useGetAssetsQuery } from '@/store/slices/assetsAPI'
import clsx from 'clsx'
import { debounce } from 'lodash'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Homepage() {
  const { currentPage, onIdChange } = useSearch()
  const mode = useSelector(getModeSlice)
  const limit = 2000
  const offset = 0
  const [search, setSearch] = useState<string>('')

  const { data, isLoading, isFetching } = useGetAssetsQuery({
    search: search,
    limit: limit,
    offset: offset,
  })
  const [dataAssets, setDataAssets] = useState<AssetsType[]>()

  useEffect(() => {
    if (data?.data) {
      setDataAssets(data?.data)
    }
  }, [data])

  const sortedMarket = dataAssets ? [...dataAssets] : []

  const sortedByPercent = sortedMarket.sort((a, b) => {
    return parseFloat(b.volumeUsd24Hr) - parseFloat(a.volumeUsd24Hr)
  })

  const dataPerPage = 100
  const totalData = dataAssets ? dataAssets.length : 0
  const totalPage = Math.ceil(totalData / dataPerPage)

  const handleSearch = debounce((searchValue: string) => {
    setSearch(searchValue)
  }, 300)

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    handleSearch(value)
  }

  return (
    <ContentTemplate
      totalPage={totalPage}
      table={
        <Table
          data={
            dataAssets?.slice(
              currentPage * dataPerPage - dataPerPage,
              currentPage * dataPerPage,
            ) ?? []
          }
          columns={columnsAssets}
          containerClasses="h-full phones:w-[calc(100vw_-_11rem)]"
          loading={isLoading || isFetching}
          onItemClick={onIdChange}
        />
      }
      search={
        <Input
          className={clsx('w-1/3 border', {
            'border-slate-300 bg-white': mode.isLight,
            'border-zinc-800 bg-dark-tint-1': !mode.isLight,
          })}
          placeholder="bitcoin"
          prefix={<Search size={18} />}
          onChange={onSearch}
        />
      }
      infoComponent={
        <MarketInfo
          card1={
            <CardHelper
              title="Popular Assets"
              mappingData={
                <div className="flex flex-col gap-y-16">
                  {sortedByPercent?.slice(0, 5).map((item, idx) => (
                    <CardMapping
                      idx={idx}
                      label={capitalizeFirstLetterFromLowercase(item?.name)}
                      description={<span>{item?.symbol}</span>}
                      subLabel={
                        <Badge
                          variant={
                            Number(item?.changePercent24Hr) < 0
                              ? 'danger'
                              : 'success'
                          }
                        >
                          {Number(item?.changePercent24Hr) >= 0 && (
                            <span>+</span>
                          )}
                          {roundToNDecimals(Number(item?.changePercent24Hr), 2)}
                        </Badge>
                      }
                    />
                  ))}
                </div>
              }
            />
          }
          card2={<CardHelper title="Assets News" />}
        />
      }
    />
  )
}

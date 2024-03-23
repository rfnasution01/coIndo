import { Table } from '@/components/Table'
import { columnsMarkets } from '@/lib/consts/dummy/Tables'
import { MarketsType } from '@/lib/interfaces/marketsProps'
import { useGetMarketsQuery } from '@/store/slices/marketsAPI'
import { useEffect, useState } from 'react'

export default function Market() {
  const { data, isLoading } = useGetMarketsQuery({})
  const [dataMarkets, setDataMarkets] = useState<MarketsType[]>()

  useEffect(() => {
    if (data?.data) {
      setDataMarkets(data?.data)
    }
  }, [data])

  return (
    <Table
      data={dataMarkets ?? []}
      columns={columnsMarkets}
      containerClasses="bg-white h-full"
      loading={isLoading}
      maxHeight="h-full"
    />
  )
}

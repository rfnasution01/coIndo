import { AssetsInfo } from '@/feature/assets/assets-info'
import { useSearch } from '@/lib/hooks/useSearch'
import { AssetsType } from '@/lib/interfaces/assetProps'
import { useGetAssetsByIdQuery } from '@/store/slices/assetsAPI'
import { useEffect, useState } from 'react'

export default function DetailAssets() {
  const { id } = useSearch()

  const { data, isFetching } = useGetAssetsByIdQuery({
    id: id,
  })
  const [dataAssets, setDataAssets] = useState<AssetsType>()

  useEffect(() => {
    if (data?.data) {
      setDataAssets(data?.data)
    }
  }, [data])

  return (
    <div className="mx-48 mb-32 grid h-full grid-cols-12 gap-x-32 overflow-y-auto phones:mt-32">
      <div className="col-span-9 bg-red-300">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex voluptates
        corporis nulla debitis eius pariatur illo ipsa aliquam aperiam,
        voluptatum quisquam dolores perferendis quam, officiis iste nesciunt
        animi! Sapiente, facilis.
      </div>
      <div className="col-span-3">
        <AssetsInfo assets={dataAssets} isFetching={isFetching} />
      </div>
    </div>
  )
}

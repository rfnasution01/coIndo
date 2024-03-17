export const NoData = ({ className }: { className?: string }) => {
  return (
    <div
      className={`${className} flex h-full w-full items-center justify-center `}
    >
      <span className="text-[2rem]">----- Tidak ada data -----</span>
    </div>
  )
}

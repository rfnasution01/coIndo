import { FormLabelComponent } from '@/components/ui/input'
import { RatesDataContext } from '@/lib/context/ratesContext/ratesData'
import { FormatManipulationComponent } from '@/lib/helpers/formatComponent'
import { ArrowLeftRight } from 'lucide-react'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { convertSchema } from '@/lib/consts/schema/convertSchema'
import { Form } from '@/components/Form'
import { FormListCurrency } from '@/components/ui/form'
import { calculateCurrency } from '@/lib/helpers/formatNumber'

export function CalculatorContent() {
  const [changePosition, setChangePosition] = useState<boolean>(false)
  const ratesContext = useContext(RatesDataContext)

  const form = useForm({
    resolver: zodResolver(convertSchema),
    defaultValues: {
      jumlah: 0,
      priceCrypto: 0,
      priceFIAT: 0,
      symbolCrypto: 'USD',
      symbolFIAT: 'USD',
    },
  })

  const formWatch = form.watch()

  return (
    <Form {...form}>
      <div className="gap-y- flex flex-col gap-y-32">
        <FormLabelComponent
          name="jumlah"
          type="number"
          label="Jumlah"
          placeholder="Input Jumlah"
          form={form}
        />

        <div className="flex flex-row items-end gap-x-32">
          <FormListCurrency
            name={changePosition ? 'priceFIAT' : 'priceCrypto'}
            className="flex-1"
            isDisabled={ratesContext?.isLoading}
            isLoading={ratesContext?.isLoading}
            data={
              changePosition
                ? ratesContext?.ratesFiat ?? []
                : ratesContext?.ratesCrypto ?? []
            }
            placeHolder="Bitcoin / USDT"
            useFormReturn={form}
            headerLabel={changePosition ? 'FIAT Currency' : 'Crypto Currency'}
          />

          <span
            className="pb-8 hover:cursor-pointer hover:text-slate-400"
            onClick={() => {
              setChangePosition(!changePosition)
            }}
          >
            <ArrowLeftRight />
          </span>

          <FormListCurrency
            name={changePosition ? 'priceCrypto' : 'priceFIAT'}
            className="flex-1"
            isDisabled={ratesContext?.isLoading}
            isLoading={ratesContext?.isLoading}
            data={
              changePosition
                ? ratesContext?.ratesCrypto ?? []
                : ratesContext?.ratesFiat ?? []
            }
            placeHolder="Dollar / Rupiah"
            useFormReturn={form}
            headerLabel={changePosition ? 'Crypto Currency' : 'FIAT Currency'}
          />
        </div>

        <div className="flex h-[30vh] flex-col items-center justify-center gap-y-24 bg-background p-24">
          <FormatManipulationComponent
            className="text-[4rem] font-bold"
            currencySymbol={
              changePosition ? formWatch?.symbolCrypto : formWatch?.symbolFIAT
            }
            price={calculateCurrency({
              cryptoCurrency: formWatch.priceCrypto,
              fiatCurrency: formWatch.priceFIAT,
              jumlah: formWatch.jumlah,
            })}
            isReverse
          />
          <h1 className="flex gap-x-8 text-[2rem]">
            {formWatch?.priceCrypto === 0 || formWatch?.priceFIAT === 0 ? 0 : 1}{' '}
            {changePosition
              ? formWatch?.symbolFIAT ?? '-'
              : formWatch?.symbolCrypto ?? '-'}{' '}
            =
            <FormatManipulationComponent
              currencySymbol={
                changePosition
                  ? formWatch?.symbolCrypto ?? '-'
                  : formWatch?.symbolFIAT ?? '-'
              }
              price={calculateCurrency({
                cryptoCurrency: formWatch.priceCrypto,
                fiatCurrency: formWatch.priceFIAT,
                jumlah: 1,
              })}
              isReverse
            />
          </h1>
        </div>
      </div>
    </Form>
  )
}

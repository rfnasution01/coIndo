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
import { capitalizeFirstLetterFromLowercase } from '@/lib/helpers/formatText'
import { useSelector } from 'react-redux'
import { getCurrencySlice } from '@/store/reducer/stateCurrency'

export function CalculatorContent() {
  const [changePosition, setChangePosition] = useState<boolean>(false)
  const ratesContext = useContext(RatesDataContext)
  const currencyState = useSelector(getCurrencySlice)

  const form = useForm({
    resolver: zodResolver(convertSchema),
    defaultValues: {
      idCurrency1: currencyState.id,
      idCurrency2: 'united-states-dollar',
      jumlah: 1,
      priceCurrency1: currencyState.price,
      priceCurrency2: 1,
      symbolCurrency1: currencyState.symbol,
      symbolCurrency2: 'USD',
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
            name="idCurrency1"
            className="flex-1"
            isDisabled={ratesContext?.isLoading}
            isLoading={ratesContext?.isLoading}
            data={ratesContext?.ratesAll ?? []}
            placeHolder="Dollar / Rupiah"
            useFormReturn={form}
            headerLabel="Pilih Currency"
            initialValue={{
              value: formWatch?.idCurrency1,
              label: capitalizeFirstLetterFromLowercase(formWatch?.idCurrency1),
              price: formWatch?.priceCurrency1,
            }}
          />

          <span
            className="pb-8 hover:cursor-pointer hover:text-slate-400"
            onClick={() => {
              form.setValue(
                changePosition ? 'idCurrency2' : 'idCurrency1',
                changePosition ? formWatch.idCurrency1 : formWatch.idCurrency2,
              )

              form.setValue(
                changePosition ? 'idCurrency1' : 'idCurrency2',
                changePosition ? formWatch.idCurrency2 : formWatch.idCurrency1,
              )
              form.setValue(
                changePosition ? 'priceCurrency2' : 'priceCurrency1',
                changePosition
                  ? formWatch.priceCurrency1
                  : formWatch.priceCurrency2,
              )

              form.setValue(
                changePosition ? 'priceCurrency1' : 'priceCurrency2',
                changePosition
                  ? formWatch.priceCurrency2
                  : formWatch.priceCurrency1,
              )

              form.setValue(
                changePosition ? 'symbolCurrency2' : 'symbolCurrency1',
                changePosition
                  ? formWatch.symbolCurrency1
                  : formWatch.symbolCurrency2,
              )

              form.setValue(
                changePosition ? 'symbolCurrency1' : 'symbolCurrency2',
                changePosition
                  ? formWatch.symbolCurrency2
                  : formWatch.symbolCurrency1,
              )

              setChangePosition(!changePosition)
            }}
          >
            <ArrowLeftRight />
          </span>

          <FormListCurrency
            name="idCurrency2"
            className="flex-1"
            isDisabled={ratesContext?.isLoading}
            isLoading={ratesContext?.isLoading}
            data={ratesContext?.ratesAll ?? []}
            placeHolder="Dollar / Rupiah"
            useFormReturn={form}
            headerLabel="Pilih Currency"
            initialValue={{
              value: formWatch?.idCurrency2,
              label: capitalizeFirstLetterFromLowercase(formWatch?.idCurrency2),
              price: formWatch?.priceCurrency2,
            }}
          />
        </div>

        <div className="flex h-[30vh] flex-col items-center justify-center gap-y-24 bg-background p-24">
          <FormatManipulationComponent
            className="text-[4rem] font-bold"
            currencySymbol={formWatch?.symbolCurrency2}
            price={calculateCurrency({
              cryptoCurrency: formWatch.priceCurrency1,
              fiatCurrency: formWatch.priceCurrency2,
              jumlah: formWatch.jumlah,
            })}
            isReverse
          />
          <div className="flex gap-x-8 text-[2rem]">
            {formWatch?.priceCurrency1 === 0 || formWatch?.priceCurrency2 === 0
              ? 0
              : 1}{' '}
            {formWatch?.symbolCurrency1} =
            <FormatManipulationComponent
              currencySymbol={formWatch?.symbolCurrency2}
              price={calculateCurrency({
                cryptoCurrency: formWatch.priceCurrency1,
                fiatCurrency: formWatch.priceCurrency2,
                jumlah: 1,
              })}
              isReverse
            />
          </div>
        </div>
      </div>
    </Form>
  )
}

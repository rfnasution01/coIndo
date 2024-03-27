import { Form } from '@/components/Form'
import { FormListCurrency } from '@/components/ui/form'
import { FormListExchange } from '@/components/ui/form/FormListExchange'
import { ExchangeDataContext } from '@/lib/context/exchangeContext/exchangeData'
import { RatesDataContext } from '@/lib/context/ratesContext/ratesData'
import { ReactNode, useContext } from 'react'
import { UseFormReturn } from 'react-hook-form'

export function MarketsFilter({
  form,
  refetch,
}: {
  form: UseFormReturn | any | undefined
  refetch: ReactNode
}) {
  const exchangeContext = useContext(ExchangeDataContext)
  const ratesContext = useContext(RatesDataContext)

  return (
    <Form {...form}>
      <div className="grid grid-cols-12 items-center gap-32 p-32">
        {/* --- Exchange Id --- */}
        <FormListExchange
          name="exchangeId"
          className="z-20 col-span-3 phones:col-span-6"
          isDisabled={exchangeContext?.isLoading}
          isLoading={exchangeContext?.isLoading}
          data={exchangeContext?.dataExchange ?? []}
          placeHolder="Pilih Exchange (gate)"
          useFormReturn={form}
          initialValue={undefined}
        />

        {/* --- Base Currency --- */}
        <FormListCurrency
          name="baseId"
          className="z-20 col-span-3 phones:col-span-6"
          isDisabled={ratesContext?.isLoading}
          isLoading={ratesContext?.isLoading}
          data={ratesContext?.ratesAll ?? []}
          placeHolder="Base Currency (bitcoin)"
          useFormReturn={form}
          initialValue={undefined}
        />
        {/* --- Quote Currency --- */}
        <FormListCurrency
          name="quoteId"
          className="z-20 col-span-3 phones:col-span-6"
          isDisabled={ratesContext?.isLoading}
          isLoading={ratesContext?.isLoading}
          data={ratesContext?.ratesAll ?? []}
          placeHolder="Quote Currency (tether)"
          useFormReturn={form}
          initialValue={undefined}
        />
        <div className="col-span-3 phones:col-span-6">{refetch}</div>
      </div>
    </Form>
  )
}

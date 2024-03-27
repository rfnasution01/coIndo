import { Form } from '@/components/Form'
import { FormListCurrency } from '@/components/ui/form'
import { FormListExchange } from '@/components/ui/form/FormListExchange'
import { ExchangeDataContext } from '@/lib/context/exchangeContext/exchangeData'
import { RatesDataContext } from '@/lib/context/ratesContext/ratesData'
import { useContext } from 'react'
import { UseFormReturn } from 'react-hook-form'

export function MarketsFilter({
  form,
}: {
  form: UseFormReturn | any | undefined
}) {
  const exchangeContext = useContext(ExchangeDataContext)
  const ratesContext = useContext(RatesDataContext)

  return (
    <Form {...form}>
      {/* --- Exchange Id --- */}
      <FormListExchange
        name="exchangeId"
        className="z-20 flex-1"
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
        className="z-20 flex-1"
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
        className="z-20 flex-1"
        isDisabled={ratesContext?.isLoading}
        isLoading={ratesContext?.isLoading}
        data={ratesContext?.ratesAll ?? []}
        placeHolder="Quote Currency (tether)"
        useFormReturn={form}
        initialValue={undefined}
      />
    </Form>
  )
}

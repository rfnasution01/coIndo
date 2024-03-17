import { Dispatch, ReactNode, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../Dialog'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

export function DialogComponent({
  open,
  setOpen,
  title,
  customComponent,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  title: string
  customComponent?: ReactNode
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="rounded-3xl"
        style={{
          width: '60%',
          maxWidth: '80%',
          height: 'auto',
          maxHeight: '80vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          padding: '24px',
        }}
      >
        <DialogHeader>
          <DialogTitle>
            <span className="font-roboto text-[3rem] font-semibold">
              {title}
            </span>
          </DialogTitle>
          <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-16 top-16 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
            <X size={18} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogHeader>
        <hr className="h-3 my-16 w-full bg-primary-shade-2" />
        <div className="w-full pb-16">{customComponent}</div>
      </DialogContent>
    </Dialog>
  )
}

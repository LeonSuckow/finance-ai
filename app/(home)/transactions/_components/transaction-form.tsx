'use client'
import DialogForm from '@/app/_components/custom/dialog/dialog-form'
import { useTransactionContext } from '../_context/trasaction-context'

const TransactionForm = () => {
  const {
    dialogTitle,
    fieldsConfig,
    dialogIsOpen,
    setIsDialogOpen,
    dialogAction,
  } = useTransactionContext()
  console.log(dialogAction)
  return (
    <DialogForm
      key={JSON.stringify(fieldsConfig)}
      headerTitle={dialogTitle}
      onSubmit={dialogAction}
      fieldsConfig={fieldsConfig}
      dialogIsOpen={dialogIsOpen}
      setDialogIsOpen={setIsDialogOpen}
    />
  )
}

export default TransactionForm

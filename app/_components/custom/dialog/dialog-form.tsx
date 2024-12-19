'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z, ZodSchema } from 'zod'
import { Button } from '../../ui/button'
import { DatePicker } from '../../ui/date-picker'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form'
import { Input } from '../../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'
import { MoneyInput } from '../form-field/money-input'

// Exemplo de configuração de campo do formulário
export type FieldDialogConfig = {
  name: string
  label: string
  type: 'text' | 'numeric' | 'select' | 'date'
  options?: { label: any; value: string }[]
  defaultValue?: any
  enumType?: any
}

type DialogProps = {
  headerTitle: string
  fieldsConfig: FieldDialogConfig[]
  onSubmit: (data: any) => void
  dialogIsOpen: boolean
  setDialogIsOpen: (open: boolean) => void
}

interface FieldProps {
  field: FieldDialogConfig
  form: UseFormReturn<
    {
      [k: string]: any
    },
    any,
    undefined
  >
}

// Função para mapear o tipo de campo para o schema Zod
function getFieldSchema(type: string, enumType?: any) {
  switch (type) {
    case 'text':
      return z.string().trim().min(1, 'Este campo é obrigatório')
    case 'numeric':
      return z.number().min(1, 'Este campo deve ser um número válido')
    case 'select':
      if (enumType)
        return z.nativeEnum(enumType, {
          required_error: 'Seleção obrigatória',
        })
      throw new Error('Enum type is required for select fields')
    case 'date':
      return z.date({ required_error: 'Data obrigatória' })
    default:
      throw new Error(`Tipo de campo desconhecido: ${type}`)
  }
}

function createDynamicSchema(
  fieldsConfig: {
    name: string
    type: string
    defaultValue?: any
    enumType?: any
  }[],
) {
  const schemaObject: Record<string, z.ZodTypeAny> = {}

  fieldsConfig.forEach((field) => {
    schemaObject[field.name] = getFieldSchema(field.type, field.enumType)
  })

  return z.object(schemaObject)
}

// Renderiza dinamicamente os campos do formulário com base no tipo
const RenderField = ({ field, form }: FieldProps) => {
  return (
    <FormField
      control={form.control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem>
          <FormLabel>{field.label}</FormLabel>
          <FormControl>
            <>
              {field.type === 'text' && (
                <Input placeholder={field.label} {...formField} />
              )}
              {field.type === 'numeric' && (
                <MoneyInput
                  value={formField.value}
                  placeholder={field.label}
                  onValueChange={({ floatValue }) =>
                    formField.onChange(floatValue)
                  }
                  onBlur={formField.onBlur}
                  disabled={formField.disabled}
                />
              )}
              {field.type === 'select' && field.options && (
                <Select
                  onValueChange={formField.onChange}
                  defaultValue={formField.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${field.label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {field.type === 'date' && (
                <DatePicker
                  value={formField.value}
                  onChange={formField.onChange}
                />
              )}
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

const DialogForm = ({ ...props }: DialogProps) => {
  const formSchema = createDynamicSchema(props.fieldsConfig)
  const defaultValues = Object.fromEntries(
    props.fieldsConfig.map((field) => [field.name, field.defaultValue]),
  )

  const form = useForm({
    resolver: zodResolver(formSchema as ZodSchema),
    defaultValues,
  })

  const handleFormSubmit = async (data: any) => {
    await props.onSubmit(data) // Chama a função `onSubmit` que foi passada
    form.reset()
    props.setDialogIsOpen(false)
  }

  const fields = props.fieldsConfig.map((field) => (
    <RenderField key={field.name} field={field} form={form} />
  ))

  return (
    <Dialog
      open={props.dialogIsOpen}
      onOpenChange={(open) => {
        props.setDialogIsOpen(open)
        if (!open) form.reset()
      }}
    >
      <DialogContent>
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>{props.headerTitle}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-8"
          >
            {fields}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default DialogForm

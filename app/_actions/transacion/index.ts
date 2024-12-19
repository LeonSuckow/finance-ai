'use server'

import { db } from '@/app/_lib/prisma'
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { getUserLogged } from '../auth'
import { upsertTransactionSchema } from './schema'

export interface UpsertTransactionParams {
  id?: string
  name: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  paymentMethod: TransactionPaymentMethod
  date: Date
}

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  upsertTransactionSchema.parse(params)
  console.log(params)
  const user = await getUserLogged()

  await db.transaction.upsert({
    update: { ...params, userId: user.id },
    create: { ...params, userId: user.id },
    where: {
      id: params.id ?? '',
    },
  })
  revalidatePath('/transactions')
}

export const deleteTransaction = async (id: string) => {
  await db.transaction.delete({
    where: { id },
  })
  revalidatePath('/transactions')
}

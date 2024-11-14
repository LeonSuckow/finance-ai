"use client";

import {
  upsertTransaction,
  UpsertTransactionParams,
} from "@/app/_actions/transacion";
import DialogForm, {
  FieldDialogConfig,
} from "@/app/_components/custom/dialog/dialog-form";
import { Button } from "@/app/_components/ui/button";
import {
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "@/app/_constants/transactions";
import {
  Transaction,
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

interface UpdateTransactionProps {
  transaction: Transaction;
}

const UpdateTransaction = ({ transaction }: UpdateTransactionProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  console.log(transaction);
  // console.log(props.transactionId);
  // getTransactionById(props.transactionId);
  const fieldsConfig: FieldDialogConfig[] = [
    {
      name: "name",
      label: "Nome",
      type: "text",
      defaultValue: transaction.name,
    },
    {
      name: "amount",
      label: "Valor",
      type: "numeric",
      defaultValue: Number(transaction.amount),
    },
    {
      name: "type",
      label: "Tipo de Transação",
      type: "select",
      options: TRANSACTION_TYPE_OPTIONS,
      enumType: TransactionType,
      defaultValue: transaction.type,
    },
    {
      name: "category",
      label: "Categoria",
      type: "select",
      options: TRANSACTION_CATEGORY_OPTIONS,
      enumType: TransactionCategory,
      defaultValue: transaction.category,
    },
    {
      name: "paymentMethod",
      label: "Método de Pagamento",
      type: "select",
      options: TRANSACTION_PAYMENT_METHOD_OPTIONS,
      enumType: TransactionPaymentMethod,
      defaultValue: transaction.paymentMethod,
    },
    {
      name: "date",
      label: "Data",
      type: "date",
      defaultValue: transaction.date,
    },
  ];

  const handleTransactionSubmit = async (data: UpsertTransactionParams) => {
    try {
      await upsertTransaction({
        ...data,
        id: transaction.id,
        amount: Number(data.amount),
      });
      console.log("Transação adicionada:", data);
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
    }
  };
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setIsDialogOpen(true)}
      >
        <PencilIcon />
      </Button>

      <DialogForm
        headerTitle="Alterar transação"
        onSubmit={handleTransactionSubmit}
        fieldsConfig={fieldsConfig}
        dialogIsOpen={isDialogOpen}
        setDialogIsOpen={setIsDialogOpen}
      />
    </>
  );
};

export default UpdateTransaction;

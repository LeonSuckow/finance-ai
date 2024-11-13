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
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { useState } from "react";

const fieldsConfig: FieldDialogConfig[] = [
  {
    name: "name",
    label: "Nome",
    type: "text",
    defaultValue: "",
  },
  {
    name: "amount",
    label: "Valor",
    type: "numeric",
    defaultValue: "",
  },
  {
    name: "type",
    label: "Tipo de Transação",
    type: "select",
    options: TRANSACTION_TYPE_OPTIONS,
    enumType: TransactionType,
    defaultValue: TransactionType.EXPENSE,
  },
  {
    name: "category",
    label: "Categoria",
    type: "select",
    options: TRANSACTION_CATEGORY_OPTIONS,
    enumType: TransactionCategory,
    defaultValue: TransactionCategory.OTHER,
  },
  {
    name: "paymentMethod",
    label: "Método de Pagamento",
    type: "select",
    options: TRANSACTION_PAYMENT_METHOD_OPTIONS,
    enumType: TransactionPaymentMethod,
    defaultValue: TransactionPaymentMethod.CASH,
  },
  {
    name: "date",
    label: "Data",
    type: "date",
    defaultValue: new Date(),
  },
];
const AddTransactions = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleTransactionSubmit = async (data: UpsertTransactionParams) => {
    try {
      await upsertTransaction({ ...data, id: "" });
      console.log("Transação adicionada:", data);
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
    }
  };
  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>Adicionar transação</Button>

      <DialogForm
        headerTitle="Cadastrar transação"
        onSubmit={handleTransactionSubmit}
        fieldsConfig={fieldsConfig}
        dialogIsOpen={isDialogOpen}
        setDialogIsOpen={setIsDialogOpen}
      />
    </>
  );
};

export default AddTransactions;

import { ArrowDownUpIcon } from "lucide-react";
import DialogForm from "../_components/custom/dialog/dialog-form";
import { Button } from "../_components/ui/button";
import { DataTable } from "../_components/ui/data-table";
import { db } from "../_lib/prisma";
import { transactionsColumns } from "./_columns";

const TransactionsPage = async () => {
  const transactions = await db.transaction.findMany({});

  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <DialogForm />
        <Button className="rounded-full font-bold">
          Adicionar transação
          <ArrowDownUpIcon className="font-bold" />
        </Button>
      </div>

      <DataTable columns={transactionsColumns} data={transactions} />
    </div>
  );
};

export default TransactionsPage;

import { CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { Progress } from '@/app/_components/ui/progress'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { TRANSACTION_CATEGORY_LABELS } from '@/app/_constants/transaction'
import { TotalExpensePerCategory } from '@/app/_interface/dashboard'
import utils from '@/app/_utils'

interface ExpensesPerCategoryProps {
  expensesPerCategory: TotalExpensePerCategory[]
}

const ExpensesPerCategory = ({
  expensesPerCategory,
}: ExpensesPerCategoryProps) => {
  return (
    <ScrollArea className="col-span-2 h-full rounded-md border pb-6">
      <CardHeader>
        <CardTitle className="font-bold">Gastos por Categoria</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {expensesPerCategory.map((category) => (
          <div key={category.category} className="space-y-2">
            <div className="flex w-full justify-between">
              <p className="text-sm font-bold">
                {TRANSACTION_CATEGORY_LABELS[category.category]}
              </p>
              <p className="text-sm font-bold">{category.percentageOfTotal}%</p>
            </div>
            <Progress value={category.percentageOfTotal} />
            <p className="text-sm text-muted-foreground">
              {utils.format.formatCurrency(category.totalAmount)}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  )
}

export default ExpensesPerCategory

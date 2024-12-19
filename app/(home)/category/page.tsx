import { DataTable } from '@/app/_components/ui/data-table'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { getCategoryPageData } from './_actions'
import { categoryColumns } from './_columns'

const Category = async () => {
  const { categories } = await getCategoryPageData()
  return (
    <ScrollArea className="h-full">
      <DataTable columns={categoryColumns} data={categories} />
    </ScrollArea>
  )
}

export default Category

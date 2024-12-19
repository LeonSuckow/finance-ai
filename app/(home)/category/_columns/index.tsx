'use client'

import { Button } from '@/app/_components/ui/button'
import { Category } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { TrashIcon } from 'lucide-react'

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row: { original: category } }) => {
      console.log(category)
      return (
        <div className="space-x-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <TrashIcon />
          </Button>
        </div>
      )
    },
  },
]

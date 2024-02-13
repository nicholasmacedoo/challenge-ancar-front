import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function TableLoading() {
  return Array.from({ length: 5 }).map((_, index) => (
    <TableRow key={`table-loading-${index}`}>
      <TableCell>
        <Skeleton className="w-[100px] h-[18px] rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[100px] h-[18px] rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[80px] h-[18px] rounded-full" />
      </TableCell>
    </TableRow>
  ))
}

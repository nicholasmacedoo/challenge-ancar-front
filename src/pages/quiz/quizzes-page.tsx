import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useQueryPagination } from '@/hooks/use-query-pagination'
import { ChevronLeft, ChevronRight, Trash } from 'lucide-react'
import api from '@/utils/api'
import { Link } from 'react-router-dom'
import { queryClient } from '@/contexts'
import { useToast } from '@/components/ui/use-toast'

const URL_API = import.meta.env.VITE_API_URL + '/quizzes'

interface IQuizzes {
  id: string
  nome: string
  descricao: string
}

export function QuizzesPage() {
  const { data, isLoading, count, limit } = useQueryPagination<IQuizzes>({
    queryKey: 'quizzes',
    url: URL_API,
  })
  const { toast } = useToast()
  const enabledNext = count > limit

  async function handleDelete(id: string) {
    try {
      await api.delete(`/quizzes/${id}`)
      await queryClient.refetchQueries('quizzes')
      toast({
        title: 'Questionário deletado com sucesso!',
      })
    } catch (error) {
      toast({
        title: 'Houve um erro ao remover questionário',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Questionários</h1>
        <Button asChild>
          <Link to="/questionarios/novo">Novo questionario</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((value) => (
            <TableRow key={value.id}>
              <TableCell>{value.nome}</TableCell>
              <TableCell>{value.descricao}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(value.id)}
                >
                  <Trash size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        {enabledNext && (
          <div className="flex justify-end gap-6 mt-6">
            <Button>
              <ChevronLeft size={16} />
            </Button>
            <Button>
              <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </div>
      {isLoading && <span>Carregando...</span>}
    </div>
  )
}

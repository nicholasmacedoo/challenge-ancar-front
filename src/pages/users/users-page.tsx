import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { queryClient } from '@/contexts'
import { useQueryPagination } from '@/hooks/use-query-pagination'
import api from '@/utils/api'
import { ChevronLeft, ChevronRight, Plus, Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const URL_API = import.meta.env.VITE_API_URL + '/users'

interface IQuizzes {
  id: string
  nome: string
  cpf: string
  createdAt: string
  updatedAt: string
}

const createUserFormSchema = z.object({
  nome: z.string(),
  cpf: z.string(),
  password: z.string(),
})

type CreateUserForm = z.infer<typeof createUserFormSchema>

export function UsersPage() {
  const { register, handleSubmit, reset } = useForm<CreateUserForm>()
  const { toast } = useToast()
  const { data, isLoading, count, limit } = useQueryPagination<IQuizzes>({
    queryKey: 'users',
    url: URL_API,
  })

  const enabledNext = count > limit

  async function onSubmit(data: CreateUserForm) {
    try {
      const response = await api.post('/users', data)
      if (response.data) {
        toast({
          title: 'Usuário cadastrao com sucesso!',
        })
        await queryClient.refetchQueries('users')
        reset()
      }
    } catch (error) {
      toast({
        title: 'Erro ao cadastrar usuário',
        variant: 'destructive',
      })
    }
  }

  async function handleDelete(id: string) {
    try {
      await api.delete(`/users/${id}`)
      await queryClient.refetchQueries('users')
      toast({
        title: 'Usuário deletado com sucesso!',
      })
    } catch (error) {
      toast({
        title: 'Houve um erro ao remover usuário',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Quizzes</h1>
        {/* DIALOG REGISTRAR QUESTIONÁRIO */}
        <Dialog>
          <DialogTrigger asChild>
            <Button type="submit">
              <Plus size={16} className="mr-4" />
              Adicionar usuário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicione uma pergunta ao questionário</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-4">
                <div>
                  <span className="text-xs block mb-2">Nome:</span>
                  <Input placeholder="Nome do usuário" {...register('nome')} />
                </div>
                <div>
                  <span className="text-xs block mb-2">Cpf:</span>
                  <Input
                    placeholder="documento do usuário"
                    {...register('cpf')}
                  />
                </div>
                <div>
                  <span className="text-xs block mb-2">Senha:</span>
                  <Input
                    placeholder="Senha"
                    type="password"
                    {...register('password')}
                  />
                </div>
                <Button type="submit">Cadastrar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Documento</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((value) => (
            <TableRow key={value.id}>
              <TableCell width="50%">{value.nome}</TableCell>
              <TableCell>{value.cpf}</TableCell>
              <TableCell>
                {new Date(value.createdAt).toLocaleDateString('pt-br')}
              </TableCell>
              <TableCell width="10%">
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

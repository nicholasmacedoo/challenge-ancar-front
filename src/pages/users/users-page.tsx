import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { api } from '@/utils/api'
import { useQuery } from 'react-query'

const columns = [
  {
    accessorKey: 'nome',
    header: 'Nome',
  },
  {
    accessorKey: 'cpf',
    header: 'CPF',
  },
]

export function UsersPage() {
  const { data, isLoading } = useQuery('users', async () => {
    const response = await api('/users')
    const data = await response.json()
    return data
  })

  console.log(data)
  return (
    <div>
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Usuários</h1>
        <Button>Novo usuário</Button>
      </header>

      <div>
        {/* <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Criado em</TableHead>
            </TableRow>
          </TableHeader>
        </Table> */}
        <DataTable columns={columns} data={[]} />
      </div>
    </div>
  )
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function HomePage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo ao meu desafio de front-end!</CardTitle>
          <CardDescription>
            Neste projeto, utilizei as seguintes tecnologias para o
            desenvolvimento:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc ml-8 mb-4">
            <li className="font-mono font-semibold">React.js</li>
            <li className="font-mono font-semibold">React Router</li>
            <li className="font-mono font-semibold">TailwindCSS</li>
            <li className="font-mono font-semibold">Shadcn.ui</li>
            <li className="font-mono font-semibold">React Query</li>
          </ul>

          <p>
            Este exercício tem como objetivo implementar um projeto de
            elaboração de enquetes simplificadas, onde um usuário pode criar sua
            enquete e associar perguntas e respostas a elas.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

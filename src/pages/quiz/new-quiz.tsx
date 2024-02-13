import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import api from '@/utils/api'
import { ChevronLeft, HardDrive, Plus, Trash } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

interface QuestionsProps {
  descricao: string
}

const answerSchema = z.object({
  nome: z.string(),
  descricao: z.string(),
})

type AnserFormData = z.infer<typeof answerSchema>

const questionFormSchema = z.object({
  descricao: z.string(),
})
type QuestionFormData = z.infer<typeof questionFormSchema>

export function NewQuiz() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { handleSubmit, register, reset: resetForm } = useForm<AnserFormData>()
  const {
    handleSubmit: handleSubmitQuestion,
    register: registerQuestions,
    reset,
  } = useForm<QuestionFormData>()
  const [questions, setQuestions] = useState<QuestionsProps[]>([])
  const [isOpen, setIsOpen] = useState(false)

  async function onSubmit(data: AnserFormData) {
    const formdata = {
      ...data,
      perguntas: questions,
    }

    const response = await api.post(`/quizzes`, formdata)

    if (response.data) {
      toast({
        title: 'Questionário criado com sucesso!',
      })
      resetForm()
    }
  }

  function registerQuestion(data: QuestionFormData) {
    setQuestions((prevState) => [...prevState, data])
    reset()
  }

  function handleDeleteQuestion(index: number) {
    setQuestions((prevState) =>
      prevState.filter((_, indexItem) => indexItem !== index),
    )
  }

  return (
    <div className="p-8">
      <div className="mb-4">
        <Button size="sm" onClick={() => navigate(-1)}>
          <ChevronLeft size={14} className="mr-2" /> Voltar
        </Button>
      </div>
      <h1 className="text-2xl font-bold mb-8">Novo questionário</h1>
      <Card>
        <CardHeader>
          <span className="text-sm font-mono font-bold mb-4">
            Informações do questionário
          </span>
          <CardTitle>
            <span className="text-xs block mb-2">Nome:</span>
            <Input placeholder="Nome do questionário" {...register('nome')} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <span className="text-xs block mb-2">Resposta:</span>

            <Textarea
              placeholder="descrição do questionário..."
              {...register('descricao')}
            />

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono font-bold">Perguntas:</span>
                <Button type="button" onClick={() => setIsOpen(true)}>
                  <Plus size={16} /> Nova pergunta
                </Button>
              </div>

              <Table className="mt-4 mb-8">
                <TableBody>
                  {questions.map((question, index) => (
                    <TableRow key={`${question.descricao}-${index}`}>
                      <TableCell width={100}>{index + 1} º</TableCell>
                      <TableCell width="90%">{question.descricao}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteQuestion(index)}
                        >
                          <Trash size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {questions.length === 0 && (
                    <TableRow>
                      <TableCell
                        align="center"
                        className="text-muted-foreground text-xs rounded"
                      >
                        <HardDrive className="mb-2" />
                        Nenhuma pergunta adicionada
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-end mt-4">
              <Button type="submit">Criar questionário</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {/* DIALOG REGISTRAR QUESTIONÁRIO */}
      <Dialog
        open={isOpen}
        onOpenChange={() => setIsOpen((prevState) => !prevState)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicione uma pergunta ao questionário</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmitQuestion(registerQuestion)}
            className="flex flex-col gap-4"
          >
            <div>
              <span className="text-xs block mb-2">Pergunta:</span>
              <Textarea
                placeholder="Descrição da pergunta"
                {...registerQuestions('descricao')}
              />
            </div>
            <Button type="submit">Adicionar pergunta</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

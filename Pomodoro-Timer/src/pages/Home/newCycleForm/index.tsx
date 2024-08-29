import { useForm } from "react-hook-form";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import * as zod from 'zod'; //aqui estou importando o zod que é uma biblioteca de validação de dados
import { zodResolver } from "@hookform/resolvers/zod";

const newCycleFormValidationSchema = zod.object(
    {
        task: zod.string().min(1, 'informe a tarefa'),//aqui eu estou dizendo que o campo task é uma string e que o tamanho minimo é 1
        minutesAmount: zod.number().min(1, 'informe um valor maior que 5').max(60, 'informe um valor menor que 60')//aqui eu estou dizendo que o campo minutesAmount é um número e que o valor minimo é 5 e o valor maximo é 60
    }
)
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> //aqui eu estou criando um tipo de dado que é um objeto que tem duas propriedades, task e minutesAmount
//typeof serve para referenciar um dado js para o typescript
//o infer é automatizar o processo da typagem de algo

export function NewCycleForm (){

    const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
        //aqui estou passando um resolver que é um objt de configuração que é o zodResolver, e dentro do zod eu preciso passar qual é o meu esquema de validação
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: { //aqui posso passar os valores iniciais de cada campo
            task: '',
            minutesAmount: 0,
        }
    }); //register é um metodo que adiciona um input ao formulário
    //watch é um método que fica escutando o valor de um input
    //handleSubmit é um método que recebe uma função que será executada quando o formulário for submetido
    //o useForm é como se eu tivesse criando um novo formulario para a aplicação

    return (
        <FormContainer>
                    <label>Vou trabalhar em: </label>
                    <TaskInput 
                        type="text" 
                        id="task" 
                        placeholder="Dê um nome para o seu projeto"
                        disabled = {!!activeCycle}
                        list="task-suggestions"
                        {...register('task')} 
                        />

                        <datalist id="task-suggestions">
                            <option value="Projeto 1"/>
                            <option value="Projeto 2"/>
                            <option value="Projeto 3"/>
                            <option value="Projeto 4"/>
                        </datalist>

                    <label>durante:</label>
                    <MinutesAmountInput 
                        type="number" 
                        id="minutesAmount" 
                        placeholder="00"
                        disabled = {!!activeCycle}
                        step={5}
                        min={1}
                        max={60}
                        {...register('minutesAmount', {valueAsNumber: true})}      
                        />
                    <span>minutos.</span>
            </FormContainer>
    )
}
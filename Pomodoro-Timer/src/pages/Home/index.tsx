import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartContdownButton, TaskInput } from "./style";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod';
import { useState } from "react";

//controlled manter em tempo real o valor do input no estado do componente 
//uncontrolled pegar o valor do input no momento do submit do formulário
//register é uma função que retorna um objeto com as propriedades do input que vc quer registrar no hook form 
//retorn onChnge, onBlur, value, name, ref
const newCycleFormValidationSchema = zod.object(
    {
        task: zod.string().min(1, 'informe a tarefa'),//aqui eu estou dizendo que o campo task é uma string e que o tamanho minimo é 1
        minutesAmount: zod.number().min(5, 'informe um valor maior que 5').max(60, 'informe um valor menor que 60')//aqui eu estou dizendo que o campo minutesAmount é um número e que o valor minimo é 5 e o valor maximo é 60
    }
)

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> //aqui eu estou criando um tipo de dado que é um objeto que tem duas propriedades, task e minutesAmount
//typeof serve para referenciar um dado js para o typescript
//o infer é automatizar o processo da typagem de algo


// interface NewCycleFormData { //aqui eu estou criando um tipo de dado que é um objeto que tem duas propriedades, task e minutesAmount
//     task : string;
//     minutesAmount: number;
// }
interface Cycle {
    id: string; 
    task: string;
    minutesAmount: number;
}
export function Home() {
    
    

    const [cycles, setCycles] = useState<Cycle[]>([]); //aqui estou falando que vou armazenar um estado que é um array de ciclos
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null); //aqui estou falando que vou armazenar um estado que é uma string ou nulo
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0); //aqui estou falando que vou armazenar um estado que é um número


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

    function handleCreatNewCycle(data: NewCycleFormData) {
        //aqui eu vou criar um novo ciclo
        const id = String(Date.now());//aqui eu estou pegando a data atual em milisegundos e transformando em string
        const newCycle: Cycle ={
            id,//aqui eu estou criando um id para o ciclo que é a data atual em milisegundos
            task: data.task,//aqui eu estou pegando o valor do input task
            minutesAmount: data.minutesAmount,//aqui eu estou pegando o valor do input minutesAmount
            }

            setCycles(state => [...state, newCycle])//aqui eu to copiando todos os cyclos que tenho e adiciono ele no final
            //sempre que um estado depender da informação interior eu uso arrow function
            setActiveCycleId(id);//aqui eu estou setando o id do ciclo ativo
        reset(); //aqui eu estou limpando o valor do input
    }
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);//aqui vou percorrer os cycles e encontrar em que o id do ciclo seja igual ao id do ciclo ativo

    const totalSeconds = activeCycle? activeCycle.minutesAmount * 60 : 0;  //se eu tiver um ciclo ativo essa variavel vai ser o numero de minutos do ciclo *60 se não tiver ciclo ativo vai ser 0
    const currentSeconds = activeCycle? totalSeconds - amountSecondsPassed : 0; //se eu tiver um ciclo ativo essa variavel vai ser o numero de minutos do ciclo *60 - a quantidade de segundos passados se não tiver ciclo ativo vai ser 0

    const minutesAmount = Math.floor (currentSeconds / 60); //aqui eu estou pegando a quantidade de minutos que faltam para o ciclo acabar e arredondando para baixo
    //agora eu calculo quantos segundos tem o resto da divisão 
    const secondsAmount = currentSeconds % 60; //aqui eu estou pegando o resto da divisão de currentSeconds por 60

    const minutes = String(minutesAmount).padStart(2, '0');//aqui eu estou transformando o numero de minutos em string e adicionando um 0 a esquerda se o numero de minutos for menor que 10
    const seconds = String(secondsAmount).padStart(2, '0');//aqui eu estou transformando o numero de segundos em string e adicionando um 0 a esquerda se o numero de segundos for menor que 10

    console.log(activeCycle)

    const task = watch ('task');//aqui eu estou pegando o valor do input task
    const isSubmitButtonDisabled = !task 


return (
    <HomeContainer>
        <form onSubmit={handleSubmit(handleCreatNewCycle)}>
            <FormContainer>
                    <label>Vou trabalhar em: </label>
                    <TaskInput 
                        type="text" 
                        id="task" 
                        placeholder="Dê um nome para o seu projeto"
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
                        step={5}
                        min={5}
                        max={60}
                        {...register('minutesAmount', {valueAsNumber: true})}      
                        />
                    <span>minutos.</span>
            </FormContainer>
            <CountDownContainer>
                <span>{minutes[0]}</span>
                <span>{minutes[1]}</span>
                <Separator>:</Separator>
                <span>{seconds[0]}</span>
                <span>{seconds[1]}</span>
            </CountDownContainer>
            <StartContdownButton 
            disabled={!task} //somente quando n tiver nada no input
            type="submit"> 
                <Play size={24}/>
                Começar
            </StartContdownButton>
        </form>
    </HomeContainer>
);
}
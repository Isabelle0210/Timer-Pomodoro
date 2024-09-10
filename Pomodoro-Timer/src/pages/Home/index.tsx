import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartContdownButton, StopContdownButton } from "./style";
import { NewCycleForm } from "./newCycleForm";
import { Countdown } from "./Countdown";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from 'zod'; //aqui estou importando o zod que é uma biblioteca de validação de dados
import { zodResolver } from "@hookform/resolvers/zod";
import { CycleContext } from "../../context/CyclesContext";
import { useContext } from "react";

//controlled manter em tempo real o valor do input no estado do componente 
//uncontrolled pegar o valor do input no momento do submit do formulário
//register é uma função que retorna um objeto com as propriedades do input que vc quer registrar no hook form 
//retorn onChnge, onBlur, value, name, ref


// interface NewCycleFormData { //aqui eu estou criando um tipo de dado que é um objeto que tem duas propriedades, task e minutesAmount
//     task : string;
//     minutesAmount: number;
// }

const newCycleFormValidationSchema = zod.object(
    {
        task: zod.string().min(1, 'informe a tarefa'),//aqui eu estou dizendo que o campo task é uma string e que o tamanho minimo é 1
        minutesAmount: zod.number().min(1, 'informe um valor maior que 5').max(60, 'informe um valor menor que 60')//aqui eu estou dizendo que o campo minutesAmount é um número e que o valor minimo é 5 e o valor maximo é 60
    }
)
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> //aqui eu estou criando um tipo de dado que é um objeto que tem duas propriedades, task e minutesAmount
//typeof serve para referenciar um dado js para o typescript
//o infer é automatizar o processo da typagem de algo

export function Home() {

    const { activeCycle,CreatNewCycle, InterrupedCurrentCycle, } = useContext(CycleContext);

    const newCycleForm = useForm<NewCycleFormData>({
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
    
    const {handleSubmit, watch, reset} = newCycleForm; //aqui eu estou desestruturando o newCycleForm e pegando o  handleSubmit, watch e reset dele 

    const task = watch ('task');//aqui eu estou pegando o valor do input task
    const isSubmitDisabled = !task 

    // Prop Drilling -> é quando a gente tem Muitas props sendo passadas de um componente para o outro
    // Context API -> é uma API do React que serve para compartilhar estados entre componentes

    function handleCreateNewCycle(data: NewCycleFormData) {
        CreatNewCycle(data)
        reset(); 
    }
    
return (
    <HomeContainer>
        <form  onSubmit={handleSubmit(handleCreateNewCycle)}>
            
                <FormProvider {...newCycleForm}> 
                    <NewCycleForm/>
                </FormProvider>
                <Countdown /> 
            
            {activeCycle ? ( //se tiver ciclo ativo eu vou mostrar o botão de parar o ciclo 
                <StopContdownButton 
                    onClick={InterrupedCurrentCycle}
                    type="button"> 
                    <HandPalm size={24}/>
                    
                    Interromper
                </StopContdownButton>
            ):(
                <StartContdownButton 
                    disabled={isSubmitDisabled} //somente quando n tiver nada no input
                    type="submit"> 
                    <Play size={24}/>
                    Começar
                </StartContdownButton>
            )}
        </form>
    </HomeContainer>
);
}
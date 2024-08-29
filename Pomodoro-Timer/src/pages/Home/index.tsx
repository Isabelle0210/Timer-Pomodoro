import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartContdownButton, StopContdownButton } from "./style";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod';
import { useEffect, useState } from "react";
import { differenceInSeconds, set } from "date-fns";
import { NewCycleForm } from "./newCycleForm";
import { Countdown } from "./Countdown";

//controlled manter em tempo real o valor do input no estado do componente 
//uncontrolled pegar o valor do input no momento do submit do formulário
//register é uma função que retorna um objeto com as propriedades do input que vc quer registrar no hook form 
//retorn onChnge, onBlur, value, name, ref





// interface NewCycleFormData { //aqui eu estou criando um tipo de dado que é um objeto que tem duas propriedades, task e minutesAmount
//     task : string;
//     minutesAmount: number;
// }
interface Cycle {
    id: string; 
    task: string;
    minutesAmount: number;
    startDate: Date;
    interrupedDate?: Date;
    finishedDate?: Date;
}
export function Home() {
    
    

    const [cycles, setCycles] = useState<Cycle[]>([]); //aqui estou falando que vou armazenar um estado que é um array de ciclos
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null); //aqui estou falando que vou armazenar um estado que é uma string ou nulo
    
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);//aqui vou percorrer os cycles e encontrar em que o id do ciclo seja igual ao id do ciclo ativo 
    


    function handleInterrupedCycle() {
        setCycles((state => state.map((cycle)=>{
            if(cycle.id === activeCycleId){
                return {
                    ...cycle,
                    interrupedDate: new Date()
                }
            }
            return cycle;
        })))
        setActiveCycleId(null);//aqui eu estou setando o id do ciclo ativo para nulo para n ter ciclo ativo
    }

    function handleCreatNewCycle(data: NewCycleFormData) {
        //aqui eu vou criar um novo ciclo
        const id = String(Date.now());//aqui eu estou pegando a data atual em milisegundos e transformando em string
        const newCycle: Cycle ={
            id,//aqui eu estou criando um id para o ciclo que é a data atual em milisegundos
            task: data.task,//aqui eu estou pegando o valor do input task
            minutesAmount: data.minutesAmount,//aqui eu estou pegando o valor do input minutesAmount
            startDate: new Date(),//aqui eu estou pegando a data atual
            }

            setCycles(state => [...state, newCycle])//aqui eu to copiando todos os cyclos que tenho e adiciono ele no final
            //sempre que um estado depender da informação interior eu uso arrow function
            setActiveCycleId(id);//aqui eu estou setando o id do ciclo ativo
            setAmountSecondsPassed(0);//aqui eu estou setando a quantidade de segundos passados para 0 quando mudar de ciclo

        reset(); //aqui eu estou limpando o valor do input
    }
    

    
    const currentSeconds = activeCycle? totalSeconds - amountSecondsPassed : 0; //se eu tiver um ciclo ativo essa variavel vai ser o numero de minutos do ciclo *60 - a quantidade de segundos passados se não tiver ciclo ativo vai ser 0

    const minutesAmount = Math.floor (currentSeconds / 60); //aqui eu estou pegando a quantidade de minutos que faltam para o ciclo acabar e arredondando para baixo
    //agora eu calculo quantos segundos tem o resto da divisão 
    const secondsAmount = currentSeconds % 60; //aqui eu estou pegando o resto da divisão de currentSeconds por 60

    const minutes = String(minutesAmount).padStart(2, '0');//aqui eu estou transformando o numero de minutos em string e adicionando um 0 a esquerda se o numero de minutos for menor que 10
    const seconds = String(secondsAmount).padStart(2, '0');//aqui eu estou transformando o numero de segundos em string e adicionando um 0 a esquerda se o numero de segundos for menor que 10


    //toda vez que meus segundos e minutos atualizarem eu vou atualizar o titulo da pagina com o tempo restante
    useEffect(()=>{
        if(activeCycle){ //vai ser executado toda vez que o ciclo ativo mudar 
            document.title = `${minutes}:${seconds}`//aqui eu estou setando o titulo da pagina
        }
    },[minutes, seconds, activeCycle])

    const task = watch ('task');//aqui eu estou pegando o valor do input task
    const isSubmitButtonDisabled = !task 

    // Prop Drilling -> é quando a gente tem Muitas props sendo passadas de um componente para o outro
    // Context API -> é uma API do React que serve para compartilhar estados entre componentes
return (
    <HomeContainer>
        <form onSubmit={handleSubmit(handleCreatNewCycle)}>
            <NewCycleForm/>
            <Countdown 
                activeCycle={activeCycle} 
                setCycles={setCycles} 
                activeCycleId={activeCycleId}
                
            />

            {activeCycle ? ( //se tiver ciclo ativo eu vou mostrar o botão de parar o ciclo 
                <StopContdownButton 
                    onClick={handleInterrupedCycle}
                    type="button"> 
                    <HandPalm size={24}/>
                    
                    Interromper
                </StopContdownButton>
            ):(
                <StartContdownButton 
                    disabled={!task} //somente quando n tiver nada no input
                    type="submit"> 
                    <Play size={24}/>
                    Começar
                </StartContdownButton>
            )}
        </form>
    </HomeContainer>
);
}
import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartContdownButton, StopContdownButton } from "./style";
import React, { createContext, useEffect, useState } from "react";
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

interface CycleContextType {
    activeCycle: Cycle | undefined,
    activeCycleId: string | null,
    // setCycles :  React.Dispatch<React.SetStateAction<Cycle[]>>, //isso é a typagem de uma função que vai alterar o estado de cycles
    markCurrentCycleAsFinished: () => void,
}

export const CycleContext = createContext({} as CycleContextType);

export function Home() {
    
    const [cycles, setCycles] = useState<Cycle[]>([]); //aqui estou falando que vou armazenar um estado que é um array de ciclos
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null); //aqui estou falando que vou armazenar um estado que é uma string ou nulo
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);//aqui vou percorrer os cycles e encontrar em que o id do ciclo seja igual ao id do ciclo ativo 
    
    function markCurrentCycleAsFinished() {
        setCycles(
            cycles.map((cycle)=>{
                if(cycle.id === activeCycleId){
                    return {
                        ...cycle,
                        finishedDate: new Date()
                    }
                }
                return cycle;
            })
        )
    }
    
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
    // function handleCreatNewCycle(data: NewCycleFormData) {
    //     //aqui eu vou criar um novo ciclo
    //     const id = String(Date.now());//aqui eu estou pegando a data atual em milisegundos e transformando em string
    //     const newCycle: Cycle ={
    //         id,//aqui eu estou criando um id para o ciclo que é a data atual em milisegundos
    //         task: data.task,//aqui eu estou pegando o valor do input task
    //         minutesAmount: data.minutesAmount,//aqui eu estou pegando o valor do input minutesAmount
    //         startDate: new Date(),//aqui eu estou pegando a data atual
    //         }

    //         setCycles(state => [...state, newCycle])//aqui eu to copiando todos os cyclos que tenho e adiciono ele no final
    //         //sempre que um estado depender da informação interior eu uso arrow function
    //         setActiveCycleId(id);//aqui eu estou setando o id do ciclo ativo
    //         setAmountSecondsPassed(0);//aqui eu estou setando a quantidade de segundos passados para 0 quando mudar de ciclo

    //     reset(); //aqui eu estou limpando o valor do input
    // }
    
    //const task = watch ('task');//aqui eu estou pegando o valor do input task
    //const isSubmitDisabled = !task 

    // Prop Drilling -> é quando a gente tem Muitas props sendo passadas de um componente para o outro
    // Context API -> é uma API do React que serve para compartilhar estados entre componentes

    
    
return (
    <HomeContainer>
        <form  /*onSubmit={handleSubmit(handleCreatNewCycle)}*/>
            <CycleContext.Provider value={{activeCycle, activeCycleId, markCurrentCycleAsFinished }}>
                {/* <NewCycleForm/> */}
                <Countdown /> 
            </CycleContext.Provider>
            {activeCycle ? ( //se tiver ciclo ativo eu vou mostrar o botão de parar o ciclo 
                <StopContdownButton 
                    onClick={handleInterrupedCycle}
                    type="button"> 
                    <HandPalm size={24}/>
                    
                    Interromper
                </StopContdownButton>
            ):(
                <StartContdownButton 
                    /*disabled={isSubmitDisabled} //somente quando n tiver nada no input*/
                    type="submit"> 
                    <Play size={24}/>
                    Começar
                </StartContdownButton>
            )}
        </form>
    </HomeContainer>
);
}
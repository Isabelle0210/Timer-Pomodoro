import { createContext, useState } from "react";


interface CreateCycleData { //aqui eu estou criando um tipo de dado que é um objeto que tem duas propriedades, task e minutesAmount
    task : string;
    minutesAmount: number;
}

interface Cycle {
    id: string; 
    task: string;
    minutesAmount: number;
    startDate: Date;
    interrupedDate?: Date;
    finishedDate?: Date;
}

interface CycleContextType {
    cycles: Cycle[], //aqui eu estou falando que o estado cycles é um array de qualquer coisa
    activeCycle: Cycle | undefined,
    activeCycleId: string | null,
    // setCycles :  React.Dispatch<React.SetStateAction<Cycle[]>>, //isso é a typagem de uma função que vai alterar o estado de cycles
    markCurrentCycleAsFinished: () => void,
    amountSecondsPassed: number,
    setSecondsPassed: (seconds: number) => void
    CreatNewCycle: (data: CreateCycleData) => void
    InterrupedCurrentCycle: () => void
}

export const CycleContext = createContext({} as CycleContextType);

interface CyclesContextProviderProps {
    children: React.ReactNode
}
export function CyclesContextProvider({children }: CyclesContextProviderProps) {  
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null); //aqui estou falando que vou armazenar um estado que é uma string ou nulo  
    const [cycles, setCycles] = useState<Cycle[]>([]); //aqui estou falando que vou armazenar um estado que é um array de ciclos
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0); //aqui estou falando que vou armazenar um estado que é um numero
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);//aqui vou percorrer os cycles e encontrar em que o id do ciclo seja igual ao id do ciclo ativo 
    
    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

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

    function InterrupedCurrentCycle() {
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
    function CreatNewCycle (data: CreateCycleData) {
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
    }

    return (
        <CycleContext.Provider 
            value={{activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed, CreatNewCycle, InterrupedCurrentCycle }}
            >
                {children}  {/*isso serve para que o componente que está por volta do contexto possa receber outros componentes como filho */}
            </CycleContext.Provider>
    ) 
}
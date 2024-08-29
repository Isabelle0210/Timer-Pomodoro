import { useEffect, useState } from "react";
import { CountDownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";

interface CountdownProps {
    activeCycle: any //aqui eu fiz a criação de uma propriedade que é um ciclo ativo que está sendo passado para o componente Countdown que fica na pasta Home  isso faz com que eu faça a comunicção entre os componentes que não estão diretamente ligados 
    setCycles: any;
    activeCycleId: any;
}

export function Countdown ({activeCycle, setCycles, activeCycleId}: CountdownProps){
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0); //aqui estou falando que vou armazenar um estado que é um número
    const totalSeconds = activeCycle? activeCycle.minutesAmount * 60 : 0;  //se eu tiver um ciclo ativo essa variavel vai ser o numero de minutos do ciclo *60 se não tiver ciclo ativo vai ser 0

    useEffect(()=>{
        
        let interval: number; //aqui eu estou criando uma variavel interval que vai ser um numero

        if(activeCycle){
            interval = setInterval(()=>{
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate);//aqui eu estou pegando a diferença de segundos entre a data atual e a data de inicio do ciclo ativo

                if (secondsDifference>= totalSeconds){//se a diferença de segundos for maior ou igual ao total de segundos do ciclo eu vou interromper o ciclo
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

                    setAmountSecondsPassed(totalSeconds);//aqui eu estou setando a quantidade de segundos passados para 0 quando o ciclo acabar
                    clearInterval(interval);//aqui eu estou limpando o intervalo para que ele pare de contar
                }else{
                    setAmountSecondsPassed(secondsDifference);//aqui eu estou setando a quantidade de segundos passados
                }
            }, 1000);
        }
            
        return() => {
            clearInterval(interval);
        }
    }, [activeCycle, totalSeconds, activeCycleId, cycles]);//aqui eu estou dizendo que toda vez que o ciclo ativo mudar eu vou executar o que está dentro do useEffect

    return(
            <CountDownContainer>
                <span>{minutes[0]}</span>
                <span>{minutes[1]}</span>
                <Separator>:</Separator>
                <span>{seconds[0]}</span> 
                <span>{seconds[1]}</span>
            </CountDownContainer>
    )
}
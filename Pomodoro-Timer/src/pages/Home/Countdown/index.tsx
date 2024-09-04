import { useContext, useEffect, useState } from "react";
import { CountDownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CycleContext } from "..";



export function Countdown (){
    const {activeCycle, activeCycleId, markCurrentCycleAsFinished  }= useContext (CycleContext);

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0); //aqui estou falando que vou armazenar um estado que é um número
    const totalSeconds = activeCycle? activeCycle.minutesAmount * 60 : 0;  //se eu tiver um ciclo ativo essa variavel vai ser o numero de minutos do ciclo *60 se não tiver ciclo ativo vai ser 0


    useEffect(()=>{
        
        let interval: number; //aqui eu estou criando uma variavel interval que vai ser um numero

        if(activeCycle){
            interval = setInterval(()=>{
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate);//aqui eu estou pegando a diferença de segundos entre a data atual e a data de inicio do ciclo ativo

                if (secondsDifference>= totalSeconds){//se a diferença de segundos for maior ou igual ao total de segundos do ciclo eu vou interromper o ciclo
                    markCurrentCycleAsFinished();//aqui eu estou marcando o ciclo atual como finalizado

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
    }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished]);//aqui eu estou dizendo que toda vez que o ciclo ativo mudar eu vou executar o que está dentro do useEffect

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
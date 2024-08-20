import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartContdownButton, TaskInput } from "./style";
import { useState } from "react";
import { useForm } from 'react-hook-form';

//controlled manter em tempo real o valor do input no estado do componente 
//uncontrolled pegar o valor do input no momento do submit do formulário
//register é uma função que retorna um objeto com as propriedades do input que vc quer registrar no hook form 
//retorn onChnge, onBlur, value, name, ref
export function Home() {
    
    const {register, handleSubmit, watch} = useForm();

    function handleCreatNewCycle(data) {
        console.log(data);
    }
    const task = watch ('task');
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
            <span>0</span>
            <span>0</span>
            <Separator>:</Separator>
            <span>0</span>
            <span>0</span>
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
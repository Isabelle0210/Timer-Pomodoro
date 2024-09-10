import { useFormContext } from "react-hook-form";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { CycleContext } from "../../../context/CyclesContext";



export function NewCycleForm (){

    //context 
    const{activeCycle} = useContext(CycleContext) 
    const {register} = useFormContext()


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
import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartContdownButton, TaskInput } from "./style";


export function Home() {
return (
    <HomeContainer>
        <form>
            <FormContainer>
                <label>Vou trabalhar em: </label>
                <TaskInput 
                    type="text" 
                    id="task" 
                    placeholder="Dê um nome para o seu projeto"
                    list="task-suggestions"
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
        <StartContdownButton type="submit"> 
            <Play size={24}/>
            Começar
        </StartContdownButton>
        </form>
    </HomeContainer>
);
}
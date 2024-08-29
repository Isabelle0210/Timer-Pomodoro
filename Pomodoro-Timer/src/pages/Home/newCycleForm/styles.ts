import { styled } from "styled-components"

export const FormContainer = styled.div`
    width:100%;
    display:flex;
    align-items: center;
    justify-content:center;
    gap: .5rem;

    color:${(props)=> props.theme["gray-100"]};
    font-size: 1.125rem;
    font-weight:bold;
    flex-wrap: wrap;
    `
    const BaseInput = styled.input`
        border-bottom: 2px solid ${(props)=> props.theme["gray-500"]};
        background: none;
        border-right:none;
        height: 2rem;
        font-size: 1.125rem;
        font-weight: bold;
        padding: 0.5rem;
        color:${(props)=> props.theme["gray-100"]};
    `
    
    export const TaskInput = styled(BaseInput)`
        flex:1;

        &::-webkit-calendar-picker-indicator{
            display:none!important;
        }
    `
    export const MinutesAmountInput = styled(BaseInput)`
        width: 4rem;
    `
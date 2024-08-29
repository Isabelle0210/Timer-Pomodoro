import styled from "styled-components";


export const HomeContainer = styled.main`
    flex: 1;

    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;

    form{
        display:flex;
        flex-direction:column;
        align-items: center;
        gap: 3.5rem;
    }
`


export const BaseContdownButton = styled.button`
    width: 100%;
    height: 4rem;
    border:0;
    padding: 1 rem;
    border-radius: 8px;

    display:flex;
    align-items:center;
    justify-content:center;

    gap:0.5rem;
    font-weight:bold;

    cursor:pointer;
    
    color:${(props)=> props.theme["gray-100"]};
    &:disabled{
        opacity0.7;
        cursor:not-allowed;
    }
    
    `


    export const StartContdownButton = styled(BaseContdownButton)`
        background:${(props)=> props.theme["green-500"]};
        
        &:not(:disabled):hover{
        background:${(props)=> props.theme["green-700"]};
        }
    `

    export const StopContdownButton = styled(BaseContdownButton)`
        background:${(props)=> props.theme["red-500"]};
        
        &:not(:disabled):hover{
        background:${(props)=> props.theme["red-700"]};
        }
    `

    
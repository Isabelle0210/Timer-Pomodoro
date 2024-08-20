import styled from 'styled-components'

export const HistoryContainer = styled.main`
    flex: 1;
    padding: 3.5rem;

    display: flex;
    flex-direction: column;

    h1{
    color: ${(props)=> props.theme['gray-100']}
    }
`

export const HistoryList = styled.div`
    flex: 1;
    overflow: auto;
    margin-top: 2rem;

    table{
    width: 100%;
    border-collapse: collapse;
    min-width: 37.5rem;

    th{
        background: ${(props)=> props.theme['gray-600']};
        padding: 1rem;
        text-align: left;
        color: ${(props)=> props.theme['gray-100']};
        font-size: .825rem;
        line-height: 1. 5rem;

        &:first-child{
            padding-left: 1.5rem;
            width: 50%;
        }

        &:last-child{
            padding-right: 1.5rem;
        }
    }
    td{
        background: ${(props)=> props.theme['gray-700']};
        border-top: 4px solid ${(props)=> props.theme['gray-800']};
        padding: 1rem;
        font-size: .875rem;
        line-height: 1.5rem;
    }
`
const STATUS_COLOR = {
    green: 'green-500',
    red: 'red-500',
    yellow: 'yellow-500'
}as const // as const é uma forma de dizer que o objeto é imutável

interface StatusProps{
    statusColor: keyof typeof STATUS_COLOR //criação da interface para que o statusColor só aceite esses valores
}

export const Status = styled.span<StatusProps>`
    display:flex;
    align-items: center;
    gap: .5rem;

    &::before {
        content:'';
        width: .5rem;
        height: .5rem;
        border-radius: 999px;
        background: ${(props)=> props.theme[STATUS_COLOR[props.statusColor]]};
    }


`
import { css } from "styled-components";
import styled from "styled-components";
//aqui eu estou criando um componente estilizado chamado ButtonContainer que é um button(o styled.button eu to especificando qual tag html eu quero estilizar)

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'; //aqui foi feita a criação de uma tipagem chamada ButtonVariant que é uma string que só pode ter esses valores

interface ButtonContainerProps {
    variant: ButtonVariant ;
}

const ButtonVariant = {
    primary: 'purple',
    secondary: 'orange',
    danger: 'red',
    success: 'green'
};


export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;
    border-radius: 5px;
    margin-right: 10px;
    margin-top: 10px;
    border: none;


    background-color: ${props => props.theme["green-500"]}; 
    //aqui eu estou passando uma interpolação para pegar o valor da propriedade primary e passar para o css

    color: ${props => props.theme.white}; 
    //aqui eu estou passando uma interpolação para pegar o valor da propriedade secondary e passar para o css

    //aqui vou passar uma interpolação para pegar o valor da propriedade variant e passar para o css

    /* ${props =>{
            return css`background-color: ${ButtonVariant[props.variant]}`
    }}*/ 
    //vai executar como uma função e vai pegar o valor da propriedade variant e vai passar para o css
`;
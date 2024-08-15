//o styled components é uma biblioteca que permite escrever css dentro do javascript e é uma forma de criar componentes estilizados de forma mais fácil e organizada 
import { ButtonContainer, ButtonVariant } from "./Button.styles.ts";
interface ButtonProps {
    variant?: ButtonVariant;
}

export function Button({ variant = 'primary' }: ButtonProps) { //aqui eu estou passando a propriedade color para o componente Button
    return (
        <>
            <ButtonContainer variant={variant}>Click me</ButtonContainer>
        </>
        
    )
}
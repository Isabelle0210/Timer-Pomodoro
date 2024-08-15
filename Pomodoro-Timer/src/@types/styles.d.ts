// o d.ts serve para definir tipagem

import 'styled-components';
import { defaultTheme } from '../styles/themes/default';

type ThemeType = typeof defaultTheme; //aqui eu estou criando um tipo chamado ThemeType que é o tipo do defaultTheme entao as propriedades do defaultTheme vao ser as propriedades do ThemeTypede

//aqui estou criando uma typagem para o styled components para que ele possa reconhecer o tema
declare module 'styled-components' {

    export interface DefaultTheme extends ThemeType { //aqui eu estou criando uma interface chamada DefaultTheme que é uma extensão do ThemeType
    
    }

}
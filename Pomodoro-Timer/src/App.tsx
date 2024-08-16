
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Router } from "./router";
import { BrowserRouter } from "react-router-dom"; //esse componente tem que ficar em volta dos outros componentes

export function App() {

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <Router/> {/* aqui eu to importando o componente de rotas. */}
        </BrowserRouter>
        <GlobalStyle />
      </ThemeProvider>
      
    </>
  )
}



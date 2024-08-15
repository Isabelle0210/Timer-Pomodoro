import { Button } from "./components/button";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";


export function App() {

  return (
    <>
      <ThemeProvider theme={defaultTheme}>

        <Button variant={"primary"} />
        <Button variant={"secondary"} />
        <Button variant={"danger"}/>
        <Button variant={"success"}/>

        <GlobalStyle />
      </ThemeProvider>
      
    </>
  )
}



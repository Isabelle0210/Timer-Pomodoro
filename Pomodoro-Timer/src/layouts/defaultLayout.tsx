import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function DefaultLayout (){
    return (
        <div>
            <Header/>
            <Outlet/> {/* quando o react router dom estiver usando esse layout com o outlet ele vai saber a onde ele tem que posicionar o conteudo especifico de uma pagina */}
        </div>
    );
}
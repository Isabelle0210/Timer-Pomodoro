import { HeaderContainer } from "./style";
import logoIgnite from '../../assets/logo-ignite.svg'
import {Timer, Scroll} from 'phosphor-react'
import { NavLink } from "react-router-dom";

export function Header(){
    return(
        <>
            <HeaderContainer>
                <img src={logoIgnite} alt="Dois triangulos verdes um em cima do outro" />
                <nav>
                    <NavLink to="/"> {/* aqui eu uso o navlink para colocar as rotas nos links */}
                        <Timer size={24}/>
                    </NavLink>
                    <NavLink to="/History">
                        <Scroll size={24}/>
                    </NavLink>
                </nav>
            </HeaderContainer>
        </>
    );
}
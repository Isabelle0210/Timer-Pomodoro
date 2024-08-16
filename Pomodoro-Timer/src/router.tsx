import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { History } from "./pages/History";
import { DefaultLayout } from "./layouts/defaultLayout";


export function Router (){
    return(
        <Routes>
            <Route path="/" element={<DefaultLayout/>}>{/* Todas as rotas que começarem com / terão o DefaultLayout */}
                <Route path="/" element={<Home/>}/> {/* aqui o path mostra que ao carregar a pagina, irá direto para a page home que foi passada no eleement */}
                <Route path="/History" element={<History/>}/> {/* aqui eu fiz a mesma coisa so que com history */}
            </Route>
            
        </Routes>
    );
}
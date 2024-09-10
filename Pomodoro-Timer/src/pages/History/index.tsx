import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./style";
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { CycleContext } from "../../context/CyclesContext";
export function History() {

    const { cycles } = useContext(CycleContext);

    return (
        <HistoryContainer>
            <h1>Meu Historico</h1>
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Tempo</th>
                            <th>Inicio</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles && cycles.length > 0 ? (
                            cycles.map(cycle =>{
                                return (
                                    <tr key={cycle.id}>
                                        <td>{cycle.task}</td>
                                        <td>{cycle.minutesAmount}minutos</td>
                                        <td>{formatDistanceToNow(cycle.startDate,{
                                            addSuffix: true,
                                            locale: ptBR
                                        }) }</td>
                                        <td>
                                            {cycle.finishedDate && <Status statusColor="green">Finalizado</Status>}{/* aqui o componente so vai ser setado se ele tiver acabado */}
                                            {cycle.interrupedDate && <Status statusColor="red">Interrompido</Status>}{/* aqui o componente so vai ser setado se ele tiver sido interrompido */}
                                            {(!cycle.finishedDate && !cycle.interrupedDate) && <Status statusColor="yellow">Em andamento</Status>}{/* aqui o componente so vai ser setado se ele não tiver sido interrompido e nem finalizado */}
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan={4}>Nenhum ciclo encontrado</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    );
}

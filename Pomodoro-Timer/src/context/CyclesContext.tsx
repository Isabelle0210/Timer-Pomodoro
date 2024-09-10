import { createContext, useState, useEffect } from "react";

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interrupedDate?: Date;
    finishedDate?: Date;
}

interface CycleContextType {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    markCurrentCycleAsFinished: () => void;
    amountSecondsPassed: number;
    setSecondsPassed: (seconds: number) => void;
    CreatNewCycle: (data: CreateCycleData) => void;
    InterrupedCurrentCycle: () => void;
}

export const CycleContext = createContext({} as CycleContextType);

interface CyclesContextProviderProps {
    children: React.ReactNode;
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [cycles, setCycles] = useState<Cycle[]>(() => {
        const storedCycles = localStorage.getItem("cycles");

        if (storedCycles) {
            return JSON.parse(storedCycles).map((cycle: Cycle) => ({
                ...cycle,
                startDate: new Date(cycle.startDate), // Convertendo a string para Date
                finishedDate: cycle.finishedDate ? new Date(cycle.finishedDate) : undefined,
                interrupedDate: cycle.interrupedDate ? new Date(cycle.interrupedDate) : undefined,
            }));
        }

        return [];
    });
    
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    useEffect(() => {
        localStorage.setItem("cycles", JSON.stringify(cycles));
    }, [cycles]);

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    function markCurrentCycleAsFinished() {
        setCycles(
            cycles.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return {
                        ...cycle,
                        finishedDate: new Date(),
                    };
                }
                return cycle;
            })
        );
    }

    function InterrupedCurrentCycle() {
        setCycles((state) =>
            state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return {
                        ...cycle,
                        interrupedDate: new Date(),
                    };
                }
                return cycle;
            })
        );
        setActiveCycleId(null);
    }

    function CreatNewCycle(data: CreateCycleData) {
        const id = String(Date.now());
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        };

        setCycles((state) => [...state, newCycle]);
        setActiveCycleId(id);
        setAmountSecondsPassed(0);
    }

    return (
        <CycleContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                markCurrentCycleAsFinished,
                amountSecondsPassed,
                setSecondsPassed,
                CreatNewCycle,
                InterrupedCurrentCycle,
            }}
        >
            {children}
        </CycleContext.Provider>
    );
}

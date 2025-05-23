import { createContext, useState } from "react";
import { logger } from "../utils/logger";


export const PlantsContext = createContext()

export function PlantsProvider({ children }) {
    logger.info('in file: ./scr/context/PlantsContext.js');
    logger.info('in function: PlantsProvider');
    const [plants, setPlants] = useState([])


    return (
        <PlantsContext.Provider
            value={{
                plants,
            }}
        >
            {children}
        </PlantsContext.Provider>
    )
}
import { useContext } from "react";
import { PlantsContext } from "../contexts/BooksContext";
import { logger } from "../utils/logger";

export function usePlants() {
    logger.info('in file: ./scr/hooks/usePlants.js');
    logger.info('in function: usePlants');

    const context = useContext(PlantsContext);

    if (!context) {
        logger.error('usePlants must be used within a PlantsProvider');
        throw new Error("usePlants must be used within a PlantsProvider");
    }
    logger.log("usePlants: context found", context);

    return context;
}

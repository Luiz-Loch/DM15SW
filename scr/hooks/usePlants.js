import { useContext } from "react";
import { PlantsContext } from "../contexts/PlantsContext";
import { logger } from "../utils/logger";

export function usePlants() {
    const context = useContext(PlantsContext);

    if (!context) {
        logger.error('usePlants must be used within a PlantsProvider');
        throw new Error("usePlants must be used within a PlantsProvider");
    }

    return context;
}

import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { logger } from "../utils/logger";

export function useUser() {
    const context = useContext(UserContext);

    if (!context) {
        logger.error('usePlants must be used within a UserProvider');
        throw new Error("useUser must be used within a UserProvider");
    }

    return context;
}

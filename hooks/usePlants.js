import { useContext } from "react";
import { PlantsContext } from "../contexts/BooksContext";

export function usePlants() {
    const context = useContext(PlantsContext);

    if (!context) {
        throw new Error("usePlants must be used within a BooksProvider");
    }

    return context;
}
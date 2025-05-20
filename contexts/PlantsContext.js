import { createContext, useState } from "react"


export const PlantsContext = createContext()

export function PlantsProvider({ children }) {
  const [plants, setPlants] = useState([])


  return (
    <PlantsContext.Provider
      value={{ plants }}
    >
      {children}
    </PlantsContext.Provider>
  )
}
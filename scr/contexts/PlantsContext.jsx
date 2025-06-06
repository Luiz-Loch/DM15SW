import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { db } from "../services/firebaseConfig";
import { logger } from "../utils/logger";

export const PlantsContext = createContext()

export function PlantsProvider({ children }) {
    logger.info('in file: ./scr/context/PlantsContext.js');
    logger.info('in function: PlantsProvider');
    const { user } = useUser();
    const [plants, setPlants] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function getData() {
            // Function to load data from FireStore
            logger.log("in function PlantsProvider.getData()");
            if (!user) {
                logger.warn("User not authenticated");
                return;
            }

            try {
                const loadedData = await loadPlantsFromFirestore(user.uid);
                setPlants(loadedData);
                setIsLoaded(true);
            }
            catch (error) {
                logger.error("Error loading data", error);
            }
        }
        getData();
    }, [user]);

    useEffect(() => {
        async function _storeData(value) {
            // Function to store data to FireStore
            try {
                await savePlantsToFirestore(user.uid, value);
            }
            catch (erro) {
                console.log("Error storing data", erro);
            }
        };

        function _sortPlants(value) {
            logger.log("in function PlantsProvider._sortPlants()");

            return [...value]
                .sort((a, b) => {
                    const lastA = a.watered.length > 0 ? new Date(a.watered[a.watered.length - 1]) : new Date(0);
                    const lastB = b.watered.length > 0 ? new Date(b.watered[b.watered.length - 1]) : new Date(0);
                    return lastB - lastA;
                })
                .sort((a, b) => Number(b.favorite) - Number(a.favorite));
        }

        function _isDifferent(a, b) {
            return JSON.stringify(a) !== JSON.stringify(b);
        }

        const sorted = _sortPlants(plants);
        const isDifferent = _isDifferent(sorted, plants);

        if (isLoaded) {
            if (isDifferent) {
                setPlants(sorted);
                logger.log("Plants were sorted and updated");
                _storeData(sorted);
            }
            else {
                logger.log("Plants were not changed");
                _storeData(plants);
            }
        }
    }, [plants]);


    async function loadPlantsFromFirestore(userId) {
        logger.log("in function PlantsProvider.loadPlantsFromFirestore() with userId:", userId);
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data().plants || [];
        } else {
            return [];
        }
    }

    async function savePlantsToFirestore(userId, plants) {
        logger.log("in function PlantsProvider.savePlantsToFirestore() with userId:", userId);
        const docRef = doc(db, "users", userId);
        await setDoc(docRef, { plants }, { merge: true });
    }

    function _updatePlant(id, updatedFields) {
        logger.log("in function PlantProvider._updatePlant()");
        setPlants(oldState =>
            oldState.map(plant =>
                plant.id === id
                    ? {
                        ...plant,
                        ...updatedFields,
                        updatedAt: new Date().toISOString(),
                    }
                    : plant
            )
        );
    }

    function addPlant(name, description) {
        logger.log("in function PlantProvider.addPlant()");
        setPlants(oldState => {
            return [
                ...oldState,
                {
                    id: Date.now().toString(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    name: name,
                    description: description,
                    image: '',
                    watered: [],
                    sun: 'low', // default value
                    warning: [],
                    favorite: false,
                }
            ];
        });
    }

    function editPlant(id, name, description) {
        logger.log("in function PlantProvider.editPlant()");
        _updatePlant(id, { name, description });
    }

    function deletePlant(id) {
        logger.log("in function PlantProvider.deletePlant()");
        setPlants(oldState => {
            return oldState.filter(plant => plant.id !== id);
        });
    }

    function waterPlant(id) {
        logger.log("in function PlantProvider.waterPlant()");
        setPlants(oldState =>
            oldState.map(plant =>
                plant.id === id
                    ? {
                        ...plant,
                        watered: [...plant.watered, new Date().toISOString()],
                        updatedAt: new Date().toISOString(),
                    }
                    : plant
            )
        );
    }

    function _getNextSunLevel(id) {
        logger.log("in function PlantProvider.getNextSunLevel()");
        const sunLevels = ['low', 'medium', 'high'];
        const plant = plants.find(p => p.id === id);
        const index = sunLevels.indexOf(plant.sun);
        return sunLevels[(index + 1) % sunLevels.length];
    }

    function sunPlant(id) {
        logger.log("in function PlantProvider.setSunLevel()");
        const nextLevel = _getNextSunLevel(id);
        _updatePlant(id, { sun: nextLevel });
    }

    function warningPlant(id, warningText) {
        logger.log("in function PlantProvider.warningPlant()");
    }

    function favoritePlant(id) {
        logger.log("in function PlantProvider.favoritePlant()");
        setPlants(oldState =>
            oldState.map(plant =>
                plant.id === id
                    ? {
                        ...plant,
                        favorite: !plant.favorite,
                        updatedAt: new Date().toISOString(),
                    }
                    : plant
            )
        );
    }

    return (
        <PlantsContext.Provider
            value={{
                plants,
                addPlant,
                editPlant,
                deletePlant,
                waterPlant,
                sunPlant,
                warningPlant,
                favoritePlant,
            }}
        >
            {children}
        </PlantsContext.Provider>
    )
}

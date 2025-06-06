import { router } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { FooterButton } from '../../../scr/components/FooterButton';
import { MainTitle } from '../../../scr/components/MainTitle';
import { PlantCard } from '../../../scr/components/PlantCard';
import { Colors } from '../../../scr/constants/Colors';
import { usePlants } from '../../../scr/hooks/usePlants';
import { logger } from '../../../scr/utils/logger';

export default function Plants() {
    const { plants,
        deletePlant,
        waterPlant,
        sunPlant,
        warningPlant,
        favoritePlant,
    } = usePlants();
    const theme = useColorScheme();
    const colorPalette = Colors[theme || 'light'];

    // Inicial log when mounting the screen
    useEffect(() => {
        logger.info('in file: ./app/(tabs)/plants/index.jsx');
        logger.log('in function: Plants');
        logger.log('plant screen mounted');
    }, []);

    function handleAddPlant() {
        logger.log('Add plant button pressed');
        router.push('/plants/add');
    };

    function handleEditPlant(plant) {
        logger.log(`Plant with id ${plant.id} edited`);
        router.push(`/plants/${plant.id}`);
    };

    function handleDeletePlant(plant) {
        logger.log(`Plant with id ${plant.id} deleted`);
        deletePlant(plant.id);
    };

    function handleWaterPlant(plant) {
        logger.log(`Plant with id ${plant.id} watered`);
        waterPlant(plant.id);
    };

    function handleSunPlant(plant) {
        logger.log(`Plant with id ${plant.id} sun toggled`);
        sunPlant(plant.id);
    };

    function handleWarningPlant(plant) {
        logger.log(`Plant with id ${plant.id} warning toggled`);
        warningPlant(plant.id);
    };

    function handleFavoritePlant(plant) {
        logger.log(`Plant with id ${plant.id} favorite toggled`);
        favoritePlant(plant.id);
    };


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colorPalette.background }]}>
            <MainTitle title="Minhas Plantas" />

            <FlatList
                data={plants}
                renderItem={({ item }) => <PlantCard
                    plant={item}
                    onEdit={() => { handleEditPlant(item) }}
                    onDelete={() => { handleDeletePlant(item) }}
                    onWaterPress={() => { handleWaterPlant(item) }}
                    onSunPress={() => { handleSunPlant(item) }}
                    onWarningPress={() => { handleWarningPlant(item) }}
                    onHeartPress={() => { handleFavoritePlant(item) }}
                />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            <FooterButton
                text="Adicionar Planta"
                onPress={() => { handleAddPlant() }}
                color={colorPalette.primary}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
});
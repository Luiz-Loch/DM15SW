import { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { FooterButton } from '../../../scr/components/FooterButton';
import { MainTitle } from '../../../scr/components/MainTitle';
import { Colors } from '../../../scr/constants/Colors';
import { useUser } from '../../../scr/hooks/useUser';
import { logger } from '../../../scr/utils/logger';
import { PlantCard } from '../../../scr/components/PlantCard';

const mockPlants = [
    {
        id: '1',
        name: 'Costela de Adão',
        lastWatered: 'há 3 dias',
        image: '',
    },
    {
        id: '2',
        name: 'Espada de São Jorge',
        lastWatered: 'há 2 dias',
        image: '',
    },
    {
        id: '3',
        name: 'Zamioculca',
        lastWatered: 'há 2 dias',
        image: '',
    },
];

export default function Plants() {
    const { user } = useUser();
    const theme = useColorScheme();
    const colorPalette = Colors[theme || 'light'];

    // Inicial log when mounting the screen
    useEffect(() => {
        logger.info('in file: ./app/(tabs)/plants/index.jsx');
        logger.log('in function: Plants');
        logger.log('plant screen mounted');
    }, []);

    const addPlant = () => {

    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colorPalette.background }]}>
            <MainTitle title="Minhas Plantas" />

            <FlatList
                data={mockPlants}
                renderItem={({ item }) => <PlantCard plant={item} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            <FooterButton
                text="Adicionar Planta"
                onPress={() => {
                    addPlant();
                }}
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
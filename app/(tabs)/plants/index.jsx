import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Colors } from '../../../scr/constants/Colors';
import { useUser } from '../../../scr/hooks/useUser';
import { logger } from '../../../scr/utils/logger';

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
        logger.log('Current user is: ', user);
    }, []);

    const addPlant = () => {
        
    };

    const renderPlantItem = ({ item }) => ( // Transformar em um componente separado
        <View style={[styles.card, { backgroundColor: colorPalette.card }]}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={[styles.name, { color: colorPalette.text }]}>{item.name}</Text>
                <Text style={[styles.subtext, { color: colorPalette.text }]}>
                    Regada {item.lastWatered}
                </Text>
                <View style={styles.icons}>
                    <Ionicons name="water-outline" size={18} color={colorPalette.text} />
                    <Ionicons name="sunny-outline" size={18} color={colorPalette.text} />
                    <Ionicons name="warning-outline" size={18} color={colorPalette.text} />
                    <Ionicons name="heart-outline" size={18} color={colorPalette.text} />
                </View>
            </View>
        </View>
    );



    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colorPalette.background }]}>
            <Text style={[styles.pageTitle, { color: colorPalette.text }]}>Minhas Plantas</Text>

            <FlatList
                data={mockPlants}
                renderItem={renderPlantItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            <View style={styles.bottomContainer}>
                <Pressable
                    onPress={() => {
                        logger.log('Add plant button pressed');
                        addPlant();
                    }}
                    style={({ pressed }) => [
                        styles.addButton,
                        { backgroundColor: pressed ? colorPalette.primary : colorPalette.secondary },
                        pressed && styles.buttonPressed,
                    ]}
                >
                    <Text style={[styles.buttonText, { color: colorPalette.buttonText }]}>
                        Adicionar Planta
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    pageTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        margin: 20,
        marginBottom: 40,
    },
    card: {
        flexDirection: 'row',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        alignItems: 'center',
        elevation: 2,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    subtext: {
        fontSize: 14,
        marginBottom: 6,
    },
    icons: {
        flexDirection: 'row',
        gap: 12,
    },

    bottomContainer: {
        marginTop: 'auto',
        alignItems: 'center',
        paddingBottom: 32,
    },
    addButton: {
        width: '80%',
        paddingVertical: 14,
        borderRadius: 12,
        marginVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Android fallback
    },
    buttonPressed: {
        opacity: 0.8,
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '500',
    },
});